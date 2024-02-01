import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import { useApp } from '~/context-provider/app';

export default function CardOffering({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 160 : 160;

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={post?.title}
      color="white"
      size="small"
      truncate={null}
      skeleton={null}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <article
      className="card  card--offering  cp"
      onClick={() => handleClick && handleClick(i)}
    >
      <div className="card__dialog">
        <div className="card__title">{heading}</div>
      </div>
    </article>
  );
}
