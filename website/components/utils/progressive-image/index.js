import React from 'react';
import Image from 'next/future/image';

/**
 * ProgressiveImage.
 */

const ProgressiveImage = props => {
  const { src, placeholder, dimensions, alt } = props;

  return (
    <React.Fragment>
      {src && (
        <Image
          width={parseInt(dimensions.width, 10)}
          height={parseInt(dimensions.height, 10)}
          placeholder={placeholder}
          alt={alt}
          src={src}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            maxWidth: '100%'
          }}
          className="image image--loaded"
          // sizes="100vw"
          // fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </React.Fragment>
  );
};

export default ProgressiveImage;
