import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import MasterLayout from "components/layouts/MasterLayout";
import AuthLayout from 'components/layouts/authLayout/AuthLayout'
import 'antd/dist/antd.css'
import React, { StrictMode } from "react";



function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isAuth = appProps.router.pathname.includes('/auth')
  const Layout = isAuth ? AuthLayout : MasterLayout;
  const session = pageProps.session
  const nodeRef = React.useRef(null)

  return (
      <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </SessionProvider>
  );
}

export default MyApp;
