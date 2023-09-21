import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import toMarkdown from '@sanity/block-content-to-markdown';
import dynamic from 'next/dynamic';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import SocialLinks from '~/components/article/social-links';
import Image from '~/components/elements/image';
import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';

import GalleryBanner from '~/components/gallery/banner';
import GalleryImageText from '~/components/gallery/image-text';

import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
  getAllGalleryTotal,
  getGallery,
  imageBuilder,
} from '~/lib/sanity/requests';

const CardBlog = dynamic(() => import('~/components/card/blog'));
const Modal = dynamic(() => import('~/components/modal'));

export default function Gallery({ siteConfig, post, morePosts, preview }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const { height, width } = useWindowDimensions();
  const observer = { onChange: () => null, rootMargin: '0% 0% -30% 0%' };
  const [modalActive, setModalActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);

  const renderComponent = (component) => {
    if (component._type === 'galleryBanner') {
      return <GalleryBanner post={post} component={component} />;
    }

    if (component._type === 'galleryTextImage') {
      return <GalleryImageText post={post} component={component} />;
    }

    return false;
  };

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && post?.slug) {
    return (
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
        <Modal
          /* Options */
          size="large"
          active={modalActive}
        >
          <div className="flex  flex-wrap  pb2">
            <div className="col-24  pb3">
              <Image
                src={
                  selectedImage &&
                  imageBuilder
                    .image(selectedImage)
                    .auto('format')
                    .fit('clip')
                    .url()
                }
                placeholder={
                  selectedImage &&
                  imageBuilder
                    .image(selectedImage)
                    .height(25)
                    .width(25)
                    .auto('format')
                    .fit('clip')
                    .blur('20')
                    .url()
                }
                alt={null}
                figcaption={null}
                height={500}
                width="w-100"
                customClass=""
                skeleton={false}
                onClick={null}
              />
            </div>
            <div className="col-24  flex  justify-center  align-center">
              <Button
                /* Options */
                type="primary"
                size="medium"
                text="Close"
                color="black"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={() => {
                  setSelectedImage(null);
                  setModalActive(false);
                }}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

        <div className="creations">
          <Container>
            <div className="mb5">
              <div className="mb4">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={post.title}
                  color="white"
                  size={app.deviceSize === 'md' ? 'large' : 'x-large'}
                  truncate={null}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="rich-text  white">
                {toMarkdown(post.introduction)}
              </div>
            </div>
          </Container>

          <div className="flex flex-wrap  mb5  pb4">
            {post?.galleryImages.map((image, i) => (
              <div className="col-6" key={i}>
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
                  figcaption={image.caption || null}
                  height={null}
                  width={null}
                  customClass="cp"
                  skeleton={false}
                  onClick={() => {
                    setSelectedImage(image.asset);
                    setModalActive(true);
                  }}
                />
              </div>
            ))}
          </div>

          {morePosts.length > 0 && (
            <Container>
              <section className="pb5">
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
                    <Observer {...observer}>
                      <div key={p.slug} className="col-24  col-8-md">
                        <div className="pa3">
                          <CardBlog i={i} post={p} />
                        </div>
                      </div>
                    </Observer>
                  ))}
                </div>
              </section>
            </Container>
          )}

          <Container>
            <div className="measure-wide  mla  mra  pb2  pb3-md  mb5">
              <SocialLinks article={post} />
            </div>
          </Container>
        </div>
      </Layout>
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

  console.log('data', data);

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
