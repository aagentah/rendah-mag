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
import Hero from '~/components/hero/article';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';

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
} from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));
const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));
const Author = dynamic(() => import('~/components/article/author'));
const SocialLinks = dynamic(() => import('~/components/article/social-links'));
const CardBlog = dynamic(() => import('~/components/card/blog'));

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
    return (
      <Layout
        navOffset={null}
        navOnWhite={true}
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

        <div className="flex  flex-wrap">
          <div className="col-6" />

          <div className="col-24  col-18-md">
            <div className="ph4  ph0-md  pb3  pt6  col-18  hero--article__wrapper  relative">
              <Heading
                /* Options */
                htmlEntity="h1"
                text={post.title}
                color="black"
                size={app.deviceSize === 'md' ? 'large' : 'x-large'}
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

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
            />
          </div>
        </div>

        <article className="pt4  pb4">
          <div className="flex  flex-wrap  ph4  ph0-md">
            <div className="col-6" />
            <div className="col-24  col-12-md">
              <p className="t-secondary  f5  almost-black  lh-copy  pb4">
                <span className="t-secondary  f5  almost-black  lh-copy  dib  ba  bc-black  pa2  mr3  mb3  mb0-md">
                  {post.category}
                </span>

                <span className="db  dib-md">
                  {post.authors.map((i) => (
                    <>
                      Written by{' '}
                      <Link
                        href={`/team/${i.author.slug.current}`}
                        legacyBehavior
                      >
                        <span className="cp  black  fw7">{i.author.name}</span>
                      </Link>
                      {' on'}
                    </>
                  ))}
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

          <Sections body={post.body} />
        </article>

        <div className="mla  mra  pv5  mb4  bg-light-grey  ph4  ph0-md">
          <SocialLinks article={post} />
        </div>

        <Container>
          <section className="flex  flex-wrap  justify-center  align-center  pb3  pb4-md">
            {post.authors.map((i) => (
              <div className="col-24  col-12-md  pb4  pb3-md  ph3">
                <Author author={i.author} />
              </div>
            ))}
          </section>

          {morePosts.length > 0 && (
            <section className="pb3">
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
