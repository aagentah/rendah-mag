// import Link from 'next/link';
// import { useState } from 'react';
//
// import { Heading, Copy, Image, Button, Icon } from 'next-pattern-library';
//
// import Hero from '~/base-components/hero';
// import { imageBuilder } from '~/lib/sanity/requests';
// import { useApp } from '~/context-provider/app';
//
// export default function HeroPost({ post }) {
//   const app = useApp();
//   const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;
//
//   if (!app.deviceSize) return null;
//   const scale = app.isRetina ? 2 : 1;
//   let imageUrlWidth;
//   let imageHeight = null;
//
//   if (app.deviceSize === 'md') imageHeight = 700;
//   if (app.deviceSize === 'md') imageUrlWidth = 700;
//   if (app.deviceSize === 'lg') imageUrlWidth = 1600;
//   if (app.deviceSize === 'xl') imageUrlWidth = 1800;
//
//   const heroImage = (
//     <Image
//       /* Options */
//       src={imageBuilder
//         .image(post?.coverImage)
//         .width(imageUrlWidth * scale)
//         .auto('format')
//         .fit('clip')
//         .url()}
//       placeholder={imageBuilder
//         .image(post?.coverImage)
//         .width(imageUrlWidth / 10)
//         .auto('format')
//         .fit('clip')
//         .blur('50')
//         .url()}
//       alt={post?.title}
//       figcaption={null}
//       height={imageHeight}
//       width={null}
//       customClass={null}
//       skeleton={!post}
//       onClick={null}
//       /* Children */
//       withLinkProps={{
//         type: 'next',
//         href: '/article/[slug]',
//         target: null,
//         routerLink: Link,
//         routerLinkProps: {
//           as: `/article/${post?.slug}`,
//           scroll: false,
//         },
//       }}
//     />
//   );
//
//   const heroHeading = post && (
//     <Heading
//       /* Options */
//       htmlEntity="h1"
//       text={post?.title}
//       color="white"
//       size="x-large"
//       truncate={null}
//       skeleton={false}
//       /* Children */
//       withLinkProps={null}
//     />
//   );
//
//   const heroButton = post && (
//     <Button
//       /* Options */
//       type="secondary"
//       size="medium"
//       text="Read more"
//       color="white"
//       fluid={false}
//       icon={buttonIcon}
//       iconFloat={null}
//       inverted={false}
//       loading={false}
//       disabled={false}
//       skeleton={false}
//       onClick={null}
//       /* Children */
//       withLinkProps={{
//         type: 'next',
//         href: '/article/[slug]',
//         target: null,
//         routerLink: Link,
//         routerLinkProps: {
//           as: `/article/${post?.slug}`,
//           scroll: false,
//         },
//       }}
//     />
//   );
//
//   return (
//     <>
//       <div className="hero--home  hero--darken-all">
//         {
//           // <Hero
//           //   /* Options */
//           //   height={imageHeight}
//           //   /* Children */
//           //   image={heroImage}
//           //   title={heroHeading}
//           //   description={null}
//           //   button={heroButton}
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
import isObject from 'lodash/isObject';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Icon from '~/components/elements/icon';
import Image from '~/components/elements/image';
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
  let imageUrlWidth;
  let imageHeight = null;
  if (app.deviceSize === 'md') imageHeight = 700;
  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;
  const heroButtonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;
  let heroTitle;
  let heroCopy;
  let linkProps;
  let heroButton;

  const styles = {
    height: `${imageHeight}px`
  };

  if (link) {
    linkProps = {
      type: 'next',
      href: `/${link}`,
      target: null,
      routerLink: Link,
      routerLinkProps: {
        as: `/${link}`,
        scroll: false
      }
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
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={
        image &&
        imageBuilder
          .image(image)
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
      priority={true}
      skeleton={skeleton}
      onClick={null}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  if (title) {
    heroTitle = (
      <Heading
        /* Options */
        htmlEntity="h2"
        text={title}
        color="white"
        size="x-large"
        truncate={null}
        skeleton={skeleton}
        /* Children */
        withLinkProps={linkProps}
      />
    );
  }

  if (description) {
    heroCopy = isObject(description) ? (
      <BlockContent blocks={description} />
    ) : (
      <Copy
        /* Options */
        text={description || ''}
        color="white"
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
        size="medium"
        text={heroButtonText}
        color="white"
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
        {heroButton && <div className="hero__button">{heroButton}</div>}
      </div>

      {heroImage && <div className="hero__image">{heroImage}</div>}
    </article>
  );
}
