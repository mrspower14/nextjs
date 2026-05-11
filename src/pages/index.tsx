import styles from './index.module.css';
import { ReactNode, useEffect } from 'react';
import SearchBarLayout from '@/component/searchbar-layout';
// import sales from '@/mock/sales.json';
import SaleItem from '@/component/sale-item';
import { fetchRecentSales } from '@/util/fetch-sales';
import { InferGetServerSidePropsType } from 'next';

//서버사이드로 동작. 펑션명은 고정
export async function getServerSideProps() {
  const sales = await fetchRecentSales();
  return { props: {sales: sales} };
}

export default function Home({sales}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.title}>
      <section>
        <h3>최신 등록 상품</h3>
        {sales.map((sale) => 
          <SaleItem key={sale.id} {...sale}/>
        )}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) =>  {
  return <SearchBarLayout>{page}</SearchBarLayout>
}