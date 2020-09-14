import React from 'react';

import { getAllPosts, imageBuilder } from '~/lib/sanity/requests';
import { SITE_URL } from '~/constants';

// Removes special characters that may break the RSS
const encodeSpecialChar = (text) => {
  return text.replace(/&/g, '&amp;');
};

const sitemapXml = (posts) => {
  let postsXML = '';

  posts.map((post) => {
    const title = post?.title || '';

    const image = post?.image
      ? `<img src="${imageBuilder
          .image(post.image)
          .height(250)
          .width(300)
          .url()}" alt="${title}" width="300" style="width: 300px; margin-bottom: 20px;" />`
      : '';

    const description = post?.description ? `<p>${post.description}</p>` : '';

    const url = post?.url ? `${SITE_URL}/${post.url}` : SITE_URL;

    postsXML += `
      <item>
        <title>${encodeSpecialChar(title)}</title>
        <link>${encodeSpecialChar(url)}</link>
        <description>
          ${encodeSpecialChar(image)}
          ${encodeSpecialChar(description)}
        </description>
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

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const posts = await getAllPosts();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(posts));
    res.end();
  }
}
