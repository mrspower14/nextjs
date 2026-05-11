//[id], [...id], [[...id]] 사용가능.

import { useRouter } from "next/router";
import sales from '@/mock/sales.json';
import style from './[id].module.css';
import Image from 'next/image';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchSaleById } from "@/util/fetch-sales";

//서버에서 동작
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context.params!.id;  //params 값이 언제나 있을경우 ! 추가 
    const sales = await fetchSaleById(Number(id));
    return { props: {sales: sales} };
}

export default function Page({sales}: InferGetServerSidePropsType<typeof getServerSideProps>) {

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

