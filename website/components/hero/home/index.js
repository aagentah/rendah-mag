import Link from 'next/link';
import { useState } from 'react';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function HeroPost({ post }) {
  const app = useApp();
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  if (!app.deviceSize) return null;
  let scale = app.isRetina ? 2 : 1;
  let imageUrlWidth;
  let imageHeight = 500;

  if (app.deviceSize === 'md') imageUrlWidth = 680;
  if (app.deviceSize === 'lg') imageUrlWidth = 1550;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;

  const heroImage = (
    <Image
      /* Options */
      src={imageBuilder
        .image(post?.coverImage)
        .width(imageUrlWidth * scale)
        .height(imageHeight * scale)
        .auto('format')
        .fit('clip')
        .url()}
      placeholder={imageBuilder
        .image(post?.coverImage)
        .height(imageHeight / 10)
        .width(imageUrlWidth / 10)
        .auto('format')
        .fit('clip')
        .blur('50')
        .url()}
      alt={post?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={post ? false : true}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/article/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/article/${post?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text={post?.title}
      color="white"
      size="x-large"
      truncate={null}
      skeleton={post ? false : true}
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
      skeleton={post ? false : true}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/article/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/article/${post?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  return (
    <>
      <div className="hero--darken-all">
        <Hero
          /* Options */
          height={imageHeight}
          /* Children */
          image={heroImage}
          title={heroHeading}
          description={null}
          button={heroButton}
        />
      </div>
    </>
  );
}
