import { useState } from 'react';
import Link from 'next/link';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardBlog({ post, columnCount }) {
  const app = useApp();
  const [inView, setInView] = useState(false);

  if (!app.deviceSize) return null;
  let scale = app.isRetina ? 2 : 1;
  let imageUrlWidth = app.deviceSize === 'md' ? 260 : 230;
  let imageHeight = app.deviceSize === 'md' ? 260 : 180;
  const headingSize =
    app.deviceSize === 'md' || columnCount === 2 ? 'medium' : 'small';

  if (columnCount === 2) {
    imageUrlWidth = app.deviceSize === 'md' ? 260 : 500;
    imageHeight = app.deviceSize === 'md' ? 260 : 300;
  }

  const handleIntersect = (event) => setInView(event.isIntersecting);
  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  const cardImage = (
    <LazyLoad once offset={150} height={imageHeight}>
      <Image
        /* Options */
        src={imageBuilder
          .image(post.coverImage)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()}
        placeholder={imageBuilder
          .image(post.coverImage)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
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
          href: '/article/[slug]',
          target: null,
          routerLink: Link,
          routerLinkProps: {
            as: `/article/${post.slug}`,
            scroll: false,
          },
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
      size={headingSize}
      truncate={4}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <Observer {...observer}>
      <div className={`card--scroll ${inView && 'in-view'}`}>
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
