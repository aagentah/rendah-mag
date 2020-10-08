import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardDefault({ product }) {
  const app = useApp();

  if (!app.deviceSize) return null;
  let scale = app.isRetina ? 2 : 1;
  const imageUrlWidth = app.deviceSize === 'md' ? 200 : 230;
  const imageHeight = app.deviceSize === 'md' ? 200 : 230;

  const cardImage = (
    <LazyLoad once offset={150} height={imageHeight}>
      <Image
        /* Options */
        src={imageBuilder
          .image(product.image1)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()}
        placeholder={imageBuilder
          .image(product.image1)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
          .url()}
        alt={product.title}
        figcaption={null}
        height={imageHeight}
        width={null}
        customClass={null}
        onClick={null}
        /* Children */
        withLinkProps={{
          type: 'next',
          href: '/product/[slug]',
          target: null,
          routerLink: Link,
          routerLinkProps: {
            as: `/product/${product.slug}`,
            scroll: false,
          },
        }}
      />
    </LazyLoad>
  );

  const cardLabel = (
    <Label
      /* Options */
      customClass="ph2"
      text={`£${product.price}`}
      color="white"
      backgroundColor="black"
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={product.title}
      color="black"
      size="small"
      truncate={1}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const cardCopy = (
    <Copy
      /* Options */
      text={product.excerpt}
      color="black"
      size="medium"
      truncate={1}
    />
  );

  return (
    <Card
      /* Options */
      type="block"
      onClick={null}
      /* Children */
      image={cardImage}
      labelBlock={[cardLabel]}
      title={cardHeading}
      description={cardCopy}
      button={null}
    />
  );
}
