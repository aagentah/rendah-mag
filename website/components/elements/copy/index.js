import React from 'react';
import TruncateMarkup from 'react-truncate-markup';

/**
 * A Copy.
 */

export default function Copy(props) {
  const {
    /* Options */
    text,
    color,
    size,
    truncate,
    skeleton
  } = props;

  const ElementType = truncate ? TruncateMarkup : React.Fragment;

  let lineHeight;
  switch (size) {
    case 'small':
      lineHeight = 18;
      break;
    case 'medium':
      lineHeight = 22;
      break;
    case 'large':
      lineHeight = 24;
      break;
    case 'x-large':
      lineHeight = 26;
      break;
    default:
      lineHeight = 24;
  }

  const styles = {
    lineHeight: `${lineHeight}px`,
    height: truncate ? `${lineHeight * (truncate || 1)}px` : 'auto'
  };

  const skeletonClass = skeleton ? 'skeleton  skeleton-active' : 'skeleton';

  return (
    <span className={`copy ${size} ${color} ${skeletonClass}`} style={styles}>
      <ElementType {...(truncate && { lines: truncate })}>
        <span>
          {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
        </span>
      </ElementType>
    </span>
  );
}
