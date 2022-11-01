import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconArrowRight)
);

export default function CardCreations({ post, columnCount }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageUrlWidth;

  if (columnCount == 2) {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 500;
    imageHeight = app?.deviceSize === 'md' ? 160 : 300;
  } else {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
    imageHeight = app?.deviceSize === 'md' ? 160 : 160;
  }

  const buttonIcon = <IconArrowRight color="black" size={16} />;

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
      customClass="shadow2  bb  bw1  bc-white  "
      skeleton={!post}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'external',
        href: `/creations/${post?.slug}`,
        target: '_blank',
        routerLink: null,
        routerLinkProps: null
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
      truncate={3}
      skeleton={!post}
      /* Children */
      withLinkProps={{
        type: 'external',
        href: `/creations/${post?.slug}`,
        target: '_blank',
        routerLink: null,
        routerLinkProps: null
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
  //       href: '/creations/[slug]',
  //       target: null,
  //       routerLink: Link,
  //       routerLinkProps: {
  //         as: `/creations/${post?.slug}`,
  //         scroll: false,
  //       },
  //     }}
  //   />
  // );

  return (
    <LazyLoad once offset={250} height={imageHeight}>
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
