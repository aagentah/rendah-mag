import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '~/lib/sanity/config.js';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export const SANITY_BLOCK_SERIALIZERS = {
  types: {
    block: (props) => {
      const isEmpty =
        props.node.children.length === 1 &&
        (props.node.children[0].text.trim() === '' ||
          props.node.children[0].text.match(/^\n+$/));

      // Check if the children array is essentially empty or contains only break elements
      const hasOnlyBreaks = props.children.every(
        (child) => typeof child === 'string' && child.trim() === ''
      );

      if (isEmpty || hasOnlyBreaks) {
        return null;
      }

      return <p>{props.children}</p>;
    },
  },
  image: ({ value }) => {
    if (!value?.asset?._ref) {
      return null;
    }
    return <img src={urlFor(value).url()} alt={value.alt || ' '} />;
  },
  list: (props) => <>{props.children}</>,
  listItem: (props) => <li>{props.children}</li>,
  marks: {
    inlineLink: (linkProps) => {
      return (
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="di underline"
          href={linkProps.mark.url}
        >
          {linkProps.children[0]}
        </a>
      );
    },
  },
};
