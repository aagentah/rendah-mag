import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';
import { imageBuilder, getLatestDominionItem } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const xml = (item) => {
  let postXML;

  if (item?.slug?.current) {
    const title = item?.title || '';
    let hasLoginPrompt;

    // const description = blocksToHtml({ blocks: item?.description });
    const serializers = {
      types: {
        image: (props) =>
          `
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td><br /><br /></td>
            </tr>
            <img width="400" style="width: 400px; border-radius: 16px;"
              src="${imageBuilder
                .image(props.node)
                .width(800)
                .auto('format')
                .url()}"
              alt="${title}"
            />
            <tr>
              <td><br /><br /></td>
            </tr>
          </table>
          `,
      },
    };

    const description = blocksToHtml({
      blocks: item?.description,
      serializers,
    });

    const url = process.env.SITE_URL;

    const date = new Date(item?.activeFrom).toUTCString();

    if (item?.includeLoginPrompt) {
      hasLoginPrompt = `
            <tr>
              <td><br /></td>
            </tr>
            <tr>
              <td width="50" valign="top">
              </td>
              <td width="400" valign="top">
                <p>
                  <em style="font-style: italic;">
                    Please <a style="text-decoration: underline;" href="${process.env.SITE_URL}/login">log in</a>
                    to access relevant downloads/resources.
                  </em>
                </p>
              </td>
              <td width="50" valign="top">
              </td>
            </tr>
            <tr>
              <td><br /><br /><br /></td>
            </tr>
          `;
    }

    const html = `
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="50" valign="top">
              </td>
              <td width="400" valign="top">
                ${description}
              </td>
              <td width="50" valign="top">
              </td>
            </tr>
            ${
              hasLoginPrompt ||
              `
              <tr>
                <td><br /><br /><br /></td>
              </tr>`
            }
          </table>
          `;

    postXML = `
          <item>
            <title>${escapeXml(title)}</title>
            <link>${escapeXml(encodeSpecialChar(url))}</link>
            <pubDate>${date}</pubDate>
            <description>
              ${escapeXml(encodeSpecialChar(html))}
            </description>
          </item>
          `;

    return `
      <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>${escapeXml(title)}</title>
          <link>${process.env.SITE_URL}</link>
          <description>Dominion Items Latest</description>
          ${postXML}
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
    const item = await getLatestDominionItem();

    res.setHeader('Content-Type', 'text/xml');
    res.write(xml(item));
    res.end();
  }
}
