import Link from 'next/link';
import { useState } from 'react';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function HeroPost({ post }) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src={imageBuilder.image(post.coverImage).height(500).width(1080).url()}
      placeholder={imageBuilder
        .image(post.coverImage)
        .height(50)
        .width(108)
        .url()}
      alt="This is the alt text."
      figcaption={null}
      height={500}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={null}
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
    <>
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
    </>
  );
}
