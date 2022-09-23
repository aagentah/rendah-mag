import React from 'react';
import ProgressiveImage from '../../utils/progressive-image';
import WithLink from '../../utils/with-link';

/**
 * An Image.
 */

export default function Image(props) {
  const {
    /* Options */
    src,
    placeholder,
    alt,
    figcaption,
    height,
    width,
    customClass,
    priority,
    onClick,
    skeleton,
    /* Children */
    withLinkProps
  } = props;

  const dimensions = {
    minHeight: height ? `${height}px` : '100%',
    height: height ? `${height}px` : '100%',
    width: width ? `${width}px` : '100%',
    maxWidth: '100%'
  };

  const skeletonClass = skeleton ? 'skeleton  skeleton-active' : 'skeleton';

  return (
    <figure className="image__figure">
      <WithLink
        style={dimensions}
        className={`image__wrapper  ${skeletonClass}  ${customClass || ''} `}
        {...(withLinkProps && { withLinkProps })}
        {...(onClick && { onClick })}
      >
        <ProgressiveImage src={src} alt={alt} priority={priority} />
      </WithLink>

      {figcaption && (
        <figcaption className={`image__figcaption ${skeletonClass}`}>
          {figcaption}
        </figcaption>
      )}
    </figure>
  );
}
