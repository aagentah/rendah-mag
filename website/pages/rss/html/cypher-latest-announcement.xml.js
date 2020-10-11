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
    ? `<img width="300" style="width: 300px;" src="${imageBuilder
        .image(cypher.imageSquare)
        .auto('format').url()}" alt="${title}" />`
    : '';

  const packLink = cypher.packLink
    ? `
    <p>
      Download Pack:
      <a href="${cypher.packLink}">${cypher.packLink}</a>
    </p>
  `
    : '';

  const submissionLink = cypher.submissionFormLink
    ? `
    <p>
      Submission Form:
      <a href="${cypher.submissionFormLink}">${cypher.submissionFormLink}</a>
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
