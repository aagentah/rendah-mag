import BlockContent from '@sanity/block-content-to-react';
import { Image, Heading, Copy } from 'next-pattern-library';
import isObject from 'lodash/isObject';
import LazyLoad from 'react-lazyload';

import Container from '../layout/container';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

/**
 * @param {string} title [required]
 * @param {string} description
 * @param {string} image [required]
 * @param {string} align [required]
 * @param {string} padding [required]
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 * */

export default function TextImageBlock({
  title,
  description,
  image,
  align,
  padding,
  marginTop,
  marginBottom,
  modifier,
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 720 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 300 : 400;
  let blockCopy;

  const blockTitle = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={title}
      color="black"
      size="large"
      truncate={null}
      skeleton={null}
      /* Children */
      withLinkProps={null}
    />
  );

  if (description) {
    const blockCopy = isObject(description) ? (
      <BlockContent blocks={description} />
    ) : (
      <Copy
        /* Options */
        text={description}
        color="black"
        size="medium"
        truncate={null}
        skeleton={null}
      />
    );
  }

  const blockImage = (
    <Image
      /* Options */
      src={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={null}
      alt={null}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  console.log('modifier', modifier);

  return (
    <LazyLoad once offset={150} height={imageHeight}>
      <div
        className={`
          text-image-block
          text-image-block--${align}
          ${modifier ? `text-image-block--${modifier}` : ''}
          pv${padding} mt${marginTop}
          mb${marginBottom}
        `}
      >
        <Container>
          <div
            className={`
              flex
              flex-wrap
              ${align === 'left' ? 'flex-row' : 'flex-row-reverse'}
            `}
          >
            <div className="col-24  col-12-md  flex  align-center  justify-center">
              <div className="text-image-block__image">{blockImage}</div>
            </div>
            <div className="text-image-block__dialog  col-24  col-12-md  flex  flex-column  align-center  justify-center">
              <div className="text-image-block__title">{blockTitle}</div>
              <div className="text-image-block__description">{blockCopy}</div>
            </div>
          </div>
        </Container>
      </div>
    </LazyLoad>
  );
}
