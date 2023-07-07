import LazyLoad from 'react-lazyload';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';
import Image from '~/components/elements/image';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

export default function ImageSection({ section, imageCount }) {
  const isEven = (number) => {
    return number % 2 === 0;
  };

  const handleCaption = () => {
    let { caption, source } = section;

    // If blockContent
    if (isArray(caption)) {
      return (
        <figcaption
          className={`caption  pv2  ph3  ${isEven(imageCount) ? 'tar' : 'tal'}`}
        >
          <BlockContent
            blocks={caption}
            serializers={SANITY_BLOCK_SERIALIZERS}
          />
        </figcaption>
      );
    }

    // Fallback for old text
    if (caption) {
      if (source) {
        return (
          <a
            className={`caption  pv2  ph3  ${
              isEven(imageCount) ? 'tar' : 'tal'
            }`}
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {caption}
          </a>
        );
      }

      return (
        <span
          className={`caption  pv2  ph3  ${isEven(imageCount) ? 'tar' : 'tal'}`}
        >
          {caption}
        </span>
      );
    }
  };

  const placeholder = includes(section.asset._ref, '-gif')
    ? null
    : imageBuilder
        .image(section.asset)
        .height(25)
        .width(25)
        .auto('format')
        .fit('clip')
        .blur('20')
        .url();

  return (
    <div
      className={`flex  flex-wrap   ${
        isEven(imageCount) ? 'flex-row-reverse' : ''
      }`}
    >
      <div className="col-24  col-18-md">
        <LazyLoad once offset={250} height={360}>
          <figure>
            <Image
              /* Options */
              src={imageBuilder
                .image(section.asset)
                .auto('format')
                .fit('clip')
                .url()}
              placeholder={placeholder}
              alt="This is the alt text."
              figcaption={null}
              height={700}
              width={null}
              customClass=""
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
            {handleCaption()}
          </figure>
        </LazyLoad>
      </div>
      <div className="col-6" />
    </div>
  );
}
