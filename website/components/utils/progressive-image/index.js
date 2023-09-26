import React, { useState } from 'react';
import Image from 'next/future/image';

/**
 * ProgressiveImage.
 */

const ProgressiveImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const { src, placeholder, alt, priority } = props;

  const handleLoad = () => setLoaded(true);
  const handlePlaceholderLoad = () => setPlaceholderLoaded(true);

  if (src) {
    return (
      <>
        <Image
          onLoadingComplete={handleLoad}
          alt={alt || ''}
          src={src}
          className={`image ${loaded ? 'image--loaded' : ''}`}
          fill
          layout="fill"
          priority={priority}
        />
        {placeholder && (
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
        )}
      </>
    );
  }
};

export default ProgressiveImage;
