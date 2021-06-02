import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/styles.scss";
import "@fontsource/metal-mania";
import "@fontsource/open-sans";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel="shortcut icon" href="/bouncy-logo.svg" /> */}
        <title>Grim Reaper's Used Cars - A Component Carousel Site</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
