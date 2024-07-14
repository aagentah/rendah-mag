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
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

function getIconByMimeType(mimeType) {
  if (!mimeType) return <FaFile />;
  if (mimeType.startsWith('audio/')) return <FaMusic />;
  if (mimeType.startsWith('video/')) return <FaVideo />;
  if (mimeType.startsWith('image/')) return <FaFileImage />;
  if (mimeType === 'application/pdf') return <FaFilePdf />;
  return <FaFileAlt />;
}

export default function CardBlog({ post, handleClick, i }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  let imageHeight;
  let imageUrlWidth;

  imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  imageHeight = app?.deviceSize === 'md' ? 260 : 260;

  const image = (
    <Image
      /* Options */
      src={
        post?.coverImage &&
        imageBuilder
          .image(post?.coverImage)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('crop')
          .crop(app?.deviceSize === 'md' ? 'top' : 'center')
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
        {image && (
          <div className="card__image relative">
            {image}

            <span className="z3 absolute bottom left ml3 mb3 white">
              <div className="flex">
                {post?.attachments?.length &&
                  post.attachments.map((attachment, index) => (
                    <span
                      key={index}
                      className="pa2 pa0-md pr2-md bg-almost-black bg-transparent-md"
                    >
                      {getIconByMimeType(attachment.mimeType)}
                    </span>
                  ))}
              </div>
            </span>
          </div>
        )}

        <div className="card__dialog">
          {heading && <div className="card__title">{heading}</div>}
        </div>
      </article>
    </LazyLoad>
  );
}
