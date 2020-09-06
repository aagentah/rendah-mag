import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function Cardmix({ mix, columnCount }) {
  const [ref, inView, entry] = useInView({
    rootMargin: '20px 0px -220px 0px',
    threshold: 1,
  });

  const cardImage = (
    <Image
      /* Options */
      src={imageBuilder.image(mix.image).height(200).width(250).url()}
      placeholder={imageBuilder.image(mix.image).height(20).width(25).url()}
      alt={mix.title}
      figcaption={null}
      height={150}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/mix/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/mix/${mix.slug}`,
        },
      }}
    />
  );

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={mix.title}
      color="black"
      size="small"
      truncate={4}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

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
