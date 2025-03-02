import { useState } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import 'intersection-observer';

// import Observer from '@researchgate/react-intersection-observer';
import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function CardGallery({ post }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const [inView, setInView] = useState(false);
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 230;
  const imageHeight = app?.deviceSize === 'md' ? 200 : 230;
  const buttonIcon = <IconArrowRight color="black" size={16} />;
  const handleIntersect = (event) => setInView(event.isIntersecting);
  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={post?.title}
      color="white"
      size="medium"
      truncate={null}
      skeleton={!post}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/gallery/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/gallery/${post?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  // const copy = (
  //   <Copy
  //     /* Options */
  //     text={post?.excerpt}
  //     color="black"
  //     size="medium"
  //     truncate={2}
  //     skeleton={!post}
  //   />
  // );

  // const button = (
  //   <Button
  //     /* Options */
  //     type="secondary"
  //     size="small"
  //     text="View post"
  //     color="black"
  //     fluid={false}
  //     icon={buttonIcon}
  //     iconFloat={null}
  //     inverted={false}
  //     loading={false}
  //     disabled={false}
  //     skeleton={false}
  //     onClick={null}
  //     /* Children */
  //     withLinkProps={{
  //       type: 'next',
  //       href: '/article/[slug]',
  //       target: null,
  //       routerLink: Link,
  //       routerLinkProps: {
  //         as: `/article/${post?.slug}`,
  //         scroll: false,
  //       },
  //     }}
  //   />
  // );

  return (
    // <Observer {...observer}>
    <LazyLoad once offset={250} height={imageHeight}>
      <article className={`${inView && 'in-view'}`}>
        <div className="flex flex-wrap">
          <div className="dib  pa2  ba  bc-white  mb4">{heading}</div>
        </div>
        <div className="flex flex-wrap  mb5">
          {(() => {
            return post?.galleryImages.slice(0, 7).map((image, i) => (
              <div className="col-6  col-3-md  pa2" key={i}>
                <Link href={`/gallery/${post?.slug}`} legacyBehavior>
                  <Image
                    src={imageBuilder
                      .image(image.asset)
                      .height(500)
                      .width(500)
                      .auto('format')
                      .fit('clip')
                      .url()}
                    placeholder={imageBuilder
                      .image(image.asset)
                      .height(25)
                      .width(25)
                      .auto('format')
                      .fit('clip')
                      .blur('20')
                      .url()}
                    alt={image.alt || ''}
                    figcaption={null}
                    height={imageHeight}
                    width={null}
                    customClass="br3  shadow3  cp"
                    skeleton={!post}
                    onClick={null}
                    withLinkProps={null}
                  />
                </Link>
              </div>
            ));
          })()}

          <div className="col-6  col-3-md  pa2  flex  align-center  justify-center">
            <Link href={`/gallery/${post?.slug}`} legacyBehavior>
              <span className="ba  bc-white  br-100  pa2  cp">
                <IconArrowRight color="white" size={24} />
              </span>
            </Link>
          </div>
        </div>
      </article>
    </LazyLoad>
    // </Observer>
  );
}
