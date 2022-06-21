import "../styles/globals.css";
import type { AppProps } from "next/app";

import MasterLayout from "components/layouts/MasterLayout";
import AuthLayout from 'components/layouts/authLayout/AuthLayout'

import 'antd/dist/antd.css'
import React from "react";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isAuth = appProps.router.pathname.includes('/auth')
  const Layout = isAuth ? AuthLayout : MasterLayout; 
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>

  );
}

export default MyApp;
