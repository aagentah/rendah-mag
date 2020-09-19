import { useState } from 'react';
import Link from 'next/link';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardCypher({ post, columnCount }) {
  const app = useApp();
  const [inView, setInView] = useState(false);
  let cardImage;

  cardImage = (
    <LazyLoad
      once
      offset={100}
      height={app.deviceType === 'mobile' ? 300 : 220}
    >
      <Image
        /* Options */
        src={imageBuilder
          .image(post.imageSquare)
          .height(app.deviceType === 'mobile' ? 800 : 500)
          .width(app.deviceType === 'mobile' ? 800 : 500)
          .url()}
        placeholder={imageBuilder
          .image(post.imageSquare)
          .height(50)
          .width(50)
          .url()}
        alt={post.title}
        figcaption={null}
        height={app.deviceType === 'mobile' ? 300 : 220}
        width={null}
        customClass={null}
        onClick={null}
        /* Children */
        withLinkProps={{
          type: 'external',
          href: post.publishedFields.publishedUrl,
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
      text={post.title}
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
