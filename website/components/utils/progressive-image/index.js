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
        onLoad={handleLoad}
        alt={alt}
        src={src}
        className={`image ${loaded ? 'image--loaded' : ''}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    );
  }
};

export default ProgressiveImage;
