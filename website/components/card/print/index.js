import Button from '~/components/elements/button';
import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardPrint({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 200 : 200;
  const imageHeight = app?.deviceSize === 'md' ? 200 : 200;
  const imageUrlHeight = app?.deviceSize === 'md' ? 200 : 200;

  const image = (
    <Image
      /* Options */
      src={
        post?.image &&
        imageBuilder
          .image(post.image)
          .width(imageUrlWidth * scale)
          .height(imageUrlHeight * scale)
          .auto('format')
          .fit('crop')
          .crop('center')
          .url()
      }
      placeholder={null}
      alt={post?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass="shadow2"
      skeleton={!post}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={post?.title}
      color="white"
      size="small"
      truncate={null}
      skeleton={!post}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <article className="card  card--print">
      <div
        className="card__image pb3"
        onClick={() => handleClick && handleClick(i)}
      >
        {image}
      </div>

      <div className="card__dialog">
        <div
          className="card__title"
          onClick={() => handleClick && handleClick(i)}
        >
          {heading}
        </div>

        <div className="card__button  pt1  pb3">
          <Button
            /* Options */
            type="primary"
            size="x-small"
            text="Download"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'external',
              href: `${post.file}?dl=`,
              target: '_blank',
              routerLink: null,
              routerLinkProps: null,
            }}
          />
        </div>
      </div>
    </article>
  );
}
