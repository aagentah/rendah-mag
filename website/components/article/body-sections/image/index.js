import LazyLoad from 'react-lazyload';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';
import Image from '~/components/elements/image';
import ImageNew from '~/components/elements/image-new';
import { useApp } from '~/context-provider/app';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

export default function ImageSection({ section, imageCount }) {
  const app = useApp();

  const isEven = (number) => {
    return number % 2 === 0;
  };

  const handleCaption = () => {
    let { source, fullImage } = section;

    // If blockContent
    if (isArray(section?.caption)) {
      return (
        <figcaption className="black  f7  lh-copy  pa2  mla  mra  tac">
          <BlockContent
            blocks={section?.caption}
            serializers={SANITY_BLOCK_SERIALIZERS}
          />
        </figcaption>
      );
    }

    // Fallback for old text
    if (section?.caption) {
      if (source) {
        return (
          <a
            className="caption  pv2  ph3  tac"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {section?.caption}
          </a>
        );
      }

      return <span className="caption  pv2  ph3  tac">{section?.caption}</span>;
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
      className={`flex  flex-wrap  justify-center ${
        section?.fullImage ? 'pv5' : 'pv4'
      } `}
    >
      <div
        className={`justify-center  ${
          section?.fullImage ? 'col-24' : 'col-24  col-12-md'
        }`}
      >
        <LazyLoad once offset={250} height={360}>
          <figure>
            <ImageNew imageObject={section} />
            {handleCaption()}
          </figure>
        </LazyLoad>
      </div>
    </div>
  );
}
