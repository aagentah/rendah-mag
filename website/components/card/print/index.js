import Link from 'next/link';
import Button from '~/components/elements/button';
import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import { useApp } from '~/context-provider/app';

export default function CardPrint({ post, handleClick, i }) {
  const app = useApp();
  const height = app.deviceSize === 'md' ? 260 : 200;
  const width = 260;
  const _id = post?.slug; // Assuming print posts have a slug as well

  return (
    <Link href={`/profile/print/${_id}`}>
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
            type="print"
          />
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-between p-4 col-span-6">
          <div className="flex flex-wrap gap-x-2">
            <div className="inline text-xxs px-2 py-0.5 border border-neutral-400 text-neutral-400">
              Print
            </div>
          </div>

          <div>
            <h3 className="text-sm text-neutral-300 mb-4">{post?.title}</h3>

            <div className="pt-1 pb-3">
              <Button
                type="primary"
                size="x-small"
                text="Download"
                color="neutral-400"
                fluid={false}
                onClick={(e) => {
                  // Prevent the parent Link click if button is pressed
                  e.stopPropagation();
                }}
                withLinkProps={{
                  type: 'external',
                  href: `${post.file}?dl=`,
                  target: '_blank',
                }}
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
