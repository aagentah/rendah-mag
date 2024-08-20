import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';
import WithLink from '../../utils/with-link';

import { useApp } from '~/context-provider/app';

export default function CardBlog({ post, columnCount, inverted }) {
  const app = useApp();
  const height = app.deviceSize === 'md' ? 180 : 260;
  const width = 260;

  const image = (
    <ImageNew
      imageObject={post?.imageObject}
      height={height}
      width={width}
      className="br3 shadow2"
    />
  );

  const labels = (
    <Label
      customClass=""
      text="Blog"
      color="white"
      backgroundColor="black"
      skeleton={!post}
      onClick={null}
    />
  );

  const heading = (
    <Heading
      htmlEntity="h2"
      text={post?.title}
      color={app?.deviceSize === 'md' && !inverted ? 'black' : 'white'}
      size={app?.deviceSize === 'md' ? 'small' : 'small'}
      truncate={null}
      skeleton={!post}
    />
  );

  return (
    <LazyLoad once offset={250} height={height}>
      <article className="card  card--post  card--scroll  mb4  mb0-md">
        <WithLink
          withLinkProps={
            post?.slug && {
              type: 'next',
              href: '/article/[slug]',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                as: `/article/${post?.slug}`,
                scroll: false,
              },
            }
          }
        >
          {image && <div className="card__image">{image}</div>}

          <div className="card__dialog">
            {labels?.length && (
              <div className="card__labels">{[...labels]}</div>
            )}
            {heading && <div className="card__title">{heading}</div>}
          </div>
        </WithLink>
      </article>
    </LazyLoad>
  );
}
