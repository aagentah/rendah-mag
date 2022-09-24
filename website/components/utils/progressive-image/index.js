import React, { useState } from 'react';
import Image from 'next/future/image';

/**
 * ProgressiveImage.
 */

const ProgressiveImage = props => {
  const [loaded, setLoaded] = useState(false);
  const { src, alt, priority } = props;

  const handleLoad = () => setLoaded(true);

  console.log('alt', alt);

  if (src) {
    return (
      <Image
        onLoad={handleLoad}
        alt={alt || ''}
        src={src}
        className={`image ${loaded ? 'image--loaded' : ''}`}
        fill
        priority={priority}
      />
    );
  }
};

export default ProgressiveImage;
