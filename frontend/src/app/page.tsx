'use client'
import { Provider } from "react-redux";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import { store } from "./components/redux/store";
import HeroSection from "./components/HeroSection/HeroSection";
import Head from 'next/head'

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"/>
      </Head>
      <Provider store={store}>
        <Navbar/>
        <HeroSection/>
      </Provider>
    </main>
  );
}
