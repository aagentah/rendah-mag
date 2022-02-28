import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import {
  Image,
  Label,
  Heading,
  Copy,
  Button,
  Icon,
} from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardGallery({ post }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 260 : 230;
  const buttonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;

  const image = (
    <Image
      /* Options */
      src={
        post?.image?.asset &&
        imageBuilder
          .image(post.image.asset)
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
          as: `/gallery/${post?.slug}`,
          scroll: false,
        },
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
      color="white"
      size="small"
      truncate={2}
      skeleton={!post}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/article/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/gallery/${post?.slug}`,
          scroll: false,
        },
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
    <LazyLoad once offset={150} height={imageHeight}>
      <article className="card  card--post">
        {image && <div className="card__image">{image}</div>}

        <div className="card__dialog">
          {labels?.length && <div className="card__labels">{[...labels]}</div>}
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
  );
}
