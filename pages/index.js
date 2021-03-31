import Head from 'next/head';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  const { register, handleSubmit, watch, errors, control, reset } = useForm();
  const [mbs, setMbs] = useState(0);
  const [tokenChoice, setTokenChoice] = useState(0);

  const onFormSubmit = async (data) => {
    setMbs(0);
    setTokenChoice(0);

    const { phone, token, repeat = 1 } = data;

    console.log(data)

    if (!phone) return;
    if (!token) return;

    setTokenChoice(repeat * 50);

    const number = phone.replace(/\D/g, "");

    try {
      let index = 0;
      while (index < Number(repeat)) {
        const response = await fetch(
          "http://interatividade.vivo.ddivulga.com/carrotProcess",
          {
            body: `msisdn=43${number}&campid=${token}&opCode=VV`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
          }
        );
        const data = await response.json();

        if (data.return) {
          setMbs((mb) => mb + 50);
        }
        console.log(data);
        index++;
      }
      reset();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um error", error.message)
    }
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <form className={utilStyles.form} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={utilStyles.form__container}>
            <Controller
              as={InputMask}
              control={control}
              mask="(99)99999-9999"
              id="phone"
              type="tel"
              placeholder="(99)99999-9999"
              name="phone"
              defaultValue=""
              ref={register({ required: true })}
              className={utilStyles.form__phone}
            />
            {errors.phone && (
              <span className={utilStyles.form_error}>
                This field is required
              </span>
            )}
          </div>

          <section className={utilStyles.form__select_wrapper}>
            <div
              style={{ width: "100%" }}
              className={utilStyles.form__container}
            >
              <select
                name="token"
                type="string"
                ref={register({ required: true })}
                className={utilStyles.form__select}
              >
                <option value="" selected disabled hidden>
                  Token
                </option>
                <option value="02f76cd1-eead-44ff-88dd-aa69538c7aef">
                  5MB
                </option>
                <option value="6e7eb039-9816-4118-9c3b-bb906887722c">
                  50MB
                </option>
                <option value="e2b803f3-6992-472d-b4d1-663f5c9c41d7">
                  100MB
                </option>
              </select>

              {errors.token && (
                <span className={utilStyles.form_error}>
                  This field is required
                </span>
              )}
            </div>

            <div className={utilStyles.form__select_container}>
              <select
                name="repeat"
                type="string"
                ref={register({ required: true })}
                className={`${utilStyles.form__select} ${utilStyles.form__select_repeat}`}
              >
                <option value="" selected disabled hidden>
                  Repetir
                </option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>

              {errors.repeat && (
                <span className={utilStyles.form_error} data-css="select-right">
                  This field is required
                </span>
              )}
            </div>
          </section>

          <button type="submit" className={utilStyles.form__button}>
            <p className={utilStyles.button__title}>Enviar</p>
          </button>
        </form>
      </section>
      <section className={utilStyles.layout__mbs}>
        {mbs && <span> {mbs} </span>}{" "}
        <span> MBs adicionados de {tokenChoice} </span>
      </section>
    </Layout>
  );
}
