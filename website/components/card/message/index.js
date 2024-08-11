import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import {
  FaPaperclip,
  FaMusic,
  FaVideo,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFile,
} from 'react-icons/fa'; // Import necessary icons

import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';

import { useApp } from '~/context-provider/app';

export default function CardBlog({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageWidth;

  imageWidth = 328;
  imageHeight = 328;

  const image = (
    <ImageNew
      imageObject={post?.imageObject}
      height={imageHeight}
      width={imageWidth}
    />
  );

  const labels = (
    <Label
      /* Options */
      customClass=""
      text="Blog"
      color="white"
      backgroundColor="black"
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
      size={app?.deviceSize === 'md' ? 'small' : 'small'}
      truncate={null}
      skeleton={!post}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <LazyLoad once offset={250} height={imageHeight}>
      <article
        className="card  card--post  card--scroll  mb4  mb0-md  relative cp"
        onClick={() => handleClick && handleClick(i)}
      >
        {image && <div className="card__image">{image}</div>}

        <div className="card__dialog">
          {heading && (
            <div className="card__title mb3">
              {heading}

              {post?.subtitle && (
                <p className="lh-copy f6 white pt2">{post?.subtitle}</p>
              )}
            </div>
          )}
        </div>
      </article>
    </LazyLoad>
  );
}
