import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import { useEffect, useState } from 'react';
import filter from 'lodash/filter';
import dynamic from 'next/dynamic';

import { Heading, Copy, Label, Image } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { useUser } from '~/lib/hooks';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import {
  getSiteConfig,
  getTagAndPosts,
  getTags,
  imageBuilder,
} from '~/lib/sanity/requests';

const ImageModal = dynamic(() => import('~/components/gallery/image-modal'));

export default function Post({ siteConfig, tag }) {
  const [user, { loading, mutate, error }] = useUser();
  const router = useRouter();
  const [grid, setGrid] = useState(null);
  const [modalActive, setModalActive] = useState(null);
  const closeModal = () => setModalActive(false);

  if (!router.isFallback && !tag?.slug) {
    Router.push('/404');
  }

  useEffect(() => {
    if (tag?.type === 'visual-artist') {
      let component;
      const galleryPosts = filter(tag.posts, { _type: 'gallery' });
      const allGalleryImages = [];

      for (let i = 0; i < galleryPosts.length; i++) {
        for (let ii = 0; ii < galleryPosts[i].components.length; ii++) {
          component = galleryPosts[i].components[ii];
          allGalleryImages.push({
            ...component,
            postTitle: galleryPosts[i].title,
          });
        }
      }

      setGrid(allGalleryImages);
    }
  }, []);

  const renderImage = (item) => {
    let src;

    if (item.image?.dominionExclusive && !user?.isDominion) {
      src = imageBuilder
        .image(item.image)
        .width(300)
        .blur(80)
        .auto('format')
        .fit('clip')
        .url();
    } else {
      src = imageBuilder
        .image(item.image)
        .width(300)
        .auto('format')
        .fit('clip')
        .url();
    }

    return (
      <div key={item._key} className="col-24  col-6-md  pa2  mb3  mb0-md">
        <div className="relative">
          <Image
            /* Options */
            src={src}
            placeholder={null}
            alt={null}
            figcaption={null}
            height={300}
            width={null}
            customClass="cp"
            skeleton={null}
            onClick={() => setModalActive(item._key)}
            /* Children */
            withLinkProps={null}
          />

          {item.image?.dominionExclusive && (
            <div className="absolute  pa2  w4  bottom  left  right  mla  mra  nb3  bg-light-grey  br4  shadow2">
              <img
                /* Options */
                src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617575443/dominion/dominion-logo-transparent.png"
                alt="Dominion"
              />
            </div>
          )}
        </div>

        {modalActive === item._key && (
          <ImageModal
            modalActive={modalActive === item._key}
            closeModal={closeModal}
            postTitle={item.postTitle}
            component={item}
          />
        )}
      </div>
    );
  };

  if (!router.isFallback && tag?.slug) {
    return (
      <Layout
        navOffset="top"
        navOnWhite={tag?.type !== 'visual-artist'}
        hasNav
        hasFooter
        darkMode
        meta={{
          siteConfig,
          title: tag.name,
        }}
        preview={null}
      >
        <div className={tag?.type === 'visual-artist' ? 'creations' : ''}>
          <Container>
            {tag?.posts.length > 0 && (
              <section className="pb5  pb6-md">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text={tag.name}
                    color={tag?.type === 'visual-artist' ? 'white' : 'black'}
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />

                  {tag?.type && (
                    <Label
                      /* Options */
                      customClass={null}
                      text={tag.type}
                      color={tag?.type === 'visual-artist' ? 'black' : 'white'}
                      backgroundColor={
                        tag?.type === 'visual-artist' ? 'white' : 'black'
                      }
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  )}

                  {tag?.description?.length && (
                    <div className="rich-text  pb3  mb3  bb  bc-silver  pt4">
                      <BlockContent
                        blocks={tag.description}
                        serializers={SANITY_BLOCK_SERIALIZERS}
                      />
                    </div>
                  )}
                </div>

                {grid?.length && (
                  <>
                    <div className="pb4">
                      <Heading
                        /* Options */
                        htmlEntity="h2"
                        text="Individual Art"
                        color={
                          tag?.type === 'visual-artist' ? 'white' : 'black'
                        }
                        size="medium"
                        truncate={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="flex  flex-wrap  pb5">
                      {grid?.map((item, i) => renderImage(item))}
                    </div>
                  </>
                )}

                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text={
                      tag?.type === 'visual-artist'
                        ? 'Gallery Projects'
                        : 'Posts'
                    }
                    color={tag?.type === 'visual-artist' ? 'white' : 'black'}
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {tag?.posts.map((post, i) => (
                    <div key={post.slug} className="col-24  col-6-md">
                      <div className="ph3  pv2">
                        <CardBlog i={i} post={post} columnCount={4} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </Container>
        </div>
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const tag = await getTagAndPosts(params.slug);

  // if (!tag?.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 1,
  //   };
  // }

  return {
    props: {
      siteConfig,
      tag,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const tags = await getTags();

  return {
    paths:
      tags.map((tag) => ({
        params: {
          slug: tag.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
