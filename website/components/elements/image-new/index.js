import React, { useState, useCallback, useMemo } from 'react';
import NextImage from 'next/image';
import toMarkdown from '@sanity/block-content-to-markdown';
import BlockContent from '@sanity/block-content-to-react';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

const ImageNew = React.memo((props) => {
  const { imageObject, placeholder, height, width, className } = props;
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  if (!imageObject) return null;

  const { url, caption, dimensions } = imageObject;

  const altText = toMarkdown(caption) || '';

  const aspectRatio = useMemo(
    () =>
      dimensions?.width && dimensions?.height
        ? dimensions.width / dimensions.height
        : 1,
    [dimensions]
  );

  const imageUrl = useMemo(() => {
    if (!url) return '';
    return imageBuilder
      .image(url)
      .width(width ? width * 2 : 1920)
      .auto('format')
      .fit('clip')
      .url();
  }, [url, width]);

  let paddingTop = `${100 / aspectRatio}%`;

  if (height) {
    paddingTop = null;
  }

  if (height && height === '100vh') {
    paddingTop = `${window.innerHeight}px`;
  }

  return (
    <div className="imageNew">
      <div className={`imageObject over-hidden ${className || ''}`}>
        <div
          className="skeletonNew"
          style={{
            height: height || 'auto',
            paddingTop,
          }}
        />

        <NextImage
          src={imageUrl}
          alt={altText}
          width={width || dimensions?.width || 200}
          height={
            height === '100vh'
              ? window.innerHeight + 50
              : height || dimensions?.height || 200
          }
          layout="responsive"
          onLoadingComplete={handleLoad}
          className={`image ${loaded ? 'image--loaded' : ''}`}
          placeholder={placeholder || 'empty'}
        />
      </div>

      {caption && (
        <figcaption className="imageNew__captions tac mt2 pt1 grey f6 ph3">
          <BlockContent
            blocks={caption}
            serializers={SANITY_BLOCK_SERIALIZERS}
          />
        </figcaption>
      )}
    </div>
  );
});

export default ImageNew;
