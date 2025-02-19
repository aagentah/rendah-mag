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
    className = '',
    objectFit,
    isExpandable,
    type,
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

  // Only add padding-top if height is not specified
  const paddingTop = height ? undefined : `${100 / aspectRatio}%`;

  return (
    <>
      <div className="relative w-full h-full">
        <div
          className={`relative overflow-hidden ${className} ${
            isExpandable ? 'cursor-pointer' : ''
          }`}
          style={{ height: '100%', paddingTop }}
          onClick={handleImageClick}
        >
          {/* Skeleton overlay */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ease-in-out ${
              loaded ? 'opacity-0' : 'opacity-100'
            } bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]`}
          />
          <div style={{ height: height || '100%' }}>
            <NextImage
              src={imageUrl}
              alt={altText}
              layout="fill"
              objectFit={objectFit || 'cover'}
              onLoadingComplete={handleLoad}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              placeholder={placeholder || 'empty'}
            />
          </div>
        </div>
        {caption && type !== 'blog' && (
          <figcaption className="relative mt-2 pt-1 text-sm pr-3 opacity-50 text-neutral-400">
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
            className="max-h-[80vh] w-full max-w-full"
          />
        </Modal>
      )}
    </>
  );
});

export default ImageNew;
