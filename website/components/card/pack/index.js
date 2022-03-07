import Link from 'next/link';
import { Image, Heading } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardPack({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 160 : 160;
  const imageUrlHeight = app?.deviceSize === 'md' ? 160 : 160;

  const image = (
    <Image
      /* Options */
      src={
        post?.image &&
        imageBuilder
          .image(post.image)
          .width(imageUrlWidth * scale)
          .height(imageUrlHeight * scale)
          .auto('format')
          .fit('scale')
          .url()
      }
      placeholder={null}
      alt={post?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass="shadow2  br4"
      skeleton={!post}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={post?.title}
      color="white"
      size="small"
      truncate={2}
      skeleton={!post}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <article className="card  card--pack">
      <div
        className="card__image"
        onClick={() => handleClick && handleClick(i)}
      >
        {image}
      </div>

      <div className="card__dialog">
        <div
          className="card__title"
          onClick={() => handleClick && handleClick(i)}
        >
          {heading}
        </div>
      </div>
    </article>
  );
}
