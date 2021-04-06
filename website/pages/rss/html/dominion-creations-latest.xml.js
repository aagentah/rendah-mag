import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

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
      const title = post?.title || '';

      const description = post?.excerpt || '';

      const image = post?.image?.asset
        ? `<img width="400" style="width: 400px;" src="${imageBuilder
            .image(post.image)
            .width(400)
            .auto('format')
            .url()}" />`
        : '';

      const url = process.env.SITE_URL;

      const date = new Date(post?.publishedAt).toUTCString();

      const html = `
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="400" valign="top">
                  ${description}
                </td>
              </tr>
              <tr>
                <td><br /></td>
              </tr>
              <tr>
                <td width="400" valign="top">
                  <p>
                    <em style="font-style: italic;">
                      Please <a style="text-decoration: underline;" href="${process.env.SITE_URL}/login">log in</a>
                      to read the full exclusive post.
                    </em>
                  </p>
                </td>
              </tr>
              <tr>
                <td><br /></td>
              </tr>
              <tr>
                <td width="400" valign="top">
                  ${image}
                </td>
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
