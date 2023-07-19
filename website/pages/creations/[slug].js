import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import Heading from '~/components/elements/heading';
import Hero from '~/components/hero/creations';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';

import Date from '~/components/date';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
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

  if (!router.isFallback && post?.slug) {
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

      if (!user?.isDominion && !preview) {
        return (
          <div className="relative  br4  shadow2  bg-light-grey  pa3  pa4-md  mt5  col-20  col-12-md  mla  mra">
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
          <div className="pt5  pt6-md  ph3  ph0-md">
            <div className="pt4  pt0-md">
              <div className="relative">
                <Hero
                  image={post?.coverImage}
                  title={null}
                  description={null}
                  heroButtonText={null}
                  link={null}
                  marginTop={0}
                  marginBottom={0}
                  modifier="creations"
                  skeleton={!post}
                />

                <div className="creations__label-wrapper">
                  <span className="t-primary  f7  bold  pa2  black  bg-light-grey">
                    DOMINION: CREATIONS
                  </span>
                </div>
              </div>
            </div>
          </div>

          <article className="pt5  pb4">
            <section>
              <div className="flex  flex-wrap">
                <div className="col-6" />

                <div className="col-24  col-18-md">
                  <div className="ph4  ph0-md  pb3  col-18  relative">
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

                    <p className="t-secondary  f6  white  lh-copy  pt4  pb3">
                      {post.authors.map((i) => (
                        <>
                          <Link
                            href={`/team/${i.author.slug.current}`}
                            legacyBehavior
                          >
                            <span className="cp  white  fw7">
                              {i.author.name}
                            </span>
                          </Link>
                          {' | '}
                        </>
                      ))}

                      {post?.publishedAt && (
                        <Date dateString={post.publishedAt} />
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {renderPublicSections()}
              {renderSections()}

              <div className="pb4  mb2">
                <SocialLinks article={post} />
              </div>
            </section>
          </article>

          <Container>
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
  const data = await getCreation(params.slug, preview);

  // if (!data?.slug) {
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
  const data = await getAllCreationsTotal();

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
