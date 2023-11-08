import React from 'react';
import { toHTML } from '@portabletext/to-html';

import { imageBuilder, getLatestNewsletterCypher } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const xml = (item) => {
  let postXML;
  const { title, description, from, activeFrom, slug } = item;

  if (title && description && from && slug?.current) {
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

    const descriptionHtml = toHTML(description, {
      components: serializers,
    });

    const url = process.env.SITE_URL;

    const date = new Date(activeFrom).toUTCString();

    const html = `
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="50" valign="top">
              </td>
              <td width="500" valign="top">
                ${descriptionHtml}
              </td>
              <td width="50" valign="top">
              </td>
            </tr>
          </table>
          `;

    // ${escapeXml(encodeSpecialChar(html))}

    postXML = `
          <item>
            <title>${escapeXml(title)}</title>
            <link>${escapeXml(encodeSpecialChar(url))}</link>
            <pubDate>${date}</pubDate>
            <dc:creator>${escapeXml(from)}</dc:creator>	
            <description>
              <![CDATA[
                ${html}
              ]]>
            </description>
          </item>
          `;

    return `
      <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>${escapeXml(title)}</title>
          <link>${process.env.SITE_URL}</link>
          <description>Newsletter General</description>
          ${postXML}
        </channel>
      </rss>
      `;
  }

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title></title>
        <link></link>
        <description></description>
      </channel>
    </rss>
    `;
};

export default class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const item = await getLatestNewsletterCypher();

    res.setHeader('Content-Type', 'text/xml');
    res.write(xml(item));
    res.end();
  }
}
