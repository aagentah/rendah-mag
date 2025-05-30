import React from 'react';
import TruncateMarkup from 'react-truncate-markup';
import WithLink from '../../utils/with-link';

/**
 * A Heading.
 */

export default function Heading(props) {
  const {
    /* Options */
    htmlEntity,
    text,
    color,
    size,
    truncate,
    skeleton,
    onClick,
    /* Children */
    withLinkProps,
  } = props;

  const ElementType = htmlEntity || 'h1';
  const ElementTypeInner = truncate ? TruncateMarkup : React.Fragment;

  const heightSmall = 22;
  const heightMedium = 24;
  const heightLarge = 26;
  const heightXLarge = 42;

  let lineHeight;
  let fontSize;

  switch (size) {
    case 'small':
      fontSize = 'text-sm';
      lineHeight = heightSmall;
      break;
    case 'medium':
      fontSize = 'text-md';
      lineHeight = heightMedium;
      break;
    case 'large':
      fontSize = 'text-lg';
      lineHeight = heightLarge;
      break;
    case 'x-large':
      fontSize = 'text-xl';
      lineHeight = heightXLarge;
      break;
    default:
      fontSize = 'text-md';
      lineHeight = heightSmall;
  }

  const styles = {
    lineHeight: `${lineHeight}px`,
    height: truncate ? `${lineHeight * (truncate || 1)}px` : 'auto',
  };

  const skeletonClass = skeleton ? 'skeleton  skeleton-active' : 'skeleton';

  return (
    <WithLink {...(withLinkProps && { withLinkProps })}>
      <ElementType
        className={`heading ${fontSize} text-${color} ${skeletonClass}`}
        style={styles}
        {...(onClick && { onClick })}
      >
        <ElementTypeInner {...(truncate && { lines: truncate })}>
          <span>
            {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
          </span>
        </ElementTypeInner>
      </ElementType>
    </WithLink>
  );
}
