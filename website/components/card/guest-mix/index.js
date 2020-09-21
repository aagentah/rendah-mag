import { useState } from 'react';
import Link from 'next/link';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function Cardmix({ mix, columnCount }) {
  const app = useApp();
  const [inView, setInView] = useState(false);

  if (!app.deviceSize) return null;
  let scale = app.isRetina ? 2 : 1;
  const imageUrlWidth = app.deviceSize === 'md' ? 200 : 230;
  const imageHeight = app.deviceSize === 'md' ? 200 : 230;

  const cardImage = (
    <LazyLoad once offset={100} height={imageHeight}>
      <Image
        /* Options */
        src={imageBuilder
          .image(mix.image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .url()}
        placeholder={imageBuilder
          .image(mix.image)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .url()}
        alt={mix.title}
        figcaption={null}
        height={imageHeight}
        width={null}
        customClass={null}
        onClick={null}
        /* Children */
        withLinkProps={{
          type: 'external',
          href: null,
          target: '_blank',
          routerLink: null,
          routerLinkProps: null,
        }}
      />
    </LazyLoad>
  );

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={mix.title}
      color="black"
      size="small"
      truncate={4}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const handleIntersection = (event) => {
    if (event.isIntersecting) {
      return setInView(true);
    }

    return setInView(false);
  };

  const options = {
    onChange: handleIntersection,
    rootMargin: '0% 0% -30% 0%',
  };

  return (
    <Observer {...options}>
      <div className={`card--scroll  ${inView && 'in-view'}`}>
        <Card
          /* Options */
          type="block"
          onClick={null}
          /* Children */
          image={cardImage}
          labelBlock={null}
          title={cardHeading}
          description={null}
          button={null}
        />
      </div>
    </Observer>
  );
}
