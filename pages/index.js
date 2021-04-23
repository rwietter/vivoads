import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { toast, ToastContainer } from 'react-toastify';

import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/utils.module.css';
import { tokenData, tokenKeys } from './api/tokens';

export default function Home() {
  const { register, handleSubmit, errors, control } = useForm();
  const [mbs, setMbs] = useState(0);
  const [tokenChoice, setTokenChoice] = useState(0);

  const isValidForm = (phone) => (token) => {
    if (!phone) return toast("Preencha o campo número!");
    if (!token) return toast("Preencha o campo token!");
  };

  const onFormSubmit = async (data) => {
    setMbs(0);
    setTokenChoice(0);

    const { phone, token, repeat = 1 } = data;

    isValidForm(phone)(token);

    const tokenValue = +tokenKeys[token] || 0;

    const number = phone.replace(/\D/g, "");
    const URL = process.env.URL || "";
    const fator = Math.floor(Math.random() * 99);

    setTokenChoice(repeat * tokenValue);

    let index = 0;
    try {
      while (index < Number(repeat)) {
        const response = await fetch(URL, {
          body: `msisdn=${fator}${number}&campid=${token}&opCode=VV`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        });

        const data = await response.json();
        
        if (data.return) {
          setMbs((mb) => mb + tokenValue);
          toast(`Added ${tokenValue} MBs`, {
            toastId: index,
            autoClose: true,
          });
        }

        index++;
      }
      toast("Finish!");
    } catch (error) {
      console.error(error);
      toast("Ooops, there was a problem with the request", {
        toastId: error.message
      });
    }
  };

  return (
    <Layout home>
      <ToastContainer />
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.headingMd}>
        <header className={styles.header}>
          <h1>Vivo Next</h1>
          <div className={styles.tooltip}>
            <div className={styles.tooltip__item}>
              <div className={styles.tooltip__icon_container}>
                <span className={styles.tooltip__icon}>i</span>
              </div>
              <h2>Information</h2>
              <p>
                The data is generated through sponsored packages. Packages are
                limited, so some may not fall on the line. Some may not work
                too, test them all.
              </p>
              <p>
                If packages are no longer dropping, check the Meu Vivo app to
                see if the packages are separate, if so, wait for them to "join"
                in the same package.
              </p>
            </div>
          </div>
        </header>

        <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={styles.form__container}>
            <label htmlFor="phone" className={styles.form__label}>
              Number
            </label>
            <Controller
              as={InputMask}
              control={control}
              mask="(99)99999-9999"
              id="phone"
              type="tel"
              autoFocus={true}
              placeholder="(99)99999-9999"
              name="phone"
              ref={register({ required: true })}
              className={styles.form__phone}
            />
            {errors.phone && (
              <span className={styles.form_error}>This field is required</span>
            )}
          </div>

          <section className={styles.form__select_wrapper}>
            <div
              style={{ width: "100%" }}
              className={styles.form__select_container}
            >
              <label htmlFor="token" className={styles.form__label}>
                Token/Ads
              </label>
              <select
                name="token"
                id="token"
                type="string"
                ref={register({ required: true })}
                className={styles.form__select}
              >
                {tokenData.map((token) => (
                  <option key={token.uuid} value={token.uuid}>
                    {token.value} [{token.isActive}]
                  </option>
                ))}
              </select>

              {errors.token && (
                <span className={styles.form_error}>
                  This field is required
                </span>
              )}
            </div>

            <div
              className={`${styles.form__select_container} ${styles.form__select_repeat}`}
            >
              <label htmlFor="repeat" className={styles.form__label}>
                Repeat
              </label>
              <select
                id="repeat"
                name="repeat"
                type="string"
                ref={register({ required: true })}
                className={styles.form__select}
              >
                <option value="2">2x</option>
                <option value="10">10x</option>
                <option value="20">20x</option>
                <option value="30">30x</option>
                <option value="40">40x</option>
                <option value="50">50x</option>
                <option value="100">100x</option>
              </select>

              {errors.repeat && (
                <span className={styles.form_error} data-css="select-right">
                  This field is required
                </span>
              )}
            </div>
          </section>

          <button type="submit" className={styles.form__button}>
            <p className={styles.button__title}>Send</p>
          </button>
        </form>
      </section>
      <section className={styles.layout__mbs}>
        <div>
          {mbs && <span> {mbs} </span>}{" "}
          <span> MBs added from {tokenChoice} MBs</span>
        </div>
        <a
          href="https://github.com/rwietter/vivo-internet-gen"
          target="_blank"
          className={styles.layout__github}
        >
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
    </Layout>
  );
}
