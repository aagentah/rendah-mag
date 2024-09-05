import React, { useState } from 'react';
import WithLink from '../../utils/with-link';

const ImageComponent = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

  const {
    src,
    alt,
    height,
    width,
    customClass,
    priority,
    onClick,
    figcaption,
    placeholder,
    withLinkProps,
  } = props;

  const handleLoad = () => setLoaded(true);
  const handlePlaceholderLoad = () => setPlaceholderLoaded(true);

  const dimensionsStyle = {
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

  return (
    <figure className="coverImageOld image__figure">
      <WithLink
        style={dimensionsStyle}
        className="image__wrapper"
        {...(withLinkProps && { withLinkProps })}
        {...(onClick && { onClick })}
      >
        {src && (
          <img
            alt={alt || ''}
            src={src}
            className="image image--loaded"
            onLoad={handleLoad}
            fill
            layout="fill"
            priority={priority}
          />
        )}

        {placeholder && (
          <img
            onLoad={handlePlaceholderLoad}
            alt={alt || 'placeholder'}
            src={placeholder}
            className={`image image--placeholder ${
              loaded ? 'image--loaded' : ''
            }`}
            fill
            layout="fill"
          />
        )}
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
