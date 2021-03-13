import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { imageBuilder, getLatestMix } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (mix) => {
  if (mix?.slug?.current) {
    let postsXML = '';

    const title = mix?.title || '';

    const description = blocksToHtml({ blocks: mix.description });

    const image = mix?.image
      ? `<img width="400" style="width: 400px;" src="${imageBuilder
          .image(mix.image)
          .width(400)
          .auto('format')
          .url()}" alt="${title}" />`
      : '';

    const link = mix?.soundcloudLink
      ? `
      <p style="text-align: left;">
        Link:
        <a style="text-align: left;" href="${mix.soundcloudLink}">${mix.soundcloudLink}</a>
      </p>
    `
      : '';

    const date = new Date(mix?._createdAt).toUTCString();

    postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${process.env.SITE_URL}</link>
        <pubDate>${date}</pubDate>
        <description>
          ${escapeXml(encodeSpecialChar(description))}
          ${escapeXml(encodeSpecialChar(image))}
          ${escapeXml(encodeSpecialChar(link))}
        </description>
      </item>
      `;

    return `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
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
    const mix = await getLatestMix();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(mix));
    res.end();
  }
}
