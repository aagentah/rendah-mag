import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestAnouncedCypher } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (cypher) => {
  if (cypher?.slug?.current) {
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
          .width(400)
          .auto('format')
          .url()}" alt="${title}" />`
      : '';

    const packLink = cypher.packLink
      ? `
      <p style="text-align: left;">
        Download the pack <a style="text-align: left; text-decoration: underline;" href="${cypher.packLink}">here</a>.
      </p>
    `
      : '';

    const submissionLink = cypher.submissionFormLink
      ? `
      <p style="text-align: left;">
        Submit your track <a style="text-align: left; text-decoration: underline;" href="${cypher.submissionFormLink}">here</a>.
      </p>
  `
      : '';

    const date = new Date(
      cypher?.announcementFields?.announcedAt
    ).toUTCString();

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
            ${image}
          </td>
        </tr>
        <tr>
          <td><br /></td>
        </tr>
        <tr>
          <td width="400" valign="top">
            ${packLink}
          </td>
        </tr>
        <tr>
          <td width="400" valign="top">
            ${submissionLink}
          </td>
        </tr>
      </table>
    `;

    postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${process.env.SITE_URL}</link>
        <pubDate>${date}</pubDate>
        <description>
          ${escapeXml(encodeSpecialChar(html))}
        </description>
      </item>
      `;

    return `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>New Cypher announced!</title>
        <link>${process.env.SITE_URL}</link>
        <description></description>
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
    const cypher = await getLatestAnouncedCypher();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(cypher));
    res.end();
  }
}
