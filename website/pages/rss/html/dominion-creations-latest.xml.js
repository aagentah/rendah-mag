import React from 'react';

import {
  imageBuilder,
  getLatestDominionCreations,
} from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (posts) => {
  if (posts.length) {
    let postsXML = '';

    posts.map((post) => {
      const title = post?.title;

      const titleBlock = post?.title
        ? `<h2 style="font-weight: bold; text-align: left;">${title}</h2>`
        : '';

      const tagLineBlock = post?.excerpt
        ? `<p style="color: #000000; text-align: left;">${post.excerpt}</p>`
        : '';

      const image = post?.coverImage
        ? `<img width="400" style="width: 400px; border-radius: 1rem;" src="${imageBuilder
            .image(post.coverImage)
            .width(400)
            .height(300)
            .auto('format')
            .url()}" />`
        : '';

      const url = post?.slug
        ? `${process.env.SITE_URL}/creations/${post.slug}`
        : process.env.SITE_URL;

      const readMoreLink = `<p><a style="color: #000000; text-decoration: underline; text-align: left;" href="${url}" target="_blank">Read full article</a></p>`;

      const date = new Date(post?.publishedAt).toUTCString();

      const html = `
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="400" valign="top">
                  ${image}
                </td>
              </tr>
              <tr>
                <td><br /></td>
              </tr>
              <tr>
                <td width="400" valign="top">
                ${titleBlock}
                ${tagLineBlock}
                ${readMoreLink}
                </td>
              </tr>
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
    const posts = await getLatestDominionCreations();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(posts));
    res.end();
  }
}
