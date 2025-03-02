import Link from 'next/link';

import Label from '~/components/elements/label';
import ImageNew from '~/components/elements/image-new';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function Author({ siteConfig, author }) {
  const app = useApp();
  const { posts } = author;
  const imageHeight = app.deviceSize === 'md' ? null : 150;

  return (
    <div className="flex flex-wrap relative p-4">
      <div className="absolute top-0 right-0 mt-2 mr-4">
        <div className="border border-black rounded">
          <Label
            customClass="rounded"
            text="Author"
            color="black"
            backgroundColor="white"
            onClick={null}
            withLinkProps={null}
          />
        </div>
      </div>

      {author.image && (
        <div className="w-full md:w-9/24 pb-4 md:pb-0">
          <ImageNew imageObject={author.imageObject} height={imageHeight} />
        </div>
      )}

      <div className="w-full md:w-15/24 pl-0 md:pl-4 pr-0 md:pr-2">
        {author.name && (
          <div className="pb-2">
            <Link
              href="/team/[slug]"
              as={`/team/${author.slug.current}`}
              scroll={false}
              legacyBehavior
            >
              <a>
                <h1 className="text-black text-sm truncate">{author.name}</h1>
              </a>
            </Link>
          </div>
        )}

        {author.alias && (
          <div className="pb-3">
            <Label
              customClass=""
              text={author.alias}
              color="white"
              backgroundColor="black"
              onClick={null}
              withLinkProps={null}
            />
          </div>
        )}

        {author.description && (
          <div className="pb-2">
            <p className="text-black text-sm">{author.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
