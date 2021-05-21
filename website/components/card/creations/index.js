// import { useState } from 'react';
// import Link from 'next/link';
// import 'intersection-observer';
// import Observer from '@researchgate/react-intersection-observer';
//
// import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';
//
// import { imageBuilder } from '~/lib/sanity/requests';
// import { useApp } from '~/context-provider/app';
//
// export default function CardCreations({ post, columnCount }) {
//   const app = useApp();
//   const [inView, setInView] = useState(false);
//
//   if (!app.deviceSize) return null;
//   const scale = app.isRetina ? 2 : 1;
//   let imageUrlWidth = app.deviceSize === 'md' ? 260 : 230;
//   let imageHeight = app.deviceSize === 'md' ? 260 : 180;
//
//   if (columnCount === 3) {
//     imageUrlWidth = app.deviceSize === 'md' ? 260 : 500;
//     imageHeight = app.deviceSize === 'md' ? 200 : 200;
//   }
//
//   const handleIntersect = (event) => setInView(event.isIntersecting);
//   const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };
//
//   const cardImage = (
//     <Image
//       /* Options */
//       src={
//         post &&
//         imageBuilder
//           .image(post?.coverImage)
//           .width(imageUrlWidth * scale)
//           .height(imageHeight * scale)
//           .auto('format')
//           .fit('clip')
//           .url()
//       }
//       placeholder={
//         post &&
//         imageBuilder
//           .image(post?.coverImage)
//           .height(imageHeight / 10)
//           .width(imageUrlWidth / 10)
//           .auto('format')
//           .fit('clip')
//           .blur('20')
//           .url()
//       }
//       alt={post?.title}
//       figcaption={null}
//       height={imageHeight}
//       width={null}
//       customClass={'shadow2  br4'}
//       skeleton={!post}
//       onClick={null}
//       /* Children */
//       withLinkProps={{
//         type: 'next',
//         href: '/creations/[slug]',
//         target: null,
//         routerLink: Link,
//         routerLinkProps: {
//           as: `/creations/${post?.slug}`,
//           scroll: false,
//         },
//       }}
//     />
//   );
//
//   const cardHeading = post && (
//     <Heading
//       /* Options */
//       htmlEntity="h2"
//       text={post?.title}
//       color="black"
//       size="small"
//       truncate={columnCount === 3 ? 2 : 3}
//       skeleton={!post}
//       /* Children */
//       withLinkProps={null}
//     />
//   );
//
//   let labelBlock = [];
//
//   if (post?.tags?.length) {
//     post.tags.map((label) => {
//       labelBlock.push(
//         <Label
//           /* Options */
//           customClass="category"
//           text={label}
//           color="white"
//           backgroundColor="black"
//           onClick={null}
//           /* Children */
//           withLinkProps={null}
//         />
//       );
//     });
//   }
//
//   return (
//     <Observer {...observer}>
//       <div className={`card ${inView && 'in-view'}`}>
//         <Card
//           /* Options */
//           type="block"
//           onClick={null}
//           /* Children */
//           image={cardImage}
//           labelBlock={null}
//           title={cardHeading}
//           description={null}
//           button={null}
//         />
//       </div>
//     </Observer>
//   );
// }

import Link from 'next/link';
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

export default function CardBlog({ post }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 260 : 180;
  const buttonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;

  console.log('post', post);

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
        href: '/creations/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/creations/${post?.slug}`,
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
        href: '/creations/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/creations/${post?.slug}`,
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
  );
}
