import Link from 'next/link';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function HeroPost({ post }) {
  const app = useApp();
  if (!app.deviceType) return null;

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;
  let imageUrlWidth;
  let imageUrlHeight;
  let imageHeight;

  if (app.deviceType === 'mobile') {
    imageUrlWidth = 680;
    imageUrlHeight = 1000;
    imageHeight = 500;
  }

  if (app.deviceType === 'desktop') {
    imageUrlWidth = 1550;
    imageUrlHeight = 500;
    imageHeight = 500;
  }

  if (app.deviceType === 'big-screen') {
    imageUrlWidth = 1800;
    imageUrlHeight = 500;
    imageHeight = 500;
  }

  const heroImage = (
    <Image
      /* Options */
      src={imageBuilder
        .image(post.coverImage)
        .width(imageUrlWidth)
        .height(imageUrlHeight)
        .auto('format')
        .url()}
      placeholder={imageBuilder
        .image(post.coverImage)
        .height(imageUrlHeight / 10)
        .width(imageUrlWidth / 10)
        .auto('format')
        .url()}
      alt={post.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/post/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/post/${post.slug}`,
        },
      }}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text={post.title}
      color="white"
      size="x-large"
      truncate={null}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroButton = (
    <Button
      /* Options */
      type="secondary"
      size="medium"
      text="Read more"
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/post/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/post/${post.slug}`,
        },
      }}
    />
  );

  return (
    <Parallax className="z1  nt3" y={['-50px', '50px']} tagOuter="figure">
      <div className="hero--darken-all">
        <Hero
          /* Options */
          height={500}
          /* Children */
          image={heroImage}
          title={heroHeading}
          description={null}
          button={heroButton}
        />
      </div>
    </Parallax>
  );
}
