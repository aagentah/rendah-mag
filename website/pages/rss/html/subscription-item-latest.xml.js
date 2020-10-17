import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestDominionItem } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (item) => {
  let postsXML = '';

  const title = item?.title || '';

  const description = blocksToHtml({ blocks: item?.description });

  // TODO: if action buttons
  // const loginText = '<p><ii>Log in to your dominion profile</i></p>'

  const image = item?.image
    ? `<img width="400" style="width: 400px;" src="${imageBuilder
        .image(item.image)
        .auto('format')
        .url()}" />`
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
        </description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>RSS Feed</title>
        <link>${process.env.SITE_URL}</link>
        <description>This is a RSS feed</description>
        ${postsXML}
      </channel>
    </rss>
    `;
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const item = await getLatestDominionItem();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(item));
    res.end();
  }
}
