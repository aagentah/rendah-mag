import Link from 'next/link';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function HeroPost({ post }) {
  const app = useApp();
  if (!app.deviceSize) return null;

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  let scale = 1;
  if (app.isRetina) scale = 2;
  let imageUrlWidth;
  let imageUrlHeight;
  let imageHeight;

  if (app.deviceSize === 'md') {
    imageUrlWidth = 680;
    imageUrlHeight = 1000;
    imageHeight = 700;
  }

  if (app.deviceSize === 'lg') {
    imageUrlWidth = 1550;
    imageUrlHeight = 700;
    imageHeight = 700;
  }

  if (app.deviceSize === 'xl') {
    imageUrlWidth = 1800;
    imageUrlHeight = 700;
    imageHeight = 700;
  }

  const heroImage = (
    <Image
      /* Options */
      src={imageBuilder
        .image(post.coverImage)
        .width(imageUrlWidth * scale)
        .height(imageUrlHeight * scale)
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

  return (
    <Parallax className="z1  nt3" y={['-50px', '50px']} tagOuter="figure">
      <div className="hero--darken-top">
        <Hero
          /* Options */
          height={700}
          /* Children */
          image={heroImage}
          title={null}
          description={null}
          button={null}
        />
      </div>
    </Parallax>
  );
}
