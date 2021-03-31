import Head from 'next/head';

import styles from './layout.module.css';

const name = "Vivo Next";
export const siteTitle = "Vivo Next";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <section className={styles.bar}>
        <a href="https://github.com/rwietter/vivo-internet-gen" target="_blank">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.container__github}
          >
            <g data-name="Layer 2">
              <rect
                width="24"
                height="24"
                transform="rotate(180 12 12)"
                opacity="0"
                className={styles.container__github__item}
              />
              <path
                className={styles.container__github__item}
                d="M12 1A10.89 10.89 0 0 0 1 11.77 10.79 10.79 0 0 0 8.52 22c.55.1.75-.23.75-.52v-1.83c-3.06.65-3.71-1.44-3.71-1.44a2.86 2.86 0 0 0-1.22-1.58c-1-.66.08-.65.08-.65a2.31 2.31 0 0 1 1.68 1.11 2.37 2.37 0 0 0 3.2.89 2.33 2.33 0 0 1 .7-1.44c-2.44-.27-5-1.19-5-5.32a4.15 4.15 0 0 1 1.11-2.91 3.78 3.78 0 0 1 .11-2.84s.93-.29 3 1.1a10.68 10.68 0 0 1 5.5 0c2.1-1.39 3-1.1 3-1.1a3.78 3.78 0 0 1 .11 2.84A4.15 4.15 0 0 1 19 11.2c0 4.14-2.58 5.05-5 5.32a2.5 2.5 0 0 1 .75 2v2.95c0 .35.2.63.75.52A10.8 10.8 0 0 0 23 11.77 10.89 10.89 0 0 0 12 1"
                data-name="github"
              />
            </g>
          </svg>
        </a>
      </section>
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
      </Head>
      <main>{children}</main>
    </div>
  );
}
