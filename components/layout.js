import Head from 'next/head';

import styles from './layout.module.css';

const name = 'Vivo Next'
export const siteTitle = 'Vivo Next'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
        <meta httpEquiv="Content-Security-Policy" content="https://*" />
      </Head>
      <header className={styles.header}>
        <h1>Vivo Internet Generator</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
