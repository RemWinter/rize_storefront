'use client'
import { Provider } from "react-redux";
import styles from "./page.module.css";
import { store } from "./components/redux/store";
import Head from 'next/head'
import { useWindowDimensions } from "./utils/helperFns";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"/>
      </Head>
      <Provider store={store}>
        <Content/>
      </Provider>
    </main>
  );
}

const Content = () => {
  useWindowDimensions()
  return (
    <>
      <Navbar/>
      <HeroSection/>
    </>
  )
}
