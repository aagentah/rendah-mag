import React from 'react';

import { getAllPosts, imageBuilder } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const isEven = (number) => {
  return number % 2 === 0;
};

const sitemapXml = (posts) => {
  if (posts.length) {
    let postsXML = '';

    posts.map((post, i) => {
      const title = post?.title;

      const titleBlock = post?.title
        ? `<h2 style="font-weight: bold; text-align: left;  ${
            isEven(i) ? 'color: #d9d9d9;' : ''
          }">${title}</h2>`
        : '';

      const tagLineBlock = post?.socialTagline
        ? `<p style="color: #000000; text-align: left;  ${
            isEven(i) ? 'color: #d9d9d9;' : ''
          }">${post.socialTagline}</p>`
        : '';

      const url = post?.slug
        ? `${process.env.SITE_URL}/article/${post.slug}`
        : process.env.SITE_URL;

      const date = new Date(post?.publishedAt).toUTCString();
      const readMoreLink = `<p><a style="color: #000000 !important; text-decoration: underline; text-align: left;  ${
        isEven(i) ? 'color: #d9d9d9 !important;' : ''
      }" href="${url}" target="_blank">Read full article</a></p>`;

      const html = `
      <table cellspacing="0" cellpadding="0" border="0" width="100%" ${
        isEven(i) ? `style="background: #1c1c1c; color: #d9d9d9;` : ''
      }>
        ${
          isEven(i)
            ? `
            <tr>
              <td><br /></td>
            </tr>
              `
            : `
              `
        }
        <tr>
          <td width="300" valign="top" style="border-radius: 1rem;">
            <img width="300" style="width: 300px; border-radius: 1rem;" src="${imageBuilder
              .image(post.coverImage)
              .height(300)
              .width(300)
              .auto('format')
              .url()}" alt="${post?.title}">
          </td>
        </tr>
        <tr>
          <td><br /></td>
        </tr>
        <tr>
          <td width="300" valign="top">
            ${titleBlock}
            ${tagLineBlock}
            ${readMoreLink}
          </td>
        </tr>
        ${
          isEven(i)
            ? `
            <tr>
              <td><br /></td>
            </tr>
              `
            : `
              `
        }
        <tr>
          <td><br /></td>
        </tr>
      </table>
      `;

      postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${escapeXml(encodeSpecialChar(url))}</link>
        <pubDate>${date}</pubDate>
        <description>
          ${escapeXml(encodeSpecialChar(html))}
        </description>
      </item>
      `;

      return true;
    });

    return `
      <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>RSS Feed</title>
          <link>${process.env.SITE_URL}</link>
          <description>This is a RSS feed</description>
          ${postsXML}
        </channel>
      </rss>
      `;
  }

  return `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title></title>
        <link></link>
        <description></description>
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
