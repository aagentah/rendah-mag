import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestAnouncedCypher } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (cypher) => {
  let postsXML = '';

  const title = cypher?.title || '';

  const description = cypher?.announcementFields?.announcementDescription
    ? blocksToHtml({
        blocks: cypher.announcementFields.announcementDescription,
      })
    : '';

  const image = cypher?.imageSquare
    ? `<img width="400" style="width: 400px;" src="${imageBuilder
        .image(cypher.imageSquare)
        .width(800)
        .auto('format')
        .url()}" alt="${title}" />`
    : '';

  const packLink = cypher.packLink
    ? `
    <p style="text-align: left;">
      Download the pack <a style="text-align: left;" href="${cypher.packLink}">here</a>.
    </p>
  `
    : '';

  const submissionLink = cypher.submissionFormLink
    ? `
    <p style="text-align: left;">
      Submission Form:
      <a style="text-align: left;" href="${cypher.submissionFormLink}">${cypher.submissionFormLink}</a>
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
          ${escapeXml(encodeSpecialChar(packLink))}
          ${escapeXml(encodeSpecialChar(submissionLink))}
        </description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>New Cypher announced!</title>
        <link>${process.env.SITE_URL}</link>
        <description></description>
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
