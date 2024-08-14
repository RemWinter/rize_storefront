import Head from "next/head";
import styles from "./page.module.css";
import PageClientSide from "./PageClientSide";

interface ProductPageProps {
  params: {
    product_name: string;
    product_id: string;
  };
}

export default function Home({params}: ProductPageProps) {
  const { product_name, product_id } = params;

  return (
    <main className={styles.main}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"/>
      </Head>
      <PageClientSide/>
    </main>
  );
}