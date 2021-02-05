import Link from 'next/link';
import { useState } from 'react';
// import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function HeroCypher({ cypher }) {
  const app = useApp();

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  if (!app.deviceSize) return null;
  const scale = app.isRetina ? 2 : 1;
  let imageUrlWidth;
  const imageHeight = 500;

  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;

  const heroImage = (
    <Image
      /* Options */
      src="/images/dominion-hero.png"
      placeholder={null}
      alt="This is the alt text."
      figcaption={null}
      height={500}
      width={null}
      customClass={null}
      skeleton={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="Join the Dominion Subscription"
      color="white"
      size="x-large"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroCopy = (
    <Copy
      /* Options */
      text={`
        The Dominion Subscription offers a new way to explore the depths of
        underground bass music through monthly care packages, exlusive content,
        printed magazine issues, discounts, and more.
      `}
      color="medium"
      size="white"
      truncate={null}
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
      withLinkProps={{
        type: 'next',
        href: '/dominion',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: '/dominion',
          scroll: false,
        },
      }}
    />
  );

  return (
    <>
      {
        // <Parallax className="z1  nt3" y={['-50px', '50px']} tagOuter="figure">
      }
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
      {
        //   </Parallax>
      }
    </>
  );
}
