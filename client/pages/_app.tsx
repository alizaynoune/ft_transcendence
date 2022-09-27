import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import MasterLayout from "layouts/MasterLayout";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { saveToken as saveTokenLocal } from "@/tools/localStorage";

store.subscribe(() => {
  saveTokenLocal(store.getState().auth.access_token);
});

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  // const isAuth = appProps.router.pathname.includes("/auth");
  // const Layout = isAuth ? AuthLayout : MasterLayout;

  return (
    <Provider store={store}>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </Provider>
  );
}

export default MyApp;
