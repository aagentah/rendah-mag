import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import {
  imageBuilder,
  getLatestPublishedCypher,
} from '../../lib/sanity/requests';

import { SITE_URL } from '../../constants';
import escapeXml from '../../functions/escapeXml';
import encodeSpecialChar from '../../functions/encodeSpecialChar';

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
        .url()}" />`
    : '';

  const url = cypher?.publishedFields?.shortUrl
    ? `
    <p>
      Listen here:
      <a href="${cypher.publishedFields.shortUrl}">${cypher.publishedFields.shortUrl}</a>
    </p>
  `
    : '';

  postsXML += `
      <item>
        <title>${encodeSpecialChar(title)}</title>
        <link></link>
        <description>
          ${escapeXml(encodeSpecialChar(description))}
          ${escapeXml(encodeSpecialChar(image))}
          ${escapeXml(encodeSpecialChar(url))}
        </description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>Latest Published Cypher</title>
        <link>${SITE_URL}</link>
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
