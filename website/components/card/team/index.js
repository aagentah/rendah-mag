import { useState } from 'react';
import Link from 'next/link';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardBlog({ teamMember, columnCount }) {
  const app = useApp();
  const [inView, setInView] = useState(false);

  if (!app.deviceSize) return null;
  let scale = app.isRetina ? 2 : 1;
  let imageUrlWidth = app.deviceSize === 'md' ? 260 : 230;
  let imageHeight = app.deviceSize === 'md' ? 260 : 180;

  if (columnCount === 2) {
    imageUrlWidth = app.deviceSize === 'md' ? 260 : 500;
    imageHeight = app.deviceSize === 'md' ? 260 : 300;
  }

  const cardImage = (
    <LazyLoad once offset={100} height={imageHeight}>
      <Image
        /* Options */
        src={imageBuilder
          .image(teamMember.image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()}
        placeholder={imageBuilder
          .image(teamMember.image)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
          .url()}
        alt={teamMember.title}
        figcaption={null}
        height={imageHeight}
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
    </LazyLoad>
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

  const handleIntersection = (event) => {
    if (event.isIntersecting) {
      return setInView(true);
    }

    return setInView(false);
  };

  const options = {
    onChange: handleIntersection,
    rootMargin: '0% 0% -30% 0%',
  };

  return (
    <Observer {...options}>
      <div className={`card--team  card--scroll  ${inView && 'in-view'}`}>
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
    </Observer>
  );
}
