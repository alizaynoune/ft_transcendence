import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import MasterLayout from "layouts/MasterLayout";
import AuthLayout from "layouts/authLayout/AuthLayout";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { saveSession, loadSession } from "tools/localStorage";

store.subscribe(() => {
  saveSession({
    auth: store.getState().auth,
  });
});

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isAuth = appProps.router.pathname.includes("/auth");
  const Layout = isAuth ? AuthLayout : MasterLayout;
  const session = pageProps.session;

  useEffect(() => {
    console.log(store);
    
  }, [])

  return (
    // ! Delete Session Provider
    // <SessionProvider session={session}>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    // </SessionProvider>
  );
}

export default MyApp;
