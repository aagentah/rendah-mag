import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function CardDefault({ post, columnCount }) {
  console.log('post', post);
  const [ref, inView, entry] = useInView({
    rootMargin: '20px 0px -220px 0px',
    threshold: 1,
  });

  let cardImage;

  cardImage = (
    <Image
      /* Options */
      src={imageBuilder.image(post.image).height(200).width(250).url()}
      placeholder={imageBuilder.image(post.image).height(20).width(25).url()}
      alt={post.title}
      figcaption={null}
      height={150}
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

  if (columnCount == 1) {
    cardImage = (
      <Image
        /* Options */
        src={imageBuilder.image(post.image).height(1000).width(1000).url()}
        placeholder={imageBuilder.image(post.image).height(20).width(25).url()}
        alt={post.title}
        figcaption={null}
        height={600}
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
  }

  // const cardLabel = (
  //   <Label
  //     /* Options */
  //     customClass="ph2"
  //     text="Blog"
  //     color="white"
  //     backgroundColor="black"
  //     onClick={null}
  //     /* Children */
  //     withLinkProps={null}
  //   />
  // );

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={post.title}
      color="black"
      size="small"
      truncate={4}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  // const cardCopy = (
  //   <Copy
  //     /* Options */
  //     text={post.description}
  //     color="black"
  //     size="medium"
  //     truncate={3}
  //   />
  // );

  return (
    <div className={`card--scroll  ${inView ? 'in-view' : 'n'}`} ref={ref}>
      <Card
        /* Options */
        type="block"
        onClick={null}
        /* Children */
        image={cardImage}
        labelBlock={null}
        title={cardHeading}
        description={null}
        button={null}
      />
    </div>
  );
}
