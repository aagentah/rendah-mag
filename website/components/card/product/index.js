import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardDefault({ product }) {
  const app = useApp();
  if (!app.deviceType) return null;
  const imageUrlWidth = app.deviceType === 'mobile' ? 600 : 230;
  const imageUrlHeight = app.deviceType === 'mobile' ? 600 : 230;
  const imageHeight = app.deviceType === 'mobile' ? 200 : 230;

  const cardImage = (
    <LazyLoad once offset={100} height={imageUrlHeight}>
      <Image
        /* Options */
        src={imageBuilder
          .image(product.image1)
          .width(imageUrlWidth)
          .height(imageUrlHeight)
          .auto('format')
          .url()}
        placeholder={imageBuilder
          .image(product.image1)
          .height(imageUrlHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
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
