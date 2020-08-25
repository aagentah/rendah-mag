import React from 'react';

import { getLatestPublishedCypher } from '../../lib/sanity/requests';
import { SITE_URL } from '../../constants';

// Removes special characters that may break the RSS
const encodeSpecialChar = (text) => {
  return text.replace(/&/g, '&amp;');
};

const sitemapXml = (latestCypher) => {
  let postsXML = '';

  const url = `${SITE_URL}/${latestCypher.slug.current}`;

  postsXML += `
      <item>
        <title>${encodeSpecialChar(latestCypher.title)}</title>
        <link>${encodeSpecialChar(url)}</link>
        <description>${null}</description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>RSS Feed</title>
        <link>${SITE_URL}</link>
        <description>This is a RSS feed</description>
        ${postsXML}
      </channel>
    </rss>
    `;
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const latestCypher = await getLatestPublishedCypher();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(latestCypher));
    res.end();
  }
}
