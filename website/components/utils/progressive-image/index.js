import React, { useState } from 'react';
import Image from 'next/future/image';

/**
 * ProgressiveImage.
 */

const ProgressiveImage = props => {
  const [loaded, setLoaded] = useState(false);
  const { src, alt, priority } = props;

  const handleLoad = () => setLoaded(true);

  if (src) {
    return (
      <Image
        onLoadingComplete={handleLoad}
        alt={alt || ''}
        src={src}
        className={`image ${loaded ? 'image--loaded' : ''}`}
        fill
        layout="fill"
        priority={priority}
      />
    );
  }
};

export default ProgressiveImage;
