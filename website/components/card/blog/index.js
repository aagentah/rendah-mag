import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardBlog({ post, columnCount, inverted }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageUrlWidth;

  if (columnCount == 2) {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 500;
    imageHeight = app?.deviceSize === 'md' ? 260 : 400;
  } else {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
    imageHeight = app?.deviceSize === 'md' ? 260 : 260;
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
          .fit('crop')
          .crop(app?.deviceSize === 'md' ? 'top' : 'center')
          .url()
      }
      placeholder={null}
      alt={post?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass="shadow2"
      skeleton={!post}
      onClick={null}
      /* Children */
      withLinkProps={
        post?.slug && {
          type: 'next',
          href: '/article/[slug]',
          target: null,
          routerLink: Link,
          routerLinkProps: {
            as: `/article/${post?.slug}`,
            scroll: false,
          },
        }
      }
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
      color={app?.deviceSize === 'md' && !inverted ? 'black' : 'white'}
      size={app?.deviceSize === 'md' ? 'small' : 'small'}
      truncate={null}
      skeleton={!post}
      /* Children */
      withLinkProps={
        post?.slug && {
          type: 'next',
          href: '/article/[slug]',
          target: null,
          routerLink: Link,
          routerLinkProps: {
            as: `/article/${post?.slug}`,
            scroll: false,
          },
        }
      }
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
  //     withLinkProps={post?.slug &&  {
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
    <LazyLoad once offset={250} height={imageHeight}>
      <article className="card  card--post  card--scroll  mb4  mb0-md">
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
