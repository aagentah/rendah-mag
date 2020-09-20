import Link from 'next/link';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function HeroPost({ post }) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src={imageBuilder.image(post.coverImage).height(1000).width(2000).auto('format').url()}
      placeholder={imageBuilder
        .image(post.coverImage)
        .height(50)
        .width(108)
        .auto('format').url()}
      alt="This is the alt text."
      figcaption={null}
      height={700}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={null}
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
