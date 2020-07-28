import Link from 'next/link';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function CardDefault({ post }) {
  const cardImage = (
    <Image
      /* Options */
      src={imageBuilder.image(post.coverImage).height(200).width(250).url()}
      placeholder={imageBuilder
        .image(post.coverImage)
        .height(20)
        .width(25)
        .url()}
      alt={post.title}
      figcaption={null}
      height={200}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/post/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/post/${post.slug}`,
        },
      }}
    />
  );

  const cardLabel = (
    <Label
      /* Options */
      customClass="ph2"
      text="Blog"
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
      text={post.title}
      color="black"
      size="small"
      truncate={2}
      reveal={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/post/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/post/${post.slug}`,
        },
      }}
    />
  );

  const cardCopy = (
    <Copy
      /* Options */
      text={post.description}
      color="black"
      size="medium"
      truncate={3}
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
