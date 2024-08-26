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
  if (!mimeType) return { icon: <FaFile />, label: 'File' };
  const extension = mimeType.split('/').pop().toUpperCase(); // Extract the file extension
  if (mimeType.startsWith('audio/'))
    return { icon: <FaMusic />, label: extension };
  if (mimeType.startsWith('video/'))
    return { icon: <FaVideo />, label: extension };
  if (mimeType.startsWith('image/'))
    return { icon: <FaFileImage />, label: extension };
  if (mimeType === 'application/pdf')
    return { icon: <FaFilePdf />, label: 'PDF' };
  return { icon: <FaFileAlt />, label: extension }; // Use the extension as the label
}

function groupAttachmentsByMimeType(attachments) {
  const grouped = {};

  attachments.forEach((attachment) => {
    const { icon, label } = getIconByMimeType(attachment.mimeType);

    if (grouped[label]) {
      grouped[label].count += 1;
    } else {
      grouped[label] = { icon, label, count: 1 };
    }
  });

  return Object.values(grouped);
}

export default function CardBlog({ post, handleClick, i }) {
  const app = useApp();
  const height = app.deviceSize === 'md' ? 180 : 100;
  const width = 260;
  const _id = post?.slug; // Assuming `_id` is available in the `post` object

  const image = (
    <ImageNew imageObject={post?.imageObject} height={height} className="br3" />
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
      color="white"
      size={app?.deviceSize === 'md' ? 'medium' : 'medium'}
      truncate={null}
      skeleton={!post}
    />
  );

  return (
    <Link href={`/profile/resource/${_id}`}>
      <article
        className="card  mb4  mb0-md  relative cp flex flex-wrap bg-darker-grey br3 shadow2"
        onClick={() => handleClick && handleClick(i)}
      >
        {image && <div className="card__image col-24 col-3-md">{image}</div>}

        <div className="col-24 col-11-md pa3">
          {heading && <div className="card__title mb3">{heading}</div>}

          {post?.subtitle && (
            <p className="lh-copy f6 mb2 silver">{post?.subtitle}</p>
          )}

          {post?.attachments?.length > 0 && (
            <div className="relative f6">
              <span className="rendah-red">
                {post.attachments.length > 0 && (
                  <div className="flex align-center relative">
                    <span className="f7">
                      {post.attachments.length}x attachment
                      {post.attachments.length > 1 ? 's' : ''} [
                    </span>
                    {groupAttachmentsByMimeType(post.attachments).map(
                      ({ label }, index) => (
                        <span key={index} className="">
                          {label}
                          {index <
                            groupAttachmentsByMimeType(post.attachments)
                              .length -
                              1 && ','}
                        </span>
                      )
                    )}
                    <span>]</span>
                  </div>
                )}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
