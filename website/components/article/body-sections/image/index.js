import { Image } from 'next-pattern-library';
import LazyLoad from 'react-lazyload';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

export default function ImageSection({ section }) {
  const handleCaption = () => {
    let { caption, source } = section;

    // If blockContent
    if (isArray(caption)) {
      return (
        <figcaption className="caption  pv2">
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
            className="caption  pv2"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {caption}
          </a>
        );
      }

      return <span className="caption  pv2">{caption}</span>;
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
    <LazyLoad once offset={100} height={360}>
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
          height={null}
          width={null}
          customClass="shadow2"
          skeleton={false}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
        {handleCaption()}
      </figure>
    </LazyLoad>
  );
}
