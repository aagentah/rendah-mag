import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestDominionItems } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (items) => {
  let postsXML = '';

  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      const item = items[i];

      if (item?.slug?.current) {
        const title = item?.title || '';
        let hasButtonsNotice;

        const description = blocksToHtml({ blocks: item?.description });

        // TODO: if action buttons
        // const loginText = '<p><ii>Log in to your dominion profile</i></p>'

        const image = item?.image
          ? `<img width="400" style="width: 400px;" src="${imageBuilder
              .image(item.image)
              .width(400)
              .auto('format')
              .url()}" />`
          : '';

        const url = process.env.SITE_URL;

        const date = new Date(item?.activeFrom).toUTCString();

        if (item?.buttons?.length) {
          hasButtonsNotice = `
            <tr>
              <td width="400" valign="top">
                <p>
                  <em style="font-style: italic;">
                    Please <a href="${process.env.SITE_URL}/login">log in</a> to
                    access the downloads/resources.
                  </em>
                </p>
              </td>
            </tr>
            <tr>
              <td><br /></td>
            </tr>
          `;
        }

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
            ${hasButtonsNotice && hasButtonsNotice}
            <tr>
              <td width="400" valign="top">
                ${image}
              </td>
            </tr>
          </table>
          `;

        postsXML += `
          <item>
            <title>${escapeXml(encodeSpecialChar(title))}</title>
            <link>${escapeXml(encodeSpecialChar(url))}</link>
            <pubDate>${date}</pubDate>
            <description>
              ${escapeXml(encodeSpecialChar(html))}
            </description>
          </item>
          `;
      }
    }
  }

  return `
      <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>Dominion Items Latest</title>
          <link>${process.env.SITE_URL}</link>
          <description>Dominion Items Latest</description>
          <pubDate>${new Date(items[0].activeFrom).toUTCString()}</pubDate>
          ${postsXML}
        </channel>
      </rss>
      `;

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
    const item = await getLatestDominionItems();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(item));
    res.end();
  }
}