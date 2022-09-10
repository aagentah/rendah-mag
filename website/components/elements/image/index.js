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
    onClick,
    skeleton,
    /* Children */
    withLinkProps
  } = props;

  const heightVal = height ? `${height}px` : '100%';
  const widthVal = width ? `${width}px` : '100%';

  const dimensions = {
    height: heightVal,
    width: widthVal,
    maxWidth: '100%'
  };

  const skeletonClass = skeleton ? 'skeleton  skeleton-active' : 'skeleton';

  return (
    <figure className="image__figure" style={dimensions}>
      <div style={dimensions}>
        <WithLink
          style={dimensions}
          className={`image__wrapper  ${skeletonClass}  ${
            customClass || ''
          } `}
          {...(withLinkProps && { withLinkProps })}
          {...(onClick && { onClick })}
        >
          <ProgressiveImage
            src={src}
            placeholder={placeholder}
            dimensions={dimensions}
            alt={alt}
          />
        </WithLink>
      </div>

      {figcaption && (
        <figcaption className={`image__figcaption ${skeletonClass}`}>
          {figcaption}
        </figcaption>
      )}
    </figure>
  );
}
