import React from 'react';
import { toHTML } from '@portabletext/to-html';

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
        image: ({ value }) => {
          return `
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td><br /></td>
            </tr>
            <tr>
              <td width="500" valign="top">
                <img width="500" style="width: 500px; border-radius: 16px;"
                  src="${imageBuilder
                    .image(value)
                    .width(800)
                    .auto('format')
                    .url()}"
                  alt="${title}"
                />
              </td>
            </tr>
            <tr>
              <td><br /></td>
            </tr>
          </table>
        `;
        },
      },
    };

    const description = toHTML(item?.description, {
      components: serializers,
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
              <td width="500" valign="top">
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
              <td width="500" valign="top">
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

    // ${escapeXml(encodeSpecialChar(html))}

    postXML = `
          <item>
            <title>${escapeXml(title)}</title>
            <link>${escapeXml(encodeSpecialChar(url))}</link>
            <pubDate>${date}</pubDate>
            <description>
              <![CDATA[
                ${html}
              ]]>
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
