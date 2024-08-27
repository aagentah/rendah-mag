import React, { useState } from 'react';
import WithLink from '../../utils/with-link';

const ImageComponent = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(true);

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
    /* Children */
    withLinkProps,
  } = props;

  const dimensions = {
    minHeight: height ? `${height}px` : '100%',
    height: height ? `${height}px` : '100%',
    width: width ? `${width}px` : '100%',
    maxWidth: '100%',
  };

  let skeletonActive = true;

  if (src && loaded) {
    skeletonActive = false;
  }

  if (placeholder && placeholderLoaded) {
    skeletonActive = false;
  }

  const skeletonClass = skeletonActive
    ? 'skeleton skeleton-active'
    : 'skeleton';

  // const handleLoad = () => setLoaded(true);
  // const handlePlaceholderLoad = () => setPlaceholderLoaded(true);

  return (
    <figure className="image__figure">
      <WithLink
        style={dimensions}
        className="image__wrapper"
        {...(withLinkProps && { withLinkProps })}
        {...(onClick && { onClick })}
      >
        {src && (
          <img
            alt={alt || ''}
            src={src}
            className="image image--loaded"
            fill
            layout="fill"
            priority={priority}
          />
        )}

        {/* {placeholder && (
          <Image
            onLoadingComplete={handlePlaceholderLoad}
            alt={alt || 'placeholder'}
            src={placeholder}
            fill
            layout="fill"
            className={`image  image--placeholder ${
              loaded ? 'image--loaded' : ''
            }`}
          />
        )} */}
      </WithLink>

      {figcaption && (
        <figcaption className={`image__figcaption ${skeletonClass}`}>
          {figcaption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageComponent;
