// import { useState } from 'react';
// import Link from 'next/link';
// import 'intersection-observer';
// import Observer from '@researchgate/react-intersection-observer';
// import LazyLoad from 'react-lazyload';
//
// import { Image, Label, Heading, Copy } from 'next-pattern-library';
//
// import CardBlog from '~/components/card/post';
// import { imageBuilder } from '~/lib/sanity/requests';
// import { useApp } from '~/context-provider/app';
//
// export default function CardBlog({ post, columnCount }) {
//   const app = useApp();
//   const [inView, setInView] = useState(false);
//
//   if (!app.deviceSize) return null;
//   const scale = app.isRetina ? 2 : 1;
//   let imageUrlWidth = app.deviceSize === 'md' ? 260 : 230;
//   let imageHeight = app.deviceSize === 'md' ? 260 : 180;
//   const headingSize =
//     app.deviceSize === 'md' || columnCount === 2 ? 'medium' : 'small';
//
//   if (columnCount === 2) {
//     imageUrlWidth = app.deviceSize === 'md' ? 260 : 500;
//     imageHeight = app.deviceSize === 'md' ? 260 : 300;
//   }
//
//   const handleIntersect = (event) => setInView(event.isIntersecting);
//   const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };
//
//   // const cardImage = (
//   //   <Image
//   //     /* Options */
//   //     src={
//   //       post &&
//   //       imageBuilder
//   //         .image(post?.coverImage)
//   //         .width(imageUrlWidth * scale)
//   //         .height(imageHeight * scale)
//   //         .auto('format')
//   //         .fit('clip')
//   //         .url()
//   //     }
//   //     placeholder={
//   //       post &&
//   //       imageBuilder
//   //         .image(post?.coverImage)
//   //         .height(imageHeight / 10)
//   //         .width(imageUrlWidth / 10)
//   //         .auto('format')
//   //         .fit('clip')
//   //         .blur('20')
//   //         .url()
//   //     }
//   //     alt={post?.title}
//   //     figcaption={null}
//   //     height={imageHeight}
//   //     width={null}
//   //     customClass={null}
//   //     skeleton={!post}
//   //     onClick={null}
//   //     /* Children */
//   //     withLinkProps={{
//   //       type: 'next',
//   //       href: '/article/[slug]',
//   //       target: null,
//   //       routerLink: Link,
//   //       routerLinkProps: {
//   //         as: `/article/${post?.slug}`,
//   //         scroll: false,
//   //       },
//   //     }}
//   //   />
//   // );
//   //
//   // const cardHeading = post && (
//   //   <Heading
//   //     /* Options */
//   //     htmlEntity="h2"
//   //     text={post?.title}
//   //     color="black"
//   //     size={headingSize}
//   //     truncate={4}
//   //     skeleton={!post}
//   //     /* Children */
//   //     withLinkProps={null}
//   //   />
//   // );
//
//   return (
//     <Observer {...observer}>
//       <div className={`card--scroll ${inView && 'in-view'}`}>
//         <LazyLoad once offset={150} height={imageHeight}>
//             <Card
//               /* Options */
//               type="block"
//               onClick={null}
//               /* Children */
//               image={cardImage}
//               labelBlock={null}
//               title={cardHeading}
//               description={null}
//               button={null}
//             />
//         </LazyLoad>
//       </div>
//     </Observer>
//   );
// }

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

export default function CardBlog({ post, columnCount }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight, imageUrlWidth;

  if (columnCount == 2) {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 500;
    imageHeight = app?.deviceSize === 'md' ? 260 : 300;
  } else {
    imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
    imageHeight = app?.deviceSize === 'md' ? 260 : 180;
  }

  const buttonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;

  const image = (
    <Image
      /* Options */
      src={
        post &&
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
      color="black"
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
          as: `/article/${post?.slug}`,
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
