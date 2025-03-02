import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import toMarkdown from '@sanity/block-content-to-markdown';
import dynamic from 'next/dynamic';
import 'intersection-observer';
// import Observer from '@researchgate/react-intersection-observer';
import BlockContent from '@sanity/block-content-to-react';
import { usePlausible } from 'next-plausible';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import SocialLinks from '~/components/article/social-links';
import ImageNew from '~/components/elements/image-new';
import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import {
  getSiteConfig,
  getAllGalleryTotal,
  getGallery,
  imageBuilder,
} from '~/lib/sanity/requests';

const CardBlog = dynamic(() => import('~/components/card/blog'));

const IconDownload = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconDownload)
);

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

export default function Gallery({ siteConfig, post, morePosts, preview }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const observer = { onChange: () => null, rootMargin: '0% 0% -30% 0%' };
  const plausible = usePlausible();

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  const triggerOnDownloadEvt = ({ filename, res }) => {
    plausible('Image Download', {
      props: {
        action: 'download',
        label: `${filename} (${res})`,
      },
    });
  };

  console.log('galleryImages', post?.galleryImages);

  if (!router.isFallback && post?.slug) {
    return (
      <div className="creations">
        <Layout
          navOffset="top"
          navOnWhite={false}
          hasNav
          hasFooter
          darkMode
          meta={{
            siteConfig,
            title: post.title,
            description: toMarkdown(post.introduction),
            image: post.coverImage,
          }}
          preview={preview}
        >
          <div className="creations  pt5">
            <Container>
              <div className="mb5">
                <Link legacyBehavior href="/gallery">
                  <a className="white  df">
                    <IconArrowLeft color="#ffffff" size={12} />
                    <span className="pl2">Back to Gallery</span>
                  </a>
                </Link>

                <div className="flex  flex-wrap  mt4">
                  <div className="col-24  col-8-md  pb4  pb0-md">
                    <ImageNew imageObject={post?.imageObject} />
                  </div>

                  <div className="col-24  col-16-md  ph3  ph4-md">
                    <div className="mb3">
                      <Heading
                        /* Options */
                        htmlEntity="h1"
                        text={`${post.title}`}
                        color="white"
                        size={app.deviceSize === 'md' ? 'large' : 'x-large'}
                        truncate={null}
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="rich-text  rich-text--gallery  white">
                      <BlockContent
                        blocks={post.introduction}
                        serializers={SANITY_BLOCK_SERIALIZERS}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <div className="flex flex-wrap  pb5">
              {post?.galleryImages?.length &&
                post?.galleryImages
                  .slice()
                  .reverse()
                  .map((image, i) => (
                    <div
                      className="card__gallery  col-12  col-6-md  pa2  relative  flex  align-center  jsutify-center"
                      key={i}
                    >
                      <div className="card__gallery__image  w-100  h-100">
                        <LazyLoad once offset={250} height={300}>
                          {/* <Image
                          src={imageBuilder
                            .image(image)
                            .height(800)
                            .width(800)
                            .auto('format')
                            .fit('clip')
                            .url()}
                          placeholder={imageBuilder
                            .image(image)
                            .height(25)
                            .width(25)
                            .auto('format')
                            .fit('clip')
                            .blur('20')
                            .url()}
                          alt={image.alt || ''}
                          figcaption={null}
                          height={300}
                          width={800}
                          customClass="cp"
                          skeleton={false}
                        
                          withLinkProps={null}
                        /> */}

                          <ImageNew
                            imageObject={image.imageObject}
                            height={app.deviceSize === 'md' ? 200 : 300}
                            isExpandable
                          />
                        </LazyLoad>
                      </div>
                    </div>
                  ))}
            </div>

            {morePosts.length > 0 && (
              <Container>
                <section className="pv5">
                  <div className="pb3  ph3">
                    <Heading
                      /* Options */
                      htmlEntity="p"
                      text={`Articles relating to ${post.title}`}
                      color="white"
                      size="large"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {morePosts.map((p, i) => (
                      // <Observer {...observer}>
                      <div key={p.slug} className="col-24  col-8-md">
                        <div className="pa3">
                          <CardBlog i={i} post={p} />
                        </div>
                      </div>
                      // </Observer>
                    ))}
                  </div>
                </section>
              </Container>
            )}

            {post?.socialHandles && (
              <Container>
                <div className="measure-wide  mla  mra  pb2  pb3-md  mb5">
                  <SocialLinks article={post} />
                </div>
              </Container>
            )}
          </div>
        </Layout>
      </div>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getGallery(params.slug, preview);

  // if (!data?.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 10,
  //   };
  // }

  // console.log('data', data);

  return {
    props: {
      siteConfig,
      preview,
      post: data?.gallery || null,
      morePosts: data?.morePosts || null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const data = await getAllGalleryTotal();

  return {
    paths:
      data.map((gallery) => ({
        params: {
          slug: gallery.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
