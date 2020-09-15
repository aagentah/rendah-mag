import Link from 'next/link';

import { Heading, Copy, Label, Image } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

export default function Author({ siteConfig, author }) {
  const { posts } = author;

  return (
    <div className="flex  flex-wrap  br4  shadow2  relative  pa4">
      <div className="absolute  top  right  nt2  mr4">
        <Label
          /* Options */
          customClass="ph2"
          text="Author"
          color="black"
          backgroundColor="light-grey"
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      {author.image && (
        <div className="col-24  col-9-md  pb4  pb0-md">
          <Image
            /* Options */
            src={imageBuilder.image(author.image).height(500).width(500).url()}
            placeholder={imageBuilder
              .image(author.image)
              .height(25)
              .width(25)
              .url()}
            alt={author.name}
            figcaption={null}
            height={150}
            width={null}
            customClass="shadow2"
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/team/[slug]',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                as: `/team/${author.slug.current}`,
              },
            }}
          />
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
              reveal={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/team/[slug]',
                target: null,
                routerLink: Link,
                routerLinkProps: {
                  as: `/team/${author.slug.current}`,
                },
              }}
            />
          </div>
        )}

        {author.alias && (
          <div className="db  pb3">
            <Label
              /* Options */
              customClass="ph2"
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
          <div className="db  pb3  taj">
            <Copy
              /* Options */
              text={author.description}
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
        )}
      </div>
    </div>
  );
}
