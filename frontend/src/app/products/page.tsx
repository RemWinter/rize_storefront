'use client'
import { Provider } from "react-redux";
import styles from "./page.module.css";
import Navbar from "../components/Navbar/Navbar";
import { store, useAppDispatch } from "../components/redux/store";
import Head from 'next/head'
import ProductsOuter from "../components/ProductsOuter/ProductsOuter";
import { useEffect } from "react";
import { setDimensions } from "../components/redux/globalSlice";
import dynamic from "next/dynamic";

const ProductsOuterDynamic = dynamic(() => import('../components/ProductsOuter/ProductsOuter'), { ssr: false });

export default function Home() {

  return (
    <main className={styles.main}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"/>
      </Head>
      <Provider store={store}>
      <Navbar page={'products'}/>
      <div className={styles.pageBody}>
        <ProductsOuterDynamic/>
      </div>
      </Provider>
    </main>
  );
}