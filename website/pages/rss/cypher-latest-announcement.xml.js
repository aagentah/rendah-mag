import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import {
  imageBuilder,
  getLatestAnouncedCypher,
} from '../../lib/sanity/requests';

import { SITE_URL } from '../../constants';
import escapeXml from '../../functions/escapeXml';
import encodeSpecialChar from '../../functions/encodeSpecialChar';

const sitemapXml = (cypher) => {
  let postsXML = '';

  const description = blocksToHtml({
    blocks: cypher.announcementFields.announcementDescription,
  });

  const image = `<img src="${imageBuilder.image(cypher.imageSquare).url()}" />`;

  const packLink = `
    <p>Download Pack:
      <a href="${cypher.packLink}">${cypher.packLink}</a>
    </p>
  `;

  const submissionLink = `
    <p>Download Pack:
      <a href="${cypher.submissionFormLink}">${cypher.submissionFormLink}</a>
    </p>
  `;

  postsXML += `
      <item>
        <title>${encodeSpecialChar(cypher.title)}</title>
        <link></link>
        <description>
          ${escapeXml(encodeSpecialChar(description))}
          ${escapeXml(encodeSpecialChar(image))}
          ${escapeXml(encodeSpecialChar(packLink))}
          ${escapeXml(encodeSpecialChar(submissionLink))}
        </description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>Latest Announced Cypher</title>
        <link>${SITE_URL}</link>
        <description>This is a RSS feed</description>
        ${postsXML}
      </channel>
    </rss>
    `;
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const cypher = await getLatestAnouncedCypher();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(cypher));
    res.end();
  }
}
