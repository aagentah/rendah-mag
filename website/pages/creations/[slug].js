import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import map from 'lodash/map';
import Cookies from 'js-cookie';
import { parseISO, format } from 'date-fns';
import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import HeroCreations from '~/components/hero/creations';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';
import SubscribeForm from '~/components/subscribe-form';

import Date from '~/components/date';
import CardBlog from '~/components/card/blog';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
  imageBuilder,
  getAllCreationsTotal,
  getCreation,
} from '~/lib/sanity/requests';

export default function Creations({ siteConfig, post, preview }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const { height, width } = useWindowDimensions();

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && post.slug) {
    const shouldShowAuthor = () => {
      if (typeof post?.showAuthor === 'boolean' && post?.showAuthor === false) {
        return false;
      }

      return true;
    };

    const renderPublicSections = () => {
      if (!post?.publicBody) return;

      return (
        <div className="rich-text">
          <Sections body={post.publicBody} />
        </div>
      );
    };

    const renderSections = () => {
      if (!post?.body) return;

      if (!user?.isDominion) {
        return (
          <div className="br4  shadow2  bg-light-grey  pa3  pa4-md  mt3">
            <div className="pb2">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Dominion exclusive"
                color="black"
                size="small"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <p className="t-body  f6  lh-copy  taj  black">
              This artilce is exclusive to the Dominion. To read the full
              article, please <a href="/login">log in</a> or{' '}
              <a href="/dominion">sign up</a>.
            </p>
          </div>
        );
      }

      return (
        <div className="rich-text">
          <Sections body={post.body} />
        </div>
      );
    };

    return (
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: post.title,
          description: post.excerpt,
          image: post.coverImage,
        }}
        preview={preview}
      >
        <div className="creations">
          <Container>
            <div className="pt5  pt6-md  ph3  ph0-md">
              <div className="pt4  pt0-md">
                <div className="relative">
                  <HeroCreations post={post} />

                  <div className="creations__label-wrapper">
                    <span className="t-title  f7  bold  pa2  black  bg-light-grey">
                      DOMINION: CREATIONS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <article className="pt5  pb4  ph3  ph4-md">
              <section className="measure-wide  mla  mra">
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

                <p className="t-secondary  f6  white  lh-copy  pb4">
                  {shouldShowAuthor() && (
                    <>
                      <Link href={`/team/${post.author.slug.current}`}>
                        <span className="cp  fw7">{post.author.name}</span>
                      </Link>{' '}
                      |{' '}
                    </>
                  )}

                  <time className="white" dateTime={post.publishedAt}>
                    {format(parseISO(post.publishedAt), 'LLLL	d, yyyy')}
                  </time>
                </p>

                {renderPublicSections()}
                {renderSections()}

                <div className="pb4  mb2">
                  <SocialLinks article={post} />
                </div>
              </section>

              {
                // {shouldShowAuthor() && (
                //   <section className="measure-wide  mla  mra">
                //     <div className="pb4">
                //       <Author author={post.author} />
                //     </div>
                //   </section>
                // )}
              }
            </article>
          </Container>
        </div>
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getCreation(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data || null,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllCreationsTotal();

  return {
    paths:
      data.map((creations) => ({
        params: {
          slug: creations.slug,
        },
      })) || [],
    fallback: true,
  };
}
