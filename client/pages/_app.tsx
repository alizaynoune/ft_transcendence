import "../styles/globals.css";
// import 'tailwindcss/tailwind.css'
import type { AppProps } from "next/app";

import MasterLayout from "../components/MasterLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MasterLayout>
      <Component {...pageProps} />
    </MasterLayout>
  );
}

export default MyApp;
