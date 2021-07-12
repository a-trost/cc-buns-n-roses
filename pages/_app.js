import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/styles.scss";
import "@fontsource/metal-mania";
import "@fontsource/open-sans";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/three@0.115/build/three.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.115/examples/js/loaders/GLTFLoader.js"></script>
        {/* <link rel="shortcut icon" href="/bouncy-logo.svg" /> */}
        <title>Buns 'N Roses - A Component Carousel Site</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
