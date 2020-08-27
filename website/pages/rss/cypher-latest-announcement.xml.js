import React from 'react';
import blocksToHtml from '@sanity/block-content-to-html';

import { getLatestAnouncedCypher } from '../../lib/sanity/requests';
import { SITE_URL } from '../../constants';

// Removes special characters that may break the RSS
const encodeSpecialChar = (text) => {
  return text.replace(/&/g, '&amp;');
};

const sitemapXml = (cypher) => {
  let postsXML = '';

  const description = blocksToHtml({
    blocks: cypher.announcementFields.announcementDescription,
  });

  const packLink = `
    <p>Download Pack:
      <a href="${cypher.packLink}">${cypher.packLink}</a>
    </p>
  `;

  const submissionLink = `
    <p>Download Pack:
      <a href="${cypher.submissionFormLink}">${cypher.submissionFormLink}</a>
    </p>
  `;

  const url = `${SITE_URL}/${cypher.slug.current}`;

  postsXML += `
      <item>
        <title>${encodeSpecialChar(cypher.title)}</title>
        <link>${encodeSpecialChar(url)}</link>
        <description>
          ${encodeSpecialChar(description)}
          ${encodeSpecialChar(packLink)}
          ${encodeSpecialChar(submissionLink)}
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
    const cypher = await getLatestAnouncedCypher();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(cypher));
    res.end();
  }
}
