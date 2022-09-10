import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

/**
 * ProgressiveImage.
 */

const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  const onLoad = () => setLoaded(true);

  useEffect(() => {
    if (ref.current && ref.current.complete) onLoad();
  });

  return [ref, loaded, onLoad];
};

const ProgressiveImage = props => {
  const { src, placeholder, dimensions, alt } = props;
  const [highResRef, highResLoaded, highResOnLoad] = useImageLoaded();
  const [lowResRef, lowResLoaded, lowResOnLoad] = useImageLoaded();

  return (
    <React.Fragment>
      {src && (
        <Image
          width={dimensions.width}
          height={dimensions.height}
          layout="fill"
          blurDataURL={placeholder}
          ref={highResRef}
          alt={alt}
          src={src}
          onLoad={highResOnLoad}
          style={{ maxWidth: '100%' }}
          className={`image ${highResLoaded && 'image--loaded'}`}
        />
      )}
    </React.Fragment>
  );
};

export default ProgressiveImage;
