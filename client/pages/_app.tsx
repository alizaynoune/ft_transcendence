import "../styles/globals.css";
import type { AppProps } from "next/app";
import MasterLayout from "layouts/MasterLayout";
import AuthLayout from "layouts/authLayout/AuthLayout";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import axios from "@/config/axios";
import { selectAuth, saveToken } from "@/store/reducers/auth";
import { saveToken as saveTokenLocal } from "@/tools/localStorage";
import { useRouter } from "next/router";

store.subscribe(() => {
  saveTokenLocal(store.getState().auth.access_token);
});

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isAuth = appProps.router.pathname.includes("/auth");
  const Layout = isAuth ? AuthLayout : MasterLayout;
  // const access_token = store.getState().auth.access_token;

  // const route = useRouter();
  // const dispatch = useAppDispatch()


  // useEffect(() => {
  //   const { access_token } = route.query;
  //   if (access_token) store.dispatch(saveToken(route.query.access_token));
  // }, [route]);

  // useEffect(() => {
  //   console.log(access_token, 'done');
  //   axios.defaults.headers.common['Authorization'] = `Bearer  ${access_token}`;
  // }, [access_token])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
