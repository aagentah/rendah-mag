import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import isArray from 'lodash/isArray';
import Cookies from 'js-cookie';
import BlockContent from '@sanity/block-content-to-react';
import toMarkdown from '@sanity/block-content-to-markdown';
import markdownToTxt from 'markdown-to-txt';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Image from '~/components/elements/image';
import Hero from '~/components/hero/article';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SubscriptionBanner from '~/components/subscription-banner';

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
        <figcaption className="absolute  bottom  right  caption  caption--hero  bg-black  ph2  ph3-md  pv2  mr3  nb2">
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
    console.log('post', post);
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
        navOffset={null}
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
        <Modal
          /* Options */
          size="small"
          active={modalActive}
        >
          <div className="pb2  mb2">
            <Heading
              /* Options */
              htmlEntity="p"
              text="You made it to the bottom"
              color="black"
              size="medium"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb2">
            <Copy
              /* Options */
              text="Can we add you to our Mailing List? We usually only send a few emails each month, and keep the content relevant as ever."
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb3  mb2">
            <SubscribeForm onSuccess={() => setModalActive(false)} />
          </div>
          <div className="flex  flex-wrap  pb2">
            <div className="col-24  flex  justify-center  align-center">
              <Button
                /* Options */
                type="secondary"
                size="medium"
                text="No thanks"
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
                }}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

        <div className="mb4">
          <Hero
            image={post?.coverImage}
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

        <article className="pt4  pb4">
          {post.tag && (
            <>
              <div className="flex  flex-wrap  mb4  pb3">
                <div className="col-6" />
                <div className="col-24 col-12-md br4 shadow2 pa3 relative pt4">
                  <div className="t-primary bg-white ba bc-black black absolute dib pa2 top left ml3 nt3">
                    This article has a linked Gallery page
                  </div>

                  <div className="flex  flex-wrap  pv2">
                    {post?.tag?.galleryImages.slice(0, 10).map((image, i) => {
                      const opacityClass = `o-${100 - i * 10}`;
                      return (
                        <div
                          className={`col-2  ph1  br3 ${opacityClass}`}
                          key={i}
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
                            figcaption={image.caption || null}
                            height={null}
                            width={null}
                            customClass="br3"
                            skeleton={false}
                            onClick={null}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="absolute top right pt2  mt4 nr3">
                    <div className="cp pa1 bw1 ba br-100 bg-white  bc-rendah-red">
                      <Link
                        href={`/gallery/${post.tag.slug.current}`}
                        legacyBehavior
                      >
                        <span className="cp rendah-red">
                          <IconArrowRight color="#e9393f" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex  flex-wrap  ph4  ph0-md">
            <div className="col-6" />
            <div className="col-24  col-12-md">
              <div className="mb4">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={post.title}
                  color="rendah-red"
                  size={app.deviceSize === 'md' ? 'large' : 'x-large'}
                  truncate={null}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f5  almost-black  lh-copy  pb4">
                {post?.categories?.length &&
                  post?.categories.map((i) => (
                    <span className="t-secondary  f5  almost-black  lh-copy  dib  ba  bc-black  pa2  mr3  mb3  mb0-md">
                      {i}
                    </span>
                  ))}

                <span className="db  dib-md">
                  Written by{' '}
                  {post.authors.map((i, index, array) => {
                    let separator = '';
                    if (index > 0) {
                      if (index === array.length - 1) {
                        separator = ' & ';
                      } else {
                        separator = ', ';
                      }
                    }
                    return (
                      <>
                        {separator}
                        <Link
                          href={`/team/${i.author.slug.current}`}
                          legacyBehavior
                        >
                          <span className="cp  black  fw7">
                            {i.author.name}
                          </span>
                        </Link>
                      </>
                    );
                  })}
                  {' on'}
                </span>

                <span className="pl0  pl1-md">
                  {post?.publishedAt && <Date dateString={post.publishedAt} />}
                </span>
              </p>
            </div>
            <div className="col-6" />
          </div>

          <div className="flex  flex-wrap">
            <div className="col-6" />
            <div className="col-24  col-12-md">
              <div className="f5  f4-md  lh-copy  pb3  mb4  bb  bw1  bc-rendah-red  rich-text  ph4  ph0-md">
                <BlockContent
                  blocks={post.introduction}
                  serializers={SANITY_BLOCK_SERIALIZERS}
                />
              </div>
            </div>
            <div className="col-6" />
          </div>

          {canShowBody ? (
            <Sections body={post.body} />
          ) : (
            <div className="relative  br4  shadow2  bg-light-grey  pa3  pa4-md  mt4  mb4  col-20  col-12-md  mla  mra">
              <div className="absolute  pa2  w4  top  left  right  mla  mra  nt3  bg-light-grey  br4  shadow2">
                <img
                  /* Options */
                  src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617575443/dominion/dominion-logo-transparent.png"
                  alt="Dominion"
                />
              </div>

              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text="Hold up!"
                  color="black"
                  size="medium"
                  truncate={null}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f6  lh-copy  taj  black">
                This article is exclusive to the Dominion. To read the full
                article, please{' '}
                <a className="underline" href="/login">
                  log in
                </a>{' '}
                or{' '}
                <a className="underline" href="/dominion">
                  sign up
                </a>
                .
              </p>
            </div>
          )}
        </article>

        <div className="mla  mra  pt5  pb6  bg-light-grey  ph4  ph0-md  nb6">
          <div className="pb6  nb4">
            <SocialLinks article={post} />
          </div>
        </div>

        <Container>
          <section className="flex  flex-wrap  justify-center  align-center">
            {post.authors.map((i) => (
              <div className="col-24  col-12-md  pb4  pb3-md  ph3">
                <Author author={i.author} />
              </div>
            ))}
          </section>

          <SubscriptionBanner />

          {morePosts.length > 0 && (
            <section className="pb6">
              <div className="pb3  ph3">
                <div className="bg-black  pa2  dib">
                  <Heading
                    /* Options */
                    htmlEntity="p"
                    text="More Posts"
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="flex  flex-wrap">
                {morePosts.map((p, i) => (
                  <Observer {...observer}>
                    <div key={p.slug} className="col-24  col-6-md">
                      <div className="pa3">
                        <CardBlog i={i} post={p} />
                      </div>
                    </div>
                  </Observer>
                ))}
              </div>
            </section>
          )}
        </Container>
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getPost(params.slug, preview);

  // if (!data?.post?.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 10,
  //   };
  // }

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
