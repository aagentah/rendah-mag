import React, { useState } from 'react';
import Image from 'next/future/image';

/**
 * ProgressiveImage.
 */

const ProgressiveImage = props => {
  const [loaded, setLoaded] = useState(false);
  const { src, placeholder, dimensions, alt, priority } = props;

  const handleLoad = () => setLoaded(true);

  return (
    <React.Fragment>
      {src && (
        <Image
          width={parseInt(dimensions.width, 10)}
          height={parseInt(dimensions.height, 10)}
          onLoad={handleLoad}
          alt={alt}
          src={src}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            maxWidth: '100%'
          }}
          className={`image ${loaded ? 'image--loaded' : ''}`}
          // fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      )}
    </React.Fragment>
  );
};

export default ProgressiveImage;
