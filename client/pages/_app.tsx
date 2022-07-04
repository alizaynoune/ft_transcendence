import "../styles/globals.css";
import type { AppProps } from "next/app";
import MasterLayout from "layouts/MasterLayout";
import AuthLayout from "layouts/authLayout/AuthLayout";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { saveSession, loadSession } from "tools/localStorage";
import {AuhtTunk} from '@/actions/auth'
import {useAppDispatch} from '@/hooks/reduxHooks'

store.subscribe(() => {
  saveSession(store.getState().auth.token);
});

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isAuth = appProps.router.pathname.includes("/auth");
  const Layout = isAuth ? AuthLayout : MasterLayout;

  useEffect(() => {
    console.log(store);
    // ! change to login by token
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
