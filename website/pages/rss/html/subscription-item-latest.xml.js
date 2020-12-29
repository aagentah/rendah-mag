import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestDominionItems } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (items) => {
  let postsXML = '';

  if (items?.length) {
    for (var i = 0; i < items.length; i++) {
      const item = items[i];

      if (item?.slug?.current) {
        const title = item?.title || '';

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
      </table>
      `;

        postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link></link>
        <description>
          ${escapeXml(encodeSpecialChar(html))}
        </description>
      </item>
      `;
      }
    }

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
  }

  return `
    <rss version="2.0">
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
    const items = await getLatestDominionItems();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(items));
    res.end();
  }
}
