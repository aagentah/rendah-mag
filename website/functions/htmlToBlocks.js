import blockTools from '@sanity/block-tools';
import Schema from '@sanity/schema';
import jsdom from 'jsdom';

export default (markup) => {
  const { JSDOM } = jsdom;

  // Start with compiling a schema we can work against
  const defaultSchema = Schema.compile({
    name: 'defaultSchema',
    types: [
      {
        type: 'object',
        name: 'blogPost',
        fields: [
          {
            title: 'Body',
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }],
          },
        ],
      },
    ],
  });

  // The compiled schema type for the content type that holds the block array
  const blockContentType = defaultSchema
    .get('blogPost')
    .fields.find((field) => field.name === 'body').type;

  // Convert HTML to block array
  const blocks = blockTools.htmlToBlocks(markup, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });

  return blocks;
};
