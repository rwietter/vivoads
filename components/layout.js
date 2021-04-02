import Head from 'next/head';

import styles from './layout.module.css';

const name = "Vivo Next";
export const siteTitle = "Vivo Next";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Obter dados pratrocinados para vivo móvel"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="keywords" content="vivo ads" />
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="/public/icons/apple-icon.png" />
        <meta name="theme-color" content="#d5239d" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main>{children}</main>
    </div>
  );
}
