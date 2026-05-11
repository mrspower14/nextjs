import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/component/global-layout";
import { NextPage } from "next";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {getLayout:(page: ReactNode) => ReactNode };

export default function App({ Component, pageProps }: AppProps & {Component: NextPageWithLayout}) {

  // getLayout이 false 이면 ((page) => page)를 반환.
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <RootLayout>
      {getLayout(<Component {...pageProps} />)}
    </RootLayout>
  );
}
