import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function CardBlog({ member, featured }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const height = app?.deviceSize === 'md' ? null : 230;

  const buttonIcon = <IconArrowRight color="black" size={16} />;

  const image = (
    <Link href={`/team/${member?.slug}`} scroll={false} passHref legacyBehavior>
      <a>
        <ImageNew
          imageObject={member?.imageObject}
          height={height}
          className="w-100  shadow2 br3"
        />
      </a>
    </Link>
  );

  const labels = (
    <Label
      /* Options */
      customClass=""
      text="Blog"
      color="white"
      backgroundColor="black"
      skeleton={!member}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={member?.name}
      color={app?.deviceSize === 'md' ? 'black' : 'white'}
      size="small"
      truncate={1}
      skeleton={!member}
      /* Children */
      withLinkProps={
        member?.slug && {
          type: 'next',
          href: '/team/[slug]',
          target: null,
          routerLink: Link,
          routerLinkProps: {
            as: `/team/${member?.slug}`,
            scroll: false,
          },
        }
      }
    />
  );

  // const copy = (
  //   <Copy
  //     /* Options */
  //     text={member?.excerpt}
  //     color="black"
  //     size="medium"
  //     truncate={2}
  //     skeleton={!member}
  //   />
  // );

  // const button = (
  //   <Button
  //     /* Options */
  //     type="secondary"
  //     size="small"
  //     text="View member"
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
  //       href: '/team/[slug]',
  //       target: null,
  //       routerLink: Link,
  //       routerLinkProps: {
  //         as: `/team/${member?.slug}`,
  //         scroll: false,
  //       },
  //     }}
  //   />
  // );

  return (
    <LazyLoad once offset={250} height={height}>
      <team className="card  card--member  card--scroll">
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
      </team>
    </LazyLoad>
  );
}
