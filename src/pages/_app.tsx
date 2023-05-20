import type { AppProps } from "next/app";
import { Inter, Press_Start_2P } from "next/font/google";
import Head from "next/head";

import "@/common/styles/globals.css";
import { AuthProvider } from "@/common/context";
import Header from "@/common/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-pressStart2P: ${pressStart2P.style.fontFamily};
          }
        `}
      </style>
      <div className="max-w-full max-h-full h-screen bg-transparent">
        <AuthProvider>
          <Header />

          <main className="w-full h-full">
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      </div>
    </>
  );
}
