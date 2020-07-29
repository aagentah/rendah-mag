import React from 'react';

import { getAllPosts } from '../lib/sanity/requests';
import { SITE_URL } from '../constants';

// Removes special characters that may break the RSS
const encodeSpecialChar = (text) => {
  return text.replace(/&/g, '&amp;');
};

const sitemapXml = (allPosts) => {
  let postsXML = '';

  allPosts.map((post) => {
    const url = `${SITE_URL}/${post.slug}`;

    postsXML += `
      <item>
        <title>${encodeSpecialChar(post.title)}</title>
        <link>${encodeSpecialChar(url)}</link>
        <description>${encodeSpecialChar(post.description)}</description>
      </item>
      `;

    return true;
  });

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

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const allPosts = await getAllPosts();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(allPosts));
    res.end();
  }
}

export default Sitemap;
