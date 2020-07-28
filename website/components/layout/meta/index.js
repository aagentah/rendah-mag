import Head from 'next/head';
import { withRouter } from 'next/router';

import { imageBuilder } from '../../../lib/sanity/requests';
import { SITE_URL } from '../../../constants';

const Meta = (props) => {
  const { router, siteConfig, title, description, image } = props;

  // siteConfig
  const siteTitle = siteConfig.title || '';
  const siteDesc = siteConfig.description || '';
  const siteImage =
    imageBuilder.image(siteConfig.logo).height(1000).width(1000).url() || '';

  const titleVal = title || '';
  const descVal = description || '';
  const imageVal = image || '';

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

  return (
    <Head>
      <link rel="canonical" href={`${SITE_URL}${router.asPath}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>
        {titleVal} | {siteTitle}
      </title>

      <meta name="description" content={descVal || siteDesc} />

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={imageVal || siteImage} />
      <meta property="og:title" content={`${titleVal} | ${siteTitle}`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${SITE_URL}${router.asPath}`} />
      <meta property="og:description" content={descVal || siteDesc} />
      <meta property="og:image" content={imageVal || siteImage} />

      <meta name="twitter:card" content="Summary" />
      <meta name="twitter:title" content={`${titleVal} | ${siteTitle}`} />
      <meta name="twitter:description" content={descVal || siteDesc} />
      <meta name="twitter:image" content={imageVal || siteImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeSchema()) }} // eslint-disable-line react/no-danger
      />
    </Head>
  );
};

export default withRouter(Meta);
