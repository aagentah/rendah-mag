import Document, { Html, Head, Main, NextScript } from 'next/document';

import { IS_ECCOMERCE, SNIPCART_API_KEY } from '~/constants';

export default class MyDocument extends Document {
  render() {
    const renderSnipCartConfig = () => (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.12/default/snipcart.css"
        />
        <div
          hidden
          id="snipcart"
          data-api-key={SNIPCART_API_KEY}
          data-config-add-product-behavior="none"
        />
        <script src="https://cdn.snipcart.com/themes/v3.0.12/default/snipcart.js" />
      </>
    );

    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#000000"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

          {IS_ECCOMERCE && SNIPCART_API_KEY && renderSnipCartConfig()}

          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
