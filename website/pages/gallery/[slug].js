import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import map from 'lodash/map';
import Cookies from 'js-cookie';
import { parseISO, format } from 'date-fns';
import { Heading, Copy, Image, Label } from 'next-pattern-library';
import toMarkdown from '@sanity/block-content-to-markdown';

import Hero from '~/components/hero/creations';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';
import SubscribeForm from '~/components/subscribe-form';

import GalleryInfo from '~/components/gallery/info';
import GalleryBanner from '~/components/gallery/banner';
import GalleryImageText from '~/components/gallery/image-text';

import Date from '~/components/date';
import CardBlog from '~/components/card/blog';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
  imageBuilder,
  getAllGalleryTotal,
  getGallery,
} from '~/lib/sanity/requests';

export default function Gallery({ siteConfig, post, preview }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const { height, width } = useWindowDimensions();

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
        navOffset={null}
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
        <div className="creations">
          <div className="rich-text">
            <GalleryInfo post={post} />

            {post?.components?.length &&
              post.components.map((iteration, i) => renderComponent(iteration))}
          </div>

          <Container>
            <div className="measure-wide  mla  mra  pb2  pb3-md  mb2">
              <SocialLinks article={post} />
            </div>

            <section className="flex  flex-wrap  justify-center  align-center  pb3  pb4-md">
              {post.authors.map((i) => (
                <div className="col-24  col-12-md  pb4  pb3-md  ph3">
                  <Author author={i.author} />
                </div>
              ))}
            </section>
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
  //     revalidate: 1,
  //   };
  // }

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
  const data = await getAllGalleryTotal();

  return {
    paths:
      data.map((creations) => ({
        params: {
          slug: creations.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
