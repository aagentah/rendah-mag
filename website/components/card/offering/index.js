import Link from 'next/link';
import { Image, Heading } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardOffering({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 160 : 160;

  const image = (
    <Image
      /* Options */
      src="https://cdn.sanity.io/images/q8z2vf2k/production/78e9b8033c9b75038ae1e5ef047110fd78b7372a-1080x816.png?rect=132,0,816,816&w=75&h=75&blur=20&fit=clip&auto=format"
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
    <article className="card  card--offering">
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
