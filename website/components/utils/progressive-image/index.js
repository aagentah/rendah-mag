import React, { useEffect, useState, useRef } from 'react';

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
      {placeholder && (
        <img
          ref={lowResRef}
          alt="loading..."
          src={placeholder}
          onLoad={lowResOnLoad}
          style={dimensions}
          className={`image__loading ${lowResLoaded && 'image__loading--done'}`}
        />
      )}

      {src && (
        <img
          ref={highResRef}
          alt={alt}
          src={src}
          onLoad={highResOnLoad}
          style={dimensions}
          className={`image ${highResLoaded && 'image--loaded'}`}
        />
      )}
    </React.Fragment>
  );
};

export default ProgressiveImage;
