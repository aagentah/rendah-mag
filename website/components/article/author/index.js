import Link from 'next/link';

import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function Author({ siteConfig, author }) {
  const app = useApp();
  const { posts } = author;
  const imageHeight = app.deviceSize === 'md' ? null : 150;

  return (
    <div className="article__author  flex  flex-wrap  br4  bg-white  shadow2  relative  pa4">
      <div className="absolute  top  right  nt2  mr4">
        <div className="ba  bc-black  br3">
          <Label
            /* Options */
            customClass="br3"
            text="Author"
            color="black"
            backgroundColor="white"
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </div>

      {author.image && (
        <div className="col-24  col-9-md  pb4  pb0-md">
          <ImageNew imageObject={author.imageObject} height={imageHeight} />
        </div>
      )}

      <div className="col-24  col-15-md  pl0  pl4-md  pr0  pr2-md">
        {author.name && (
          <div className="db  pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text={author.name}
              color="black"
              size="small"
              truncate={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/team/[slug]',
                target: null,
                routerLink: Link,
                routerLinkProps: {
                  as: `/team/${author.slug.current}`,
                  scroll: false,
                },
              }}
            />
          </div>
        )}

        {author.alias && (
          <div className="db  pb3">
            <Label
              /* Options */
              customClass=""
              text={author.alias}
              color="white"
              backgroundColor="black"
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        )}

        {author.description && (
          <div className="db  pb2">
            <Copy
              /* Options */
              text={author.description}
              color="black"
              size="small"
              truncate={null}
            />
          </div>
        )}
      </div>
    </div>
  );
}
