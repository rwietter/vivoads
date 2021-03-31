import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { toast, ToastContainer } from 'react-toastify';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  const { register, handleSubmit, watch, errors, control, reset } = useForm();
  const [mbs, setMbs] = useState(0);
  const [tokenChoice, setTokenChoice] = useState(0);

  const tokens = {
    "02f76cd1-eead-44ff-88dd-aa69538c7aef": 5,
    "6e7eb039-9816-4118-9c3b-bb906887722c": 50,
    "e2b803f3-6992-472d-b4d1-663f5c9c41d7": 100,
  };

  const onFormSubmit = async (data) => {
    setMbs(0);
    setTokenChoice(0);

    const { phone, token, repeat = 1 } = data;

    console.log(data);

    if (!phone) return toast("Preencha o campo número!");
    if (!token) return toast("Preencha o campo token!");

    const tokenValue = +tokens[token] || 0;

    setTokenChoice(repeat * tokenValue);

    const number = phone.replace(/\D/g, "");

    const URL = process.env.URL || "";

    try {
      let index = 0;
      while (index < Number(repeat)) {
        const response = await fetch(URL, {
          body: `msisdn=${number}&campid=${token}&opCode=VV`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        });
        const data = await response.json();

        if (data.return) {
          setMbs((mb) => mb + tokenValue);
        }
        console.log(data);
        index++;
      }
      toast("Finalizado!");
      reset();
    } catch (error) {
      toast("Ooops, houve um problema com a requisição.");
    }
  };

  return (
    <Layout home>
      <ToastContainer />
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <header className={utilStyles.header}>
          <h1>Vivo Next</h1>
          <div className={utilStyles.tooltip}>
            <div className={utilStyles.tooltip__item}>
              <div className={utilStyles.tooltip__icon_container}>
                <span className={utilStyles.tooltip__icon}>i</span>
              </div>
              <h2>Informações</h2>
              <p>
                Os dados são gerados através de pacotes patrocinados. Os pacotes
                são limitados, por isso, alguns podem não cair na linha. Alguns
                podem não funcionar também, teste todos.
              </p>
              <p>
                Caso não esteja mais caindo pacotes, verifique no app Meu Vivo
                se os pacotes estão separados, se sim, espere eles "juntar" em
                um mesmo pacote.
              </p>
            </div>
          </div>
        </header>

        <form className={utilStyles.form} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={utilStyles.form__container}>
            <label htmlFor="phone" className={utilStyles.form__label}>
              Número
            </label>
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
              className={utilStyles.form__select_container}
            >
              <label htmlFor="token" className={utilStyles.form__label}>
                Token/Ads
              </label>
              <select
                name="token"
                id="token"
                type="string"
                ref={register({ required: true })}
                className={utilStyles.form__select}
              >
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

            <div
              className={`${utilStyles.form__select_container} ${utilStyles.form__select_repeat}`}
            >
              <label htmlFor="repeat" className={utilStyles.form__label}>
                Repetição
              </label>
              <select
                id="repeat"
                name="repeat"
                type="string"
                ref={register({ required: true })}
                className={utilStyles.form__select}
              >
                <option value="10">10x</option>
                <option value="20">20x</option>
                <option value="30">30x</option>
                <option value="40">40x</option>
                <option value="50">50x</option>
                <option value="100">100x</option>
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
        <div>
          {mbs && <span> {mbs} </span>}{" "}
          <span> MBs adicionados de {tokenChoice}</span>
        </div>
        <a href="https://github.com/rwietter/vivo-internet-gen" target="_blank">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={utilStyles.container__github}
          >
            <g data-name="Layer 2">
              <rect
                width="24"
                height="24"
                transform="rotate(180 12 12)"
                opacity="0"
                className={utilStyles.container__github__item}
              />
              <path
                className={utilStyles.container__github__item}
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
