// Snipcart
export const IS_ECCOMERCE = true;

// Serializers
export const SANITY_BLOCK_SERIALIZERS = {
  list: (props) => <>{props.children}</>,
  listItem: (props) => <li>{props.children}</li>,
  marks: {
    inlineLink: (linkProps) => {
      return (
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="di  underline"
          href={linkProps.mark.url}
        >
          {linkProps.children[0]}
        </a>
      );
    },
  },
};
