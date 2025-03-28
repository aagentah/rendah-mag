import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import 'intersection-observer';
// import Observer from '@researchgate/react-intersection-observer';
import isArray from 'lodash/isArray';
import Cookies from 'js-cookie';
import BlockContent from '@sanity/block-content-to-react';
import toMarkdown from '@sanity/block-content-to-markdown';
import markdownToTxt from 'markdown-to-txt';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Image from '~/components/elements/image';
import Hero from '~/components/hero/article';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SubscriptionBanner from '~/components/subscription-banner';
import LatestPrint from '~/components/latest-print';
import Table from '~/components/table';

import Date from '~/components/date';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import {
  getSiteConfig,
  getAllPostsTotal,
  getPost,
  getMorePosts,
  imageBuilder,
} from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));
const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));
const Author = dynamic(() => import('~/components/article/author'));
const SocialLinks = dynamic(() => import('~/components/article/social-links'));
const CardBlog = dynamic(() => import('~/components/card/blog'));

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Post({ siteConfig, post, preview }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const { height, width } = useWindowDimensions();
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [morePosts, setMorePosts] = useState([]);

  useEffect(() => {
    const action = async () => {
      const morePostsRes = await getMorePosts(post?.slug);
      setMorePosts(morePostsRes);
    };

    action();
  }, []);

  useEffect(() => {
    fetch('/api/discord/get-latest-articles', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const renderCaption = () => {
    if (isArray(post?.image?.caption)) {
      return (
        <figcaption className="absolute bottom-0 right-0 bg-black px-2 md:px-3 py-2 mr-3 mb-2">
          <BlockContent
            blocks={post.image.caption}
            serializers={SANITY_BLOCK_SERIALIZERS}
          />
        </figcaption>
      );
    }
  };

  const handleIntersect = (event) => {
    if (
      event.isIntersecting &&
      !user &&
      !hasShownModal &&
      !Cookies.get('rndh-newsletter-set')
    ) {
      setHasShownModal(true);
      setModalActive(true);
      Cookies.set('rndh-newsletter-set', true, { expires: 5 });
    }
  };

  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && post?.slug) {
    let canShowBody = true;

    if (
      post?.categories?.length &&
      post?.categories.includes('Dominion Exclusive') &&
      !user?.isDominion
    ) {
      canShowBody = false;
    }

    return (
      <Layout
        navOffset="top"
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: post.title,
          description: markdownToTxt(toMarkdown(post.introduction)),
          image: post.coverImage,
        }}
        preview={preview}
      >
        <Modal size="small" active={modalActive}>
          <div className="pb-2 mb-2">
            <Heading
              htmlEntity="p"
              text="You made it to the bottom"
              color="neutral-300"
              size="medium"
              truncate={0}
              onClick={null}
              withLinkProps={null}
            />
          </div>
          <div className="pb-2">
            <Copy
              text="Can we add you to our Newsletter? We usually only send a few emails each month, and keep the content relevant as ever."
              color="neutral-400"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb-3 mb-2">
            <SubscribeForm
              type="modal"
              onSuccess={() => setModalActive(false)}
            />
          </div>
          <div className="flex flex-wrap pb-2">
            <div className="w-full flex justify-center items-center">
              <Button
                type="secondary"
                size="medium"
                text="No thanks"
                color="text-neutral-400"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={() => {
                  setModalActive(false);
                }}
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

        <article className="pt-4 pb-4">
          {post.tag && (
            <>
              <div className="flex flex-wrap mb-4 pb-3 px-4 md:px-0">
                <div className="w-1/4" />
                <div className="w-full md:w-1/2 rounded-lg shadow-md p-3 relative pt-4">
                  <div className="text-blue-500 bg-white border border-black text-black absolute p-2 top-0 left-0 ml-3 -mt-3">
                    This article has a linked Gallery page
                  </div>

                  <div className="flex flex-wrap py-2">
                    {post?.tag?.galleryImages.slice(0, 10).map((image, i) => {
                      // Tailwind opacity classes: opacity-100, opacity-90, etc.
                      const opacityValue = 100 - i * 10;
                      return (
                        <div
                          key={i}
                          className={`w-1/12 px-1 rounded-md opacity-${opacityValue}`}
                        >
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
                            height={null}
                            width={null}
                            customClass="rounded-md"
                            skeleton={false}
                            onClick={null}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="absolute top-0 right-0 pt-2 mt-3 md:mt-4 -mr-3">
                    <div className="cursor-pointer p-1 border rounded-full bg-white border-red-500">
                      <Link
                        href={`/gallery/${post.tag.slug.current}`}
                        legacyBehavior
                      >
                        <span className="cursor-pointer text-red-500">
                          <IconArrowRight color="#e9393f" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="container py-12 text-neutral-300 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 items-start">
              <div className="md:col-span-3">
                <div className="mb-4 pb-2 max-w-xl">
                  <h1 className="text-neutral-300 text-2xl">{post.title}</h1>
                </div>

                <div className="rich-text rich-text-spacing text-neutral-400 max-w-2xl">
                  <BlockContent
                    blocks={post.introduction}
                    serializers={SANITY_BLOCK_SERIALIZERS}
                  />
                </div>
              </div>

              <div className="md:col-span-1 grid">
                <Table
                  rows={[
                    {
                      left: <strong>Author(s)</strong>,
                      right: post.authors.map(
                        (i, index, array) => i.author.name
                      ),
                    },
                    {
                      left: <strong>Published</strong>,
                      right: <Date dateString={post.publishedAt} />,
                    },
                    {
                      left: <strong>Categories</strong>,
                      right:
                        post?.categories?.length &&
                        post?.categories.map((i) => i),
                    },
                    {
                      left: <strong>Member Exclusive</strong>,
                      right: (
                        <div>
                          <span className="opacity-50">TRUE</span>/
                          <span>FALSE</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="container py-12 text-neutral-300 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="md:col-span-3">
                <Hero
                  image={post?.coverImage}
                  imageObject={post?.imageObject}
                  title={post.title}
                  description={null}
                  heroButtonText={null}
                  link={null}
                  marginTop={0}
                  marginBottom={0}
                  modifier="article"
                  skeleton={!post}
                  caption={post?.coverImageCaption}
                  fullImage={post?.coverImageFullImage}
                />
              </div>
            </div>
          </div>

          <div className="container">
            <hr className="my-12 border border-neutral-700" />
          </div>

          {canShowBody ? (
            <Sections body={post.body} />
          ) : (
            <div className="relative rounded-lg shadow-md bg-gray-200 p-3 md:p-4 mt-4 mb-4 w-5/6 md:w-1/2 mx-auto">
              <div className="absolute p-2 w-16 top-0 left-0 right-0 mx-auto -mt-3 bg-gray-200 rounded-lg shadow-md">
                <img
                  src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617575443/dominion/dominion-logo-transparent.png"
                  alt="Dominion"
                />
              </div>

              <div className="pb-2">
                <Heading
                  htmlEntity="h1"
                  text="Hold up!"
                  color="black"
                  size="medium"
                  truncate={null}
                  onClick={null}
                  withLinkProps={null}
                />
              </div>

              <p className="text-gray-700 text-sm leading-relaxed text-justify text-black">
                This article is exclusive to the Dominion. To read the full
                article, please{' '}
                <a className="underline" href="/login">
                  log in
                </a>{' '}
                or{' '}
                <a className="underline" href="/membership">
                  sign up
                </a>
                .
              </p>
            </div>
          )}
        </article>

        <div className="mx-auto pt-5 px-4 md:px-0 mb-6">
          <div className="pb-6 mb-4">
            <SocialLinks article={post} />
          </div>
        </div>

        <div className="container">
          <hr className="my-12 border border-neutral-700" />
        </div>

        <SubscriptionBanner />

        <div className="container">
          <hr className="my-12 border border-neutral-700" />
        </div>

        {morePosts.length > 0 && (
          <section className="container pb-6">
            <h3 className="text-neutral-400 mb-12">Other features</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12">
              {morePosts.map((p, i) => (
                // <Observer {...observer} key={p.slug}>
                <div key={i}>
                  <CardBlog i={i} post={p} />
                </div>
                // </Observer>
              ))}
            </div>
          </section>
        )}

        <div className="container">
          <hr className="my-12 border border-neutral-700" />
        </div>

        <LazyLoad once offset={800} height={800}>
          <LatestPrint showDominionButton={true} />
        </LazyLoad>
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getPost(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data || null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const data = await getAllPostsTotal();

  return {
    paths:
      data.map((article) => ({
        params: {
          slug: article.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
