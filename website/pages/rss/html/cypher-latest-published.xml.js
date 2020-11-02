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
    ? `<img width="400" style="width: 400px;" src="${imageBuilder
        .image(cypher.imageLandscape)
        .width(400)
        .auto('format')
        .url()}" />`
    : '';

  const url = cypher?.publishedFields?.publishedUrl
    ? `
    <p style="text-align: left;">
      Listen here:
      <a style="text-align: left;" href="${cypher.publishedFields.publishedUrl}">${cypher.publishedFields.publishedUrl}</a>
    </p>
  `
    : '';

  const spacer = `<br />`;

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
