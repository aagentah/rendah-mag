import { useState } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardBlog({ post, columnCount }) {
  const app = useApp();
  const [inView, setInView] = useState(false);
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageUrlWidth;
  const handleIntersect = event => setInView(event.isIntersecting);
  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  if (columnCount == 2) {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 500;
    imageHeight = app?.deviceSize === 'md' ? 200 : 300;
  } else {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
    imageHeight = app?.deviceSize === 'md' ? 200 : 180;
  }

  const image = (
    <Image
      /* Options */
      src={
        post?.coverImage &&
        imageBuilder
          .image(post?.coverImage)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={null}
      alt={post?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={!post}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/article/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/article/${post?.slug}`,
          scroll: false
        }
      }}
    />
  );

  const labels = (
    <Label
      /* Options */
      customClass=""
      text="Blog"
      color="white"
      backgroundColor="black"
      skeleton={!post}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={post?.title}
      color="black"
      size="small"
      truncate={null}
      skeleton={!post}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/article/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/article/${post?.slug}`,
          scroll: false
        }
      }}
    />
  );

  // const copy = (
  //   <Copy
  //     /* Options */
  //     text={post?.excerpt}
  //     color="black"
  //     size="medium"
  //     truncate={2}
  //     skeleton={!post}
  //   />
  // );

  // const button = (
  //   <Button
  //     /* Options */
  //     type="secondary"
  //     size="small"
  //     text="View post"
  //     color="black"
  //     fluid={false}
  //     icon={buttonIcon}
  //     iconFloat={null}
  //     inverted={false}
  //     loading={false}
  //     disabled={false}
  //     skeleton={false}
  //     onClick={null}
  //     /* Children */
  //     withLinkProps={{
  //       type: 'next',
  //       href: '/article/[slug]',
  //       target: null,
  //       routerLink: Link,
  //       routerLinkProps: {
  //         as: `/article/${post?.slug}`,
  //         scroll: false,
  //       },
  //     }}
  //   />
  // );

  return (
    <Observer {...observer}>
      <LazyLoad once offset={250} height={imageHeight}>
        <article
          className={`card  card--post  card--scroll  ${inView && 'in-view'}`}
        >
          {image && <div className="card__image">{image}</div>}

          <div className="card__dialog">
            {labels?.length && (
              <div className="card__labels">{[...labels]}</div>
            )}
            {heading && <div className="card__title">{heading}</div>}
            {
              // copy && <div className="card__description">{copy}</div>
            }
            {
              // button && <div className="card__button">{button}</div>
            }
          </div>
        </article>
      </LazyLoad>
    </Observer>
  );
}
