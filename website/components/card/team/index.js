import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function CardBlog({ teamMember, columnCount }) {
  const [ref, inView, entry] = useInView({
    rootMargin: '20px 0px -220px 0px',
    threshold: 1,
  });

  const cardImage = (
    <Image
      /* Options */
      src={imageBuilder.image(teamMember.image).height(200).width(250).url()}
      placeholder={imageBuilder
        .image(teamMember.image)
        .height(20)
        .width(25)
        .url()}
      alt={teamMember.title}
      figcaption={null}
      height={200}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/team/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/team/${teamMember.slug.current}`,
        },
      }}
    />
  );

  const cardLabel = teamMember.alias ? (
    <Label
      /* Options */
      customClass="ph2"
      text={teamMember.alias}
      color="white"
      backgroundColor="black"
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  ) : null;

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={teamMember.name}
      color="black"
      size="small"
      truncate={4}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <div
      className={`card--team  card--scroll  ${inView ? 'in-view' : 'n'}`}
      ref={ref}
    >
      <Card
        /* Options */
        type="block"
        onClick={null}
        /* Children */
        image={cardImage}
        labelBlock={[cardLabel]}
        title={cardHeading}
        description={null}
        button={null}
      />
    </div>
  );
}
