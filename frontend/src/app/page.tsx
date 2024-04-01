'use client'
import { Provider } from "react-redux";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import { store } from "./components/redux/store";

export default function Home() {
  return (
    <main className={styles.main}>
      <Provider store={store}>
        <Navbar/>
      </Provider>
    </main>
  );
}
