import { Image } from 'next-pattern-library';
import LazyLoad from 'react-lazyload';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';

import { imageBuilder } from '~/lib/sanity/requests';

export default function ImageSection({ section }) {
  const handleCaption = () => {
    let { caption, source } = section;

    // If blockContent
    if (isArray(caption)) {
      const serializers = {
        list: (props) => <>{props.children}</>,
        listItem: (props) => <li>{props.children}</li>,
        marks: {
          inlineLink: (linkProps) => {
            return (
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="di  underline"
                href={linkProps.mark.url}
              >
                {linkProps.children[0]}
              </a>
            );
          },
        },
      };

      return (
        <figcaption className="caption  pv2">
          <BlockContent blocks={caption} serializers={serializers} />
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
          placeholder={imageBuilder
            .image(section.asset)
            .height(25)
            .width(25)
            .auto('format')
            .fit('clip')
            .blur('20')
            .url()}
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
