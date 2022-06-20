import "../styles/globals.css";
import type { AppProps } from "next/app";

import MasterLayout from "components/layouts/MasterLayout";

import 'antd/dist/antd.css'
import React from "react";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const layout = !appProps.router.pathname.includes('/auth')
  
  return (
    layout ? (
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    ) : <Component {...pageProps} />
  );
}

export default MyApp;
