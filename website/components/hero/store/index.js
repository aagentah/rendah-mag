import Link from 'next/link';
import { useState } from 'react';

import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function HeroCypher({ cypher }) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src="/images/cypher-youtube.jpg"
      placeholder={null}
      alt="This is the alt text."
      figcaption={null}
      height={500}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="Join the Dominion"
      color="white"
      size="x-large"
      truncate={null}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroCopy = (
    <Copy
      /* Options */
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      color="black"
      size="white"
      truncate={2}
    />
  );

  const heroButton = (
    <Button
      /* Options */
      type="secondary"
      size="medium"
      text="Subscribe now"
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <>
      <Parallax className="z1  nt4" y={['-50px', '50px']} tagOuter="figure">
        <div className="hero--cypher  hero--darken-all">
          <Hero
            /* Options */
            height={500}
            /* Children */
            image={heroImage}
            title={heroHeading}
            description={heroCopy}
            button={heroButton}
          />
        </div>
      </Parallax>
    </>
  );
}
