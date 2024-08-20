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

function getIconByMimeType(mimeType) {
  if (!mimeType) return <FaFile />;
  if (mimeType.startsWith('audio/')) return <FaMusic />;
  if (mimeType.startsWith('video/')) return <FaVideo />;
  if (mimeType.startsWith('image/')) return <FaFileImage />;
  if (mimeType === 'application/pdf') return <FaFilePdf />;
  return <FaFileAlt />;
}

function groupAttachmentsByMimeType(attachments) {
  const grouped = {};

  attachments.forEach((attachment) => {
    const icon = getIconByMimeType(attachment.mimeType);
    const iconKey = icon.type.displayName || icon.type.name;

    if (grouped[iconKey]) {
      grouped[iconKey].count += 1;
    } else {
      grouped[iconKey] = { icon, count: 1 };
    }
  });

  return Object.values(grouped);
}

export default function CardBlog({ post, handleClick, i }) {
  const app = useApp();
  const height = app.deviceSize === 'md' ? 180 : 260;
  const width = 260;

  const image = (
    <ImageNew
      imageObject={post?.imageObject}
      height={height}
      width={width}
      className="br3"
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
      size={app?.deviceSize === 'md' ? 'medium' : 'medium'}
      truncate={null}
      skeleton={!post}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <LazyLoad once offset={250} height={height}>
      <article
        className="card  mb4  mb0-md  relative cp flex flex-wrap bg-darker-grey br3 shadow2"
        onClick={() => handleClick && handleClick(i)}
      >
        {image && <div className="card__image col-24 col-3-md">{image}</div>}

        <div className="col-24 col-11-md pa3">
          {heading && <div className="card__title mb3">{heading}</div>}

          {post?.subtitle && (
            <p className="lh-copy f6 white mb2 mb3-md">{post?.subtitle}</p>
          )}

          <div className="relative">
            <span className="white">
              {post.attachments.length && (
                <div className="flex align-center relative">
                  {'['}
                  {groupAttachmentsByMimeType(post.attachments).map(
                    ({ icon, count }, index) => (
                      <span
                        key={index}
                        className="pa2 pa0-md ph1-md bg-transparent-md flex"
                      >
                        <span className="pr2">{count}x</span> {icon}
                      </span>
                    )
                  )}
                  {']'}
                </div>
              )}
            </span>
          </div>
        </div>
      </article>
    </LazyLoad>
  );
}
