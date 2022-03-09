import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import {
  Image,
  Label,
  Heading,
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
      height={null}
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

  const labels = [
    <Label
      /* Options */
      customClass=""
      text={`£${product?.price}`}
      color="white"
      backgroundColor="black"
      skeleton={!product}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />,
  ];

  if (product?.tag === 'Sold-out') {
    labels.push(
      <Label
        /* Options */
        customClass="fw7"
        text="Sold-out"
        color="black"
        backgroundColor=""
        skeleton={!product}
        onClick={null}
        /* Children */
        withLinkProps={null}
      />
    );
  }

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

  // const copy = (
  //   <Copy
  //     /* Options */
  //     text={product?.excerpt}
  //     color="black"
  //     size="medium"
  //     truncate={2}
  //     skeleton={!product}
  //   />
  // );

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
          {button && <div className="card__button">{button}</div>}
        </div>
      </article>
    </LazyLoad>
  );
}
