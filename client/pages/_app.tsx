import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import MasterLayout from "layouts/MasterLayout";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { saveToken as saveTokenLocal } from "@/tools/localStorage";

store.subscribe(() => {
  saveTokenLocal(store.getState().auth.access_token);
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </Provider>
  );
}

export default MyApp;
