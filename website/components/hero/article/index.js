import dynamic from 'next/dynamic';
import BlockContent from '@sanity/block-content-to-react';

import Image from '~/components/elements/image';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
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
  coverImageNew,
  title,
  description,
  heroButtonText,
  link,
  marginTop,
  marginBottom,
  modifier,
  caption,
  //
  skeleton,
  fullImage,
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageUrlWidth = 800;

  if (!app.deviceSize) return;

  const heroButtonIcon = <IconArrowRight color="black" size={16} />;
  let linkProps;
  let heroImage;

  if (link) {
    linkProps = {
      type: 'external',
      href: link,
    };
  }

  heroImage = <Image coverImageNew={coverImageNew} />;

  return (
    <article
      className={`
        hero
        ${modifier && `hero--${modifier}`}
        mt${marginTop}
        mb${marginBottom}
      `}
      style={null}
    >
      {heroImage && <div className="hero__image">{heroImage}</div>}
      {/* {caption && (
        <div className="relative">
          <figcaption className="absolute  bg-white  black  f7  lh-copy  pv2  ph3  bottom  right  mr3  nb3  shadow1  br3">
            <BlockContent
              blocks={caption}
              serializers={SANITY_BLOCK_SERIALIZERS}
            />
          </figcaption>
        </div>
      )} */}
    </article>
  );
}
