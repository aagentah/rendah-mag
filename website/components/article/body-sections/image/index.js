import { Image } from 'next-pattern-library';
import LazyLoad from 'react-lazyload';

import { imageBuilder } from '~/lib/sanity/requests';

export default function ImageSection({ section }) {
  return (
    <LazyLoad once offset={100} height={360}>
      <figure>
        <Image
          /* Options */
          src={imageBuilder.image(section.asset).auto('format').url()}
          placeholder={imageBuilder
            .image(section.asset)
            .height(25)
            .width(25)
            .auto('format')
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
      </figure>
    </LazyLoad>
  );
}
