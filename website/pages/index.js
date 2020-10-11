import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroHome from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardProduct from '~/components/card/product';

import getSiteConfigCookies from '~/lib/get-site-config-cookies';
import {
  getSiteConfig,
  getFeaturedPost,
  getCategory,
} from '~/lib/sanity/requests';

export default function Home({ siteConfig }) {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [news, setNews] = useState(null);
  const [insights, setInsights] = useState(null);
  const interviewsLenth = 3;
  const newsLength = 5;
  const insightsLength = 5;

  const handleAsyncTasks = async () => {
    setFeaturedPost(await getFeaturedPost());
    setInterviews(await getCategory('interviews', [0, interviewsLenth]));
    setNews(await getCategory('news', [0, newsLength]));
    setInsights(await getCategory('insights', [0, insightsLength]));
  };

  useEffect(() => {
    handleAsyncTasks();
  }, []);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        meta={{
          siteConfig,
          title: 'Home',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <HeroHome post={featuredPost} />

        <div className="pt5  pt6-md">
          <Container>
            <section className="pb5">
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text=" interviews."
                  color="black"
                  size="medium"
                  truncate={null}
                  reveal={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {[...Array(interviewsLenth + 1)].map((post, i) => (
                  <div key={post?.slug || post} className="col-24  col-12-md">
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
                  text="More interviews"
                  color="black"
                  fluid={false}
                  icon={buttonIcon}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
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

            <div className="flex  flex-wrap">
              <div className="col-24  col-12-md  pr0  pr3-md">
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h2"
                      text=" news."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {[...Array(newsLength + 1)].map((post, i) => (
                      <div
                        key={post?.slug || post}
                        className="col-24  col-12-md"
                      >
                        <div className="ph3  pv2">
                          <CardBlog
                            i={i}
                            post={news?.articles && news?.articles[i]}
                            columnCount={4}
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
                      text="More news"
                      color="black"
                      fluid={false}
                      icon={buttonIcon}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/category/[slug]',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/news`,
                          scroll: false,
                        },
                      }}
                    />
                  </div>
                </section>
              </div>

              <div className="col-24  col-12-md  pl0  pl3-md">
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h2"
                      text=" insights."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {[...Array(insightsLength + 1)].map((post, i) => (
                      <div
                        key={post?.slug || post}
                        className="col-24  col-12-md"
                      >
                        <div className="ph3  pv2">
                          <CardBlog
                            i={i}
                            post={insights?.articles && insights?.articles[i]}
                            columnCount={4}
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
                      text="More insights"
                      color="black"
                      fluid={false}
                      icon={buttonIcon}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/category/[slug]',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/insights`,
                          scroll: false,
                        },
                      }}
                    />
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const cookies = req?.headers?.cookie;
  const siteConfig = getSiteConfigCookies(cookies) || (await getSiteConfig());

  return {
    props: {
      siteConfig,
    },
  };
}
