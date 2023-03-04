/* eslint-disable react/jsx-props-no-spreading */
import { Global, css } from '@emotion/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
