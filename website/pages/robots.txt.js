import React from 'react';

const renderRobots = (domainType) => {
  let sitemapData;

  if (domainType === 'production') {
    sitemapData = `
    User-agent: *
    Allow: /

    User-agent: Googlebot
    Disallow: /404/
    Disallow: /forgot/
    Disallow: /profile/
    Disallow: /article-preview/
    Disallow: /store/
    Disallow: /product/
    Disallow: /search/
    Disallow: /login/
    Disallow: /signup/
    Disallow: /membership-complete/
    Disallow: /thank-you/
    Disallow: /i/
    Disallow: /link-in-bio/
    Disallow: /return-policy/
    Disallow: /cookie-policy/
    Disallow: /terms-conditions/
    Disallow: /tool/
    Disallow: /product/thank-you/
    Disallow: /membership/thank-you/
    SITEMAP: http://www.rendahmag.com/feeds/sitemap.xml
    `;
  } else {
    sitemapData = `
    User-agent: *
    Disallow: /
    `;
  }

  return sitemapData;
};

class Robots extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(renderRobots(process.env.ENV_TYPE));
    res.end();
  }
}

export default Robots;
