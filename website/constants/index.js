export const SANITY_BLOCK_SERIALIZERS = {
  types: {
    block: (props) => {
      console.log('props', props);
      // Check for the condition where a single child exists and it contains only a newline character
      const hasOnlyNewline =
        props.node.children.length === 1 &&
        props.node.children[0].text === '\n';

      if (hasOnlyNewline) {
        // Do not render anything
        return null;
      }

      // Otherwise, render the paragraph as usual
      return <p>{props.children}</p>;
    },
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
