import { Image } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function ImageSection({ section }) {
  return (
    <figure>
      <Image
        /* Options */
        src={imageBuilder.image(section.asset).url()}
        placeholder={imageBuilder
          .image(section.asset)
          .height(25)
          .width(25)
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
  );
}
