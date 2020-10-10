import Head from 'next/head';
import { withRouter } from 'next/router';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { imageBuilder } from '~/lib/sanity/requests';
import { IS_ECCOMERCE, SNIPCART_API_KEY } from '~/constants';
import { SITE_URL } from '~/constants';

const Meta = (props) => {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { router, siteConfig, title, description, image } = props;

  // siteConfig
  const siteTitle = siteConfig.title || null;
  const siteDesc = siteConfig.description || null;
  const siteImage =
    imageBuilder
      .image(siteConfig.logo)
      .height(1000)
      .width(1000)
      .auto('format')
      .url() || '';

  // Page
  const titleVal = title || null;
  const descVal = description || null;
  const imageVal = image || null;

  const makeSchemaSocials = () => {
    const arr = [];

    Object.keys(siteConfig.socialHandles).forEach((key) => {
      arr.push(siteConfig.socialHandles[key]);
    });

    return arr;
  };

  const makeSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: siteTitle,
          url: SITE_URL,
          sameAs: makeSchemaSocials(),
          logo: {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#logo`,
            inLanguage: 'en-US',
            url: siteImage,
            width: 1500,
            height: 1500,
            caption: siteTitle,
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: siteTitle,
          description: siteDesc,
          publisher: { '@id': `${SITE_URL}/#organization` },
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: `${SITE_URL}/search/{search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          ],
          inLanguage: 'en-US',
        },
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/#webpage`,
          url: SITE_URL,
          name: siteTitle,
          isPartOf: { '@id': `${SITE_URL}#website` },
          about: { '@id': `${SITE_URL}/#organization` },
          description: siteDesc,
          inLanguage: 'en-US',
        },
      ],
    };
  };

  const handleSnipcart = () => {
    let canRender = false;

    if (app?.hasSnipcartLoaded) canRender = true;

    if (
      titleVal === 'Store' ||
      titleVal === 'Product' ||
      titleVal === 'Dominion'
    ) {
      canRender = true;
    }

    if (!canRender) return;

    if (!app?.hasSnipcartLoaded)
      dispatch({ type: 'SET_SNIPCART_LOADED', hasSnipcartLoaded: true });

    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.12/default/snipcart.css"
        />

        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.12/default/snipcart.js"
        ></script>
      </>
    );
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_URL}${router.asPath}`} />

        <title>
          {process.env.NODE_ENV === 'development' ? '(Local) ' : ''}
          {titleVal} | {siteTitle}
        </title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <meta name="description" content={descVal || siteDesc} />

        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={imageVal || siteImage} />
        <meta property="og:title" content={`${titleVal} | ${siteTitle}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}${router.asPath}`} />
        <meta property="og:description" content={descVal || siteDesc} />
        <meta property="og:image" content={imageVal || siteImage} />

        <meta property="fb:app_id" content="154881868603516" />

        <meta name="twitter:card" content="Summary" />
        <meta name="twitter:title" content={`${titleVal} | ${siteTitle}`} />
        <meta name="twitter:description" content={descVal || siteDesc} />
        <meta name="twitter:image" content={imageVal || siteImage} />

        {handleSnipcart()}

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GTM-TGGN2DJ"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', 'GTM-TGGN2DJ');
               `,
          }}
        />
      </Head>
    </>
  );
};

export default withRouter(Meta);
