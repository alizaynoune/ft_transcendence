import "../styles/globals.css";
// import 'tailwindcss/tailwind.css'
import type { AppProps } from "next/app";

import MasterLayout from "../components/layouts/MasterLayout";

import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MasterLayout>
      <Component {...pageProps} />
    </MasterLayout>
  );
}

export default MyApp;
