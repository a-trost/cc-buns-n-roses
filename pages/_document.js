// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

import { createResolver } from "next-slicezone/resolver";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    await createResolver();
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Navigation />
          <Main />
          <NextScript />
          <Footer />
        </body>
      </Html>
    );
  }
}
