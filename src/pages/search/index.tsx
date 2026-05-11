
import { useRouter } from "next/router";
import { ReactNode } from 'react';
import SearchBarLayout from '@/component/searchbar-layout';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchSales } from "@/util/fetch-sales";
import SaleItem from "@/component/sale-item";

//서버에서 동작
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const q = context.query.q;
    const sales = await fetchSales(q as string);
    return { props: {sales: sales} };
}

// Page 이름은 상관없다. export default 로 찾아감.
// 폴더 구조를 잘 맞춰주어야 한다.
export default function Page({sales}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <div>
            {sales.map((sale) => 
              <SaleItem key={sale.id} {...sale}/>
            )}
        </div>
    );

    // const router = useRouter();
    // const query = router.query.q;

    // return (
    //     <div>
    //         <h1>검색어: {query} 페이지 입니다</h1>
    //     </div>
    // );
}

Page.getLayout = (page: ReactNode) =>  {
  return <SearchBarLayout>{page}</SearchBarLayout>
}