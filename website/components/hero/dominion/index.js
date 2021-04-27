// import Link from 'next/link';
// import { useState } from 'react';
//
// import { Heading, Copy, Image, Button, Icon } from 'next-pattern-library';
//
// import Hero from '~/base-components/hero';
// import { imageBuilder } from '~/lib/sanity/requests';
// import { useApp } from '~/context-provider/app';
//
// export default function HeroDominion() {
//   const app = useApp();
//   const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;
//
//   if (!app.deviceSize) return null;
//   const scale = app.isRetina ? 2 : 1;
//   let imageHeight;
//   let imageUrlWidth;
//
//   if (app.deviceSize === 'md') {
//     imageHeight = 200;
//     imageUrlWidth = 700;
//   }
//   if (app.deviceSize === 'lg') {
//     imageHeight = 400;
//     imageUrlWidth = 1600;
//   }
//   if (app.deviceSize === 'xl') {
//     imageHeight = 400;
//     imageUrlWidth = 1800;
//   }
//
//   const heroImage = (
//     <Image
//       /* Options */
//       src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607719750/dominion/dominion-hero.png"
//       // src={imageBuilder
//       //   .image(post?.coverImage)
//       //   .width(imageUrlWidth * scale)
//       //   .height(imageHeight * scale)
//       //   .auto('format')
//       //   .fit('clip')
//       //   .url()}
//       // placeholder={imageBuilder
//       //   .image(post?.coverImage)
//       //   .height(imageHeight / 10)
//       //   .width(imageUrlWidth / 10)
//       //   .auto('format')
//       //   .fit('clip')
//       //   .blur('50')
//       //   .url()}
//       alt="Dominion"
//       figcaption={null}
//       height={imageHeight}
//       width={null}
//       customClass={null}
//       skeleton={false}
//       onClick={null}
//       /* Children */
//       withLinkProps={null}
//     />
//   );
//
//   return (
//     <>
//       <div className="hero--darken-top">
//         {
//           // <Hero
//           //   /* Options */
//           //   height={imageHeight}
//           //   /* Children */
//           //   image={heroImage}
//           //   title={null}
//           //   description={null}
//           //   button={null}
//           // />
//         }
//
//         <Hero
//           image={post?.coverImage}
//           title={post?.title}
//           description={null}
//           heroButtonText={null}
//           link={`/article/${post?.slug}`}
//           marginTop={0}
//           marginBottom={0}
//           modifier={null}
//           skeleton={false}
//         />
//       </div>
//     </>
//   );
// }

import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import LazyLoad from 'react-lazyload';
import isObject from 'lodash/isObject';
import { Image, Heading, Copy, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

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
 **/

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
  skeleton,
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 720 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 400 : 800;
  const heroButtonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;
  let heroCopy;
  let linkProps;
  let heroButton;

  const styles = {
    height: `${imageHeight}px`,
  };

  if (link) {
    linkProps = {
      type: 'external',
      href: link,
    };
  }

  const heroImage = (
    <Image
      /* Options */
      src={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={
        image &&
        imageBuilder
          .image(image)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
          .url()
      }
      alt={title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={skeleton}
      onClick={null}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  const heroTitle = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={title}
      color="black"
      size="large"
      truncate={null}
      skeleton={skeleton}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  if (description) {
    heroCopy = isObject(description) ? (
      <BlockContent blocks={description} />
    ) : (
      <Copy
        /* Options */
        text={description || ''}
        color="black"
        size="medium"
        truncate={null}
        skeleton={skeleton}
      />
    );
  }

  if (heroButtonText && linkProps) {
    heroButton = (
      <Button
        /* Options */
        type="secondary"
        size="small"
        text={heroButtonText}
        color="black"
        fluid={false}
        icon={heroButtonIcon}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        skeleton={skeleton}
        onClick={null}
        /* Children */
        withLinkProps={linkProps}
      />
    );
  }

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
      <div className="hero__dialog">
        {heroTitle && <div className="hero__title">{heroTitle}</div>}
        {heroCopy && <p className="hero__description">{heroCopy}</p>}
        {heroButton && <div className="hero__heroButton">{heroButton}</div>}
      </div>

      {heroImage && <div className="hero__image">{heroImage}</div>}
    </article>
  );
}
