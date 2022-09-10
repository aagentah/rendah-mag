import React from 'react';
import WithLink from '../../utils/with-link';

/**
 * A Label.
 */

export default function Label(props) {
  const {
    /* Options */
    customClass,
    text,
    color,
    backgroundColor,
    skeleton,
    onClick,
    /* Children */
    withLinkProps
  } = props;

  const skeletonClass = skeleton
    ? 'skeleton  skeleton-active'
    : 'skeleton  skeleton-disabled';

  return (
    <WithLink
      className={`label__wrapper  ${skeletonClass}`}
      {...(withLinkProps && { withLinkProps })}
    >
      <span
        {...(onClick && { onClick })}
        className={`label ${customClass} ${color} bg-${backgroundColor}`}
      >
        {text || <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />}
      </span>
    </WithLink>
  );
}
