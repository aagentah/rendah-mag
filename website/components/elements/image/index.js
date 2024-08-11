import React, { useState } from 'react';
import NextImage from 'next/image';
import WithLink from '../../utils/with-link';

const ImageComponent = (props) => {
  const {
    src,
    alt,
    height,
    width,
    customClass,
    priority,
    onClick,
    //
    figcaption,
    placeholder,
    withLinkProps,
  } = props;

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => setLoaded(true);

  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

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

  const handlePlaceholderLoad = () => setPlaceholderLoaded(true);

  return (
    <figure className="coverImageOld image__figure">
      <WithLink
        style={dimensionsStyle}
        className={`image__wrapper ${skeletonClass} ${customClass || ''}`}
        {...(withLinkProps && { withLinkProps })}
        {...(onClick && { onClick })}
      >
        {src && (
          <NextImage
            onLoadingComplete={handleLoad}
            alt={alt || ''}
            src={src}
            className={`image ${loaded ? 'image--loaded' : ''}`}
            fill
            layout="fill"
            priority={priority}
          />
        )}

        {placeholder && (
          <NextImage
            onLoadingComplete={handlePlaceholderLoad}
            alt={alt || 'placeholder'}
            src={placeholder}
            fill
            layout="fill"
            className={`image image--placeholder ${
              loaded ? 'image--loaded' : ''
            }`}
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
