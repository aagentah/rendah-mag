import React from 'react';

import { getLatestGuestMix } from '../../lib/sanity/requests';
import { SITE_URL } from '../../constants';

// Removes special characters that may break the RSS
const encodeSpecialChar = (text) => {
  return text.replace(/&/g, '&amp;');
};

const sitemapXml = (guestMix) => {
  let postsXML = '';

  const url = `${SITE_URL}/${guestMix.slug.current}`;

  postsXML += `
      <item>
        <title>${encodeSpecialChar(guestMix.title)}</title>
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
    const guestMix = await getLatestGuestMix();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(guestMix));
    res.end();
  }
}
