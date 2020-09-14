import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestDominionItem } from '~/lib/sanity/requests';

import { SITE_URL } from '~/constants';
import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (item) => {
  let postsXML = '';

  const title = item?.title || '';

  const description = item?.briefDescription
    ? `<p>${item.briefDescription}</p>`
    : '';

  const image = item?.image
    ? `<img width="300" style="width: 300px;" src="${imageBuilder
        .image(item.image)
        .url()}" />`
    : '';

  postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link></link>
        <description>
          ${escapeXml(encodeSpecialChar(description))}
          ${escapeXml(encodeSpecialChar(image))}
        </description>
      </item>
      `;

  return `
    <rss version="2.0">
      <channel>
        <title>RSS Feed</title>
        <link>${SITE_URL}</link>
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
