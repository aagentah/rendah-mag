import React, { useState } from 'react';
import NextImage from 'next/image';
import ContentLoader from 'react-content-loader';
import { imageBuilder } from '~/lib/sanity/requests';
import WithLink from '../../utils/with-link';

const ImageSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={props.width || 200}
    height={props.height || 200}
    viewBox={`0 0 ${props.width || 200} ${props.height || 200}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
  </ContentLoader>
);

const ImageComponent = (props) => {
  const {
    src,
    alt,
    height,
    width,
    customClass,
    priority,
    onClick,
    coverImageNew,
    figcaption,
    placeholder,
    withLinkProps,
  } = props;

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => setLoaded(true);

  if (coverImageNew) {
    const { url, caption, dimensions } = coverImageNew || {};

    if (!coverImageNew) {
      return <ImageSkeleton height={200} width={200} />;
    }

    const aspectRatio = dimensions?.width / dimensions?.height;

    return (
      <div className={`coverImageNew`}>
        {!loaded && (
          <ImageSkeleton
            style={{ paddingTop: `${100 / aspectRatio}%` }}
            width="100%"
            height="100%"
          />
        )}
        {url && (
          <>
            <WithLink {...(withLinkProps && { withLinkProps })}>
              <NextImage
                src={
                  url &&
                  imageBuilder
                    .image(url)
                    .width(1920)
                    .auto('format')
                    .fit('clip')
                    .url()
                }
                alt={caption || 'Cover Image'}
                width={dimensions?.width || 200}
                height={dimensions?.height || 200}
                layout="responsive"
                onLoadingComplete={handleLoad}
                className={`image ${loaded ? 'image--loaded' : ''}`}
                placeholder={placeholder || ''}
              />
            </WithLink>

            {figcaption && (
              <figcaption className={`image__figcaption`}>
                {figcaption}
              </figcaption>
            )}
          </>
        )}
      </div>
    );
  }

  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

  const dimensionsStyle = {
    minHeight: height ? `${height}px` : '100%',
    height: height ? `${height}px` : '100%',
    width: width ? `${width}px` : '100%',
    maxWidth: '100%',
  };

  let skeletonActive = true;

  if (src && loaded) {
    skeletonActive = false;
  }

  if (placeholder && placeholderLoaded) {
    skeletonActive = false;
  }

  const skeletonClass = skeletonActive
    ? 'skeleton skeleton-active'
    : 'skeleton';

  const handlePlaceholderLoad = () => setPlaceholderLoaded(true);

  return (
    <figure className="coverImageOld image__figure">
      <WithLink
        style={dimensionsStyle}
        className={`image__wrapper ${skeletonClass} ${customClass || ''}`}
        {...(withLinkProps && { withLinkProps })}
        {...(onClick && { onClick })}
      >
        {src && (
          <NextImage
            onLoadingComplete={handleLoad}
            alt={alt || ''}
            src={src}
            className={`image ${loaded ? 'image--loaded' : ''}`}
            fill
            layout="fill"
            priority={priority}
          />
        )}

        {placeholder && (
          <NextImage
            onLoadingComplete={handlePlaceholderLoad}
            alt={alt || 'placeholder'}
            src={placeholder}
            fill
            layout="fill"
            className={`image image--placeholder ${
              loaded ? 'image--loaded' : ''
            }`}
          />
        )}
      </WithLink>

      {figcaption && (
        <figcaption className={`image__figcaption ${skeletonClass}`}>
          {figcaption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageComponent;
