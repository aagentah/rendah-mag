import Head from 'next/head';
import { withRouter } from 'next/router';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { imageBuilder } from '~/lib/sanity/requests';

const Meta = (props) => {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { router, siteConfig, title, description, image } = props;

  // siteConfig
  const siteTitle = siteConfig.title || '';
  const siteDesc = siteConfig.description || '';
  const siteImage =
    imageBuilder.image(siteConfig.logo).height(1000).width(1000).url() || '';

  const titleVal = title || '';
  const descVal = description || '';
  const imageVal = image || '';

  const makeSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${process.env.SITE_URL}/#organization`,
          name: siteTitle,
          url: process.env.SITE_URL,
          logo: {
            '@type': 'ImageObject',
            '@id': `${process.env.SITE_URL}/#logo`,
            inLanguage: 'en-US',
            url: siteImage,
            width: 1500,
            height: 1500,
            caption: siteTitle,
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${process.env.SITE_URL}/#website`,
          url: process.env.SITE_URL,
          name: siteTitle,
          description: siteDesc,
          publisher: { '@id': `${process.env.SITE_URL}/#organization` },
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: `${process.env.SITE_URL}/search/{search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          ],
          inLanguage: 'en-US',
        },
        {
          '@type': 'CollectionPage',
          '@id': `${process.env.SITE_URL}/#webpage`,
          url: process.env.SITE_URL,
          name: siteTitle,
          isPartOf: { '@id': `${process.env.SITE_URL}#website` },
          about: { '@id': `${process.env.SITE_URL}/#organization` },
          description: siteDesc,
          inLanguage: 'en-US',
        },
      ],
    };
  };

  const handleSnipcart = () => {
    let canRender = false;

    if (app?.hasSnipcartLoaded) canRender = true;

    if (titleVal === 'Store' || router.pathname.includes('product')) {
      canRender = true;
    }

    if (!canRender) return false;

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
        />
      </>
    );
  };

  return (
    <Head>
      <link rel="canonical" href={`${process.env.SITE_URL}${router.asPath}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>
        {titleVal} | {siteTitle}
      </title>

      <meta name="description" content={descVal || siteDesc} />

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={imageVal || siteImage} />
      <meta property="og:title" content={`${titleVal} | ${siteTitle}`} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`${process.env.SITE_URL}${router.asPath}`}
      />
      <meta property="og:description" content={descVal || siteDesc} />
      <meta property="og:image" content={imageVal || siteImage} />

      <meta name="twitter:card" content="Summary" />
      <meta name="twitter:title" content={`${titleVal} | ${siteTitle}`} />
      <meta name="twitter:description" content={descVal || siteDesc} />
      <meta name="twitter:image" content={imageVal || siteImage} />

      {handleSnipcart()}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeSchema()) }} // eslint-disable-line react/no-danger
      />
    </Head>
  );
};

export default withRouter(Meta);
