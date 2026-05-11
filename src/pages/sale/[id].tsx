//[id], [...id], [[...id]] 사용가능.

import { useRouter } from "next/router";
import sales from '@/mock/sales.json';
import style from './[id].module.css';
import Image from 'next/image';
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { fetchSaleById, fetchSales } from "@/util/fetch-sales";

//상품을 빌드시 미리 생성
export async function getStaticPaths () {
    const sales = await fetchSales();

    return {
        paths : sales.map((sale) => ({params: {id: String(sale.id)}})), //전체상품 미리 빌드 
        // paths: [
        //     {params: { id: '1' } }, 
        //     {params: { id: '2' } }, 
        //     {params: { id: '3' } }, 
         //],
        fallback: 'blocking',    //false: 1,2,3 번 아니면 404 error blocking:1,2,3번 아니면 ssr 처럼 만든다.
    }
}

//서버에서 동작
export async function getStaticProps(context: GetStaticPropsContext) {
    const id = context.params!.id;  //params 값이 언제나 있을경우 ! 추가 
    const sales = await fetchSaleById(Number(id));
    return { props: {sales: sales}, revalidate: 10 }; //10초 마다 증분된 값을 넘겨준다. isr(증분 정적페이지 재생성)
}

export default function Page({sales}: InferGetStaticPropsType<typeof getStaticProps>) {

    //console.log(sales);
    //console.log(sales?'true':'false');
    //if (!sales) return <div>상품에 오류가 있습니다. 재조회 하세요.</div>;
    if (sales.length < 1) return <div>상품에 오류가 있습니다. 재조회 하세요.</div>;

    const  {id, productName, description, price, photo} = sales[0];
    const imageURL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${photo}`;

    return (
        <div className={style.container}>
            <div className={style.cover_img_container} style={{backgroundImage:`url('${imageURL}')`}}>
                <Image src={imageURL} alt={`${productName}의 사진`} width={300} height={300} className={style.cover_img} />
            </div>
            <div>
                <div className={style.title}>{productName}</div>
                <div className={style.price}>{price.toLocaleString()}원</div>
                <div className={style.description}>{description}</div>
            </div>
        </div>
    );
}

