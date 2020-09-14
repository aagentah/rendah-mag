import React from 'react';

import { getAllPosts, imageBuilder } from '~/lib/sanity/requests';
import { SITE_URL } from '~/constants';
import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (posts) => {
  let postsXML = '';

  posts.map((post) => {
    const title =
      post?.title || ''
        ? `<h2 style="font-weight: bold; text-align: left;">${post.title}</h2>`
        : '';

    const titleBlock = post?.title
      ? `<h2 style="font-weight: bold; text-align: left;">${title}</h2>`
      : '';

    const url = post?.slug ? `${SITE_URL}/article/${post.slug}` : SITE_URL;

    const image = post?.image
      ? `<a href="${url}" target="_blank"><img width="300" style="width: 300px;" src="${imageBuilder
          .image(post.image)
          .url()}" alt="${post?.title}" /></a>`
      : '';

    const readMoreLink = `<p><a style="text-decoration: underline; text-align: left;" href="${url}" target="_blank">Read full article</a></p>`;

    const spacer = `
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td>
              <br />
            </td>
          </tr>
        </table>
      `;

    postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${escapeXml(encodeSpecialChar(url))}</link>
        <description>
          ${escapeXml(encodeSpecialChar(image))}
          ${escapeXml(encodeSpecialChar(spacer))}
          ${escapeXml(encodeSpecialChar(titleBlock))}
          ${escapeXml(encodeSpecialChar(readMoreLink))}
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
