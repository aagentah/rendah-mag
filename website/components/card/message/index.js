import Link from 'next/link';
import {
  FaPaperclip,
  FaMusic,
  FaVideo,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFile,
} from 'react-icons/fa';
import LazyLoad from 'react-lazyload';

import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';

import { useApp } from '~/context-provider/app';

export default function CardBlog({ post, handleClick, i }) {
  const app = useApp();
  const height = app.deviceSize === 'md' ? 240 : 240;
  const width = 260;
  const _id = post?.slug;

  return (
    <Link href={`/profile/newsletter/${_id}`}>
      <article
        onClick={() => handleClick && handleClick(i)}
        className="
          grid grid-cols-1 md:grid-cols-12 gap-y-4
          text-white
          overflow-hidden
          cursor-pointer
          border-b-4 border-neutral-700
        "
      >
        {/* Left Column: Image */}
        <div className="relative col-span-6">
          <ImageNew
            imageObject={post?.imageObject}
            height={height}
            width={width}
            className="w-full h-full object-cover brightness-75"
            type="blog"
          />
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-between p-4 col-span-6">
          <div className="flex flex-wrap gap-x-2">
            <div className="inline text-xxs px-2 py-0.5 border border-neutral-400 text-neutral-400 mb-4">
              Newsletter
            </div>
          </div>

          <div>
            <h3 className="text-sm text-neutral-300">{post?.title}</h3>

            {post?.subtitle && (
              <p className="text-sm text-neutral-400 mt-2">{post.subtitle}</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
