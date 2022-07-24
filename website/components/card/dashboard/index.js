import LazyLoad from 'react-lazyload';
import { Image, Icon, Button } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardDashboard({
  title,
  coverImage,
  handleToggle,
  id,
  i
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageUrlWidth;

  imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  imageHeight = app?.deviceSize === 'md' ? 160 : 290;

  const buttonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;

  const image = (
    <Image
      /* Options */
      src={
        coverImage &&
        imageBuilder
          .image(coverImage)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
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
    <LazyLoad once offset={150} height={imageHeight}>
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
