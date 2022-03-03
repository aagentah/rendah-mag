import { useEffect, useState } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

import { Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/home';
import CardBlog from '~/components/card/blog';

import {
  getSiteConfig,
  getFeaturedPost,
  getCategory,
} from '~/lib/sanity/requests';

const RenderCards = dynamic(() => import('~/components/index/renderCards'));

export default function Home({ siteConfig }) {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [interviews, setInterviews] = useState(null);

  const [interviewsLength, setInterviewsLength] = useState(4);

  // Render featured post first
  useEffect(() => {
    const action = async () => {
      const featuredPostRes = await getFeaturedPost();
      const interviewsRes = await getCategory('interviews', [1, 4]);

      setFeaturedPost(featuredPostRes);
      setInterviews(interviewsRes);
    };

    action();
  }, []);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Home',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <Hero
          image={featuredPost?.coverImage}
          title={featuredPost?.title || 'Loading...'}
          description={null}
          heroButtonText="Read more"
          link={`/article/${featuredPost?.slug}`}
          marginTop={0}
          marginBottom={0}
          modifier="home"
          skeleton={!featuredPost}
        />

        <div className="pt5  pt6-md">
          <Container>
            <section className="pb5">
              <div className="pb4  ph3">
                <div className="bg-black  pa2  dib">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Interviews"
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="flex  flex-wrap">
                {[...Array(interviewsLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-12-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={interviews?.articles && interviews?.articles[i]}
                        columnCount={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  justify-end  pr2">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="All Interviews"
                  color="black"
                  fluid={false}
                  icon={buttonIcon}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/category/[slug]',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      as: `/category/interviews`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          </Container>

          <LazyLoad once offset={800} height={800}>
            <RenderCards />
          </LazyLoad>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
