import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import toMarkdown from '@sanity/block-content-to-markdown';
import dynamic from 'next/dynamic';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import BlockContent from '@sanity/block-content-to-react';
import { usePlausible } from 'next-plausible';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import SocialLinks from '~/components/article/social-links';
import Image from '~/components/elements/image';
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
const Modal = dynamic(() => import('~/components/modal'));

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
  const [modalActive, setModalActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const plausible = usePlausible();
  const arrowRight = <IconArrowRight color="white" size={12} />;

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  // console.log('post', post);

  const triggerOnDownloadEvt = ({ filename, res }) => {
    plausible('Image Download', {
      props: {
        action: 'download',
        label: `${filename} (${res})`,
      },
    });
  };

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
          size="x-large"
          active={modalActive}
        >
          {selectedImage && (
            <div className="flex  flex-wrap">
              <div className="col-24  col-14-md  flex  justify-center  align-center  pb4  pb0-md">
                <Image
                  src={imageBuilder
                    .image(selectedImage.asset)
                    .height(1080)
                    .width(1080)
                    .auto('format')
                    .fit('clip')
                    .url()}
                  placeholder={imageBuilder
                    .image(selectedImage.asset)
                    .height(25)
                    .width(25)
                    .auto('format')
                    .fit('clip')
                    .blur('20')
                    .url()}
                  alt={null}
                  figcaption={null}
                  height={app.deviceSize === 'md' ? 300 : 600}
                  width={null}
                  customClass="br3"
                  skeleton={false}
                  onClick={null}
                />
              </div>
              <div className="col-24  col-10-md  flex  justify-start  align-center  pv3  ph4">
                <div className="col-24">
                  {selectedImage?.caption && (
                    <div className="rich-text  measure-wide  mb4">
                      <BlockContent
                        blocks={selectedImage?.caption}
                        serializers={SANITY_BLOCK_SERIALIZERS}
                      />
                    </div>
                  )}

                  <div className="mb3">
                    <p className="t-primary  f3  lh-title  white">Download</p>
                  </div>

                  <div className="mb3">
                    <a
                      href={`${imageBuilder
                        .image(selectedImage.asset)
                        .height(1080)
                        .width(1080)
                        .auto('format')
                        .fit('clip')
                        .url()}&dl=`}
                      target="_external"
                      className="cp  w-100"
                      onClick={() => {
                        triggerOnDownloadEvt({
                          filename: selectedImage?.fileName,
                          res: 'Low-res',
                        });
                      }}
                    >
                      <Button
                        /* Options */
                        type="primary"
                        size="medium"
                        text="Low-res"
                        color="black"
                        fluid={true}
                        icon={<IconDownload color="white" size={16} />}
                        iconFloat="left"
                        inverted={false}
                        loading={false}
                        disabled={false}
                        skeleton={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </a>
                  </div>

                  <div className="mb3">
                    <a
                      href={
                        user &&
                        selectedImage?.allowHighResDl &&
                        `${imageBuilder.image(selectedImage.asset).url()}?dl=`
                      }
                      target="_external"
                      className={`${
                        user && selectedImage?.allowHighResDl
                          ? 'cp  w-100'
                          : 'w-100'
                      }`}
                      onClick={() => {
                        // user &&
                        //   selectedImage?.allowHighResDl &&
                        //   triggerOnDownloadEvt({
                        //     filename: selectedImage?.fileName,
                        //     res: 'High-res',
                        //   });
                      }}
                    >
                      <Button
                        /* Options */
                        type="primary"
                        size="medium"
                        text="High-res (Coming soon)"
                        color="black"
                        fluid={true}
                        icon={<IconDownload color="white" size={16} />}
                        iconFloat="left"
                        inverted={false}
                        loading={false}
                        // disabled={!user || !selectedImage?.allowHighResDl}
                        disabled={true}
                        skeleton={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </a>
                  </div>

                  {
                    //  {!selectedImage?.allowHighResDl && (
                    //   <div className="mb3">
                    //     <p className="t-secondary  f6  lh-copy  tal  white">
                    //       High-resolution downloads of this specific artwork are
                    //       not available in order to honor the intellectual
                    //       property of the artist.
                    //     </p>
                    //   </div>
                    // )}
                    // {!user && (
                    //   <div className="mb3">
                    //     <p className="t-secondary  f6  lh-copy  tal  rendah-red">
                    //       High-res downloads of certain artworks—where approved by
                    //       the artist—are available exclusively to the Dominion
                    //       Subscription. To access, please{' '}
                    //       <a className="rendah-red  underline" href="/login">
                    //         log in
                    //       </a>{' '}
                    //       or{' '}
                    //       <a className="rendah-red  underline" href="/dominion">
                    //         sign up
                    //       </a>
                    //       .
                    //     </p>
                    //   </div>
                    // )}
                  }

                  <div className="">
                    <Button
                      /* Options */
                      type="primary"
                      size="small"
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
                        setModalActive(false);

                        setTimeout(() => {
                          setSelectedImage(null);
                        }, 300);
                      }}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

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
                  <Image
                    src={imageBuilder
                      .image(post?.coverImage)
                      .auto('format')
                      .fit('clip')
                      .url()}
                    placeholder={imageBuilder
                      .image(post?.coverImage)
                      .height(25)
                      .width(25)
                      .auto('format')
                      .fit('clip')
                      .blur('20')
                      .url()}
                    alt={null}
                    figcaption={null}
                    height={null}
                    width={null}
                    customClass=""
                    skeleton={false}
                    onClick={null}
                  />
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
                    className="card__gallery  col-8  col-6-md  pa2  relative  flex  align-center  jsutify-center"
                    key={i}
                  >
                    <div className="card__gallery__image  w-100  h-100">
                      <LazyLoad once offset={250} height={300}>
                        <Image
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
                          height={null}
                          width={null}
                          customClass="cp"
                          skeleton={false}
                          onClick={() => {
                            setSelectedImage(image);
                            setModalActive(true);
                          }}
                          withLinkProps={null}
                        />
                      </LazyLoad>
                    </div>

                    <div className="card__gallery__title  white  f6  f4-md  lh-title  cp  t-primary  absolute  left  right  mla  mra  tac  flex  align-center  justify-center">
                      <p className="ph3  ph5-md">
                        Preview
                        <span className="pl2  dib">{arrowRight}</span>
                      </p>
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

          {post?.socialHandles && (
            <Container>
              <div className="measure-wide  mla  mra  pb2  pb3-md  mb5">
                <SocialLinks article={post} />
              </div>
            </Container>
          )}
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
