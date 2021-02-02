import Document, { Html, Head, Main, NextScript } from 'next/document';

import { IS_ECCOMERCE } from '~/constants';
import { GA_TRACKING_ID } from '~/lib/gtag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
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

          <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
              }}
            />
          </>
        </Head>

        <div
          hidden
          id="snipcart"
          data-api-key={process.env.SNIPCART_API_KEY}
          data-config-add-product-behavior="none"
        />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
