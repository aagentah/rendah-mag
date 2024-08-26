import React, { useState, useCallback, useMemo } from 'react';
import NextImage from 'next/image';
import toMarkdown from '@sanity/block-content-to-markdown';
import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

const Modal = dynamic(() => import('~/components/modal'));

const ImageNew = React.memo((props) => {
  const {
    imageObject,
    placeholder,
    height,
    className,
    objectFit,
    isExpandable,
  } = props;
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleImageClick = () => {
    if (isExpandable) {
      setIsModalOpen(true);
    }
  };

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
      .height(typeof height === 'number' ? height * 2 : 1920)
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
    <>
      <div
        className="imageNew relative"
        style={{
          height: '100%',
        }}
      >
        <div
          className={`imageObject over-hidden  ${className || ''} ${
            isExpandable ? 'cp' : ''
          }`}
          style={{
            height: '100%',
            paddingTop,
          }}
          onClick={handleImageClick}
        >
          <div
            className={`skeletonNew ${loaded && 'skeletonNew--fade'}`}
            style={{
              height: '100%',
              // paddingTop,
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

      {isModalOpen && (
        <Modal
          active={isModalOpen}
          size="gallery"
          onClose={() => setIsModalOpen(false)}
          closeIcon={setIsModalOpen}
        >
          <img
            src={imageObject.url}
            alt={altText}
            style={{
              maxHeight: '80vh',
              width: 'auto',
              maxWidth: '100%',
            }}
          />
        </Modal>
      )}
    </>
  );
});

export default ImageNew;
