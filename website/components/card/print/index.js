import Button from '~/components/elements/button';
import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import { useApp } from '~/context-provider/app';

export default function CardPrint({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const height = app?.deviceSize === 'md' ? null : 200;

  const image = (
    <ImageNew
      imageObject={post?.imageObject}
      height={height}
      className="w-100  shadow2 br3"
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
