import dynamic from 'next/dynamic';

import Image from '~/components/elements/image';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconArrowRight)
);

/**
 * @param {string} image [required]
 * @param {string} title [required]
 * @param {string} description
 * @param {string} heroButtonText
 * @param {string} link
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 * @param {string} skeleton [required]
 * */

export default function HeroDefault({
  image,
  title,
  description,
  heroButtonText,
  link,
  marginTop,
  marginBottom,
  modifier,
  //
  skeleton
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageUrlWidth = 700;
  let imageUrlHeight = 700;

  if (app.deviceSize === 'md') {
    imageUrlHeight = null;
  }

  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;
  const heroButtonIcon = <IconArrowRight color="black" size={16} />;
  let heroTitle;
  let heroCopy;
  let linkProps;
  let heroButton;
  let heroImage;

  const styles = {
    maxHeight: 'calc(120vh + 100px)'
  };

  if (link) {
    linkProps = {
      type: 'external',
      href: link
    };
  }

  heroImage = (
    <Image
      /* Options */
      src={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={null}
      alt={title}
      figcaption={null}
      height={imageUrlHeight}
      width={null}
      customClass={null}
      priority={true}
      skeleton={skeleton}
      onClick={null}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  return (
    <article
      className={`
        hero
        ${modifier && `hero--${modifier}`}
        mt${marginTop}
        mb${marginBottom}
      `}
      style={styles}
    >
      {heroImage && <div className="hero__image">{heroImage}</div>}
    </article>
  );
}
