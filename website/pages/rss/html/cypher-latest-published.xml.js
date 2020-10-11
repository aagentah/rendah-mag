import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestPublishedCypher } from '~/lib/sanity/requests';


import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (cypher) => {
  let postsXML = '';

  const title = cypher?.title || '';

  const description = cypher?.publishedFields?.publishedDescription
    ? blocksToHtml({
        blocks: cypher.publishedFields.publishedDescription,
      })
    : '';

  const image = cypher?.imageLandscape
    ? `<img width="300" style="width: 300px;" src="${imageBuilder
        .image(cypher.imageLandscape)
        .auto('format').url()}" />`
    : '';

  const url = cypher?.publishedFields?.shortUrl
    ? `
    <p>
      Listen here:
      <a href="${cypher.publishedFields.shortUrl}">${cypher.publishedFields.shortUrl}</a>
    </p>
  `
    : '';

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
        <link></link>
        <description>
          ${escapeXml(encodeSpecialChar(description))}
          ${escapeXml(encodeSpecialChar(spacer))}
          ${escapeXml(encodeSpecialChar(image))}
          ${escapeXml(encodeSpecialChar(spacer))}
          ${escapeXml(encodeSpecialChar(url))}
        </description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>Latest Published Cypher</title>
        <link>${process.env.SITE_URL}</link>
        <description>This is a RSS feed</description>
        ${postsXML}
      </channel>
    </rss>
    `;
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const cypher = await getLatestPublishedCypher();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(cypher));
    res.end();
  }
}
