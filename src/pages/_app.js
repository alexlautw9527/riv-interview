/* eslint-disable react/jsx-props-no-spreading */
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset},
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
