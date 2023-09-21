import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

import Button from '~/components/elements/button';
import Image from '~/components/elements/image';

import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function CardDashboard({
  title,
  coverImage,
  handleToggle,
  id,
  i,
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageUrlWidth;

  imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  imageHeight = app?.deviceSize === 'md' ? 160 : 340;

  const buttonIcon = <IconArrowRight color="white" size={16} />;

  const image = (
    <Image
      /* Options */
      src={coverImage && coverImage}
      placeholder={null}
      alt={null}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass="shadow2  cp"
      skeleton={null}
      onClick={() => handleToggle(id, i)}
      /* Children */
      withLinkProps={null}
    />
  );

  // const labels = (
  //   <Label
  //     /* Options */
  //     customClass=""
  //     text="Blog"
  //     color="white"
  //     backgroundColor="black"
  //     skeleton={null}
  //     onClick={() => handleToggle('offerings', 1)}
  //     /* Children */
  //     withLinkProps={null}
  //   />
  // );

  // const heading = (
  //   <Heading
  //     /* Options */
  //     htmlEntity="h2"
  //     text={title}
  //     color="white"
  //     size="medium"
  //     truncate={null}
  //     skeleton={false}
  //     onClick={() => handleToggle(id, i)}
  //     /* Children */
  //     withLinkProps={null}
  //   />
  // );

  // const copy = (
  //   <Copy
  //     /* Options */
  //     text={post?.excerpt}
  //     color="black"
  //     size="medium"
  //     truncate={2}
  //     skeleton={!post}
  //   />
  // );

  const button = (
    <Button
      /* Options */
      type="secondary"
      size="large"
      text={title}
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      skeleton={false}
      onClick={() => handleToggle(id, i)}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <LazyLoad once offset={250} height={imageHeight}>
      <article className="card  card--dashboard">
        {image && <div className="card__image">{image}</div>}

        <div className="card__dialog">
          {
            // labels?.length && <div className="card__labels">{[...labels]}</div>
          }
          {
            // heading && <div className="card__title">{heading}</div>
          }
          {
            // copy && <div className="card__description">{copy}</div>
          }
          {button && <div className="card__button">{button}</div>}
        </div>
      </article>
    </LazyLoad>
  );
}
