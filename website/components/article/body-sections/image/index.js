import { Image } from 'next-pattern-library';
import LazyLoad from 'react-lazyload';

import { imageBuilder } from '~/lib/sanity/requests';

export default function ImageSection({ section }) {
  const handleCaption = () => {
    let caption = section.caption;

    if (section.source) {
      caption = (
        <a
          className="t-secondary  f7  grey  pv2  lh-copy  tac  underline"
          href={section.source}
          target="_blank"
        >
          {section.caption}
        </a>
      );
    }

    return (
      <figcaption className="t-secondary  f7  grey  pv2  lh-copy  tac">
        {caption}
      </figcaption>
    );
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
          customClass={null}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
        {section.caption && handleCaption()}
      </figure>
    </LazyLoad>
  );
}
