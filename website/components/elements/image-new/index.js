import React, { useState, useCallback, useMemo } from 'react';
import NextImage from 'next/image';
import toMarkdown from '@sanity/block-content-to-markdown';
import BlockContent from '@sanity/block-content-to-react';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

const ImageNew = React.memo((props) => {
  const { imageObject, placeholder, height, width, className, objectFit } =
    props;
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
      .width(height ? height * 2 : 1920)
      .auto('format')
      .fit('clip')
      .url();
  }, [url, height]);

  let paddingTop = `${100 / aspectRatio}%`;

  if (height) {
    paddingTop = null;
  }

  // if (height && height === '100vh') {
  //   paddingTop = `${window.innerHeight}px`;
  // }

  return (
    <div
      className="imageNew"
      style={{
        height: '100%',
      }}
    >
      <div
        className={`imageObject over-hidden ${className || ''}`}
        style={{
          height: '100%',
          paddingTop,
        }}
      >
        <div
          className={`skeletonNew ${loaded && 'skeletonNew--fade'}`}
          style={{
            height: '100%',
            paddingTop,
          }}
        />

        <div
          style={{
            height: height || '100%',
          }}
        >
          <NextImage
            src={imageUrl}
            alt={altText}
            layout="fill"
            objectFit={objectFit || 'cover'}
            onLoadingComplete={handleLoad}
            className={`image ${loaded ? 'image--loaded' : ''}`}
            placeholder={placeholder || 'empty'}
          />
        </div>
      </div>

      {caption && (
        <figcaption className="imageNew__captions tac mt2 pt1 f6 ph3 o-50">
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
