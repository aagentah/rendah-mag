// import Link from 'next/link';
// import LazyLoad from 'react-lazyload';
//
// import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';
//
// import { imageBuilder } from '~/lib/sanity/requests';
// import { useApp } from '~/context-provider/app';
//
// export default function CardDefault({ product }) {
//   const app = useApp();
//
//   if (!app.deviceSize) return null;
//   const scale = app.isRetina ? 2 : 1;
//   const imageUrlWidth = app.deviceSize === 'md' ? 200 : 230;
//   const imageHeight = app.deviceSize === 'md' ? 200 : 230;
//   const headingSize = 'small';
//   const isSoldOut = product?.tag === 'Sold-out';
//
//   const cardImage = (
//     <Image
//       /* Options */
//       src={product?.image1}
//       placeholder={null}
//       alt={product?.title}
//       figcaption={null}
//       height={imageHeight}
//       width={null}
//       customClass={null}
//       skeleton={false}
//       onClick={null}
//       /* Children */
//       withLinkProps={{
//         type: 'next',
//         href: '/product/[slug]',
//         target: null,
//         routerLink: Link,
//         routerLinkProps: {
//           as: `/product/${product?.slug}`,
//           scroll: false,
//         },
//       }}
//     />
//   );
//
//   const cardLabel = [];
//
//   if (product?.price) {
//     cardLabel.push(
//       <Label
//         /* Options */
//         customClass="ph2"
//         text={`£${product?.price}`}
//         color="white"
//         backgroundColor="black"
//         onClick={null}
//         /* Children */
//         withLinkProps={null}
//       />
//     );
//   }
//
//   if (product?.tag && product?.tag !== 'None') {
//     cardLabel.push(
//       <Label
//         /* Options */
//         customClass="ph2"
//         text={product?.tag}
//         color="black"
//         backgroundColor="almost-white"
//         onClick={null}
//         /* Children */
//         withLinkProps={null}
//       />
//     );
//   }
//
//   const cardHeading = (
//     <Heading
//       /* Options */
//       htmlEntity="h2"
//       text={product?.title}
//       color="black"
//       size={headingSize}
//       truncate={1}
//       /* Children */
//       withLinkProps={{
//         type: 'next',
//         href: '/product/[slug]',
//         target: null,
//         routerLink: Link,
//         routerLinkProps: {
//           as: `/product/${product?.slug}`,
//           scroll: false,
//         },
//       }}
//     />
//   );
//
//   const cardCopy = (
//     <Copy
//       /* Options */
//       text={product?.excerpt}
//       color="black"
//       size="medium"
//       truncate={1}
//     />
//   );
//
//   return (
//     <LazyLoad once offset={150} height={imageHeight}>
//       <Card
//         /* Options */
//         type="block"
//         onClick={null}
//         /* Children */
//         image={product?.image1 && cardImage}
//         labelBlock={cardLabel?.length ? cardLabel : null}
//         title={cardHeading}
//         description={cardCopy}
//         button={null}
//       />
//     </LazyLoad>
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

export default function CardProduct({ product }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 260 : 230;
  const buttonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;

  console.log('product', product);

  const image = (
    <Image
      /* Options */
      src={
        product &&
        imageBuilder
          .image(product?.image1)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={null}
      alt={product?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={!product}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/product/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/product/${product?.slug}`,
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
      skeleton={!product}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={product?.title}
      color="black"
      size="small"
      truncate={1}
      skeleton={!product}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/product/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/product/${product?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  const copy = (
    <Copy
      /* Options */
      text={product?.excerpt}
      color="black"
      size="medium"
      truncate={2}
      skeleton={!product}
    />
  );

  const button = (
    <Button
      /* Options */
      type="secondary"
      size="small"
      text="View product"
      color="black"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      skeleton={false}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/product/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/product/${product?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  return (
    <LazyLoad once offset={150} height={imageHeight}>
      <article className="card  card--product">
        {image && <div className="card__image">{image}</div>}

        <div className="card__dialog">
          {labels?.length && <div className="card__labels">{[...labels]}</div>}
          {heading && <div className="card__title">{heading}</div>}
          {copy && <div className="card__description">{copy}</div>}
          {button && <div className="card__button">{button}</div>}
        </div>
      </article>
    </LazyLoad>
  );
}
