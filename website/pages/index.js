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
  getLatestFeaturedPost,
  getCategory,
} from '~/lib/sanity/requests';

export default function Home({ siteConfig }) {
  const [latestFeaturedPost, setLatestFeaturedPost] = useState(null);
  const [latestInterviews, setLatestInterviews] = useState(null);
  const [latestNews, setLatestNews] = useState(null);
  const [latestInsights, setLatestInsights] = useState(null);

  const interviewsLenth = 4;
  const newsLength = 6;
  const insightsLength = 6;

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const handleAsyncTasks = async () => {
    setLatestFeaturedPost(await getLatestFeaturedPost());
    setLatestInterviews(
      await getCategory('interviews', [0, interviewsLenth - 1])
    );
    setLatestNews(await getCategory('news', [0, newsLength - 1]));
    setLatestInsights(await getCategory('insights', [0, insightsLength - 1]));
  };

  useEffect(() => {
    //
    handleAsyncTasks();
  }, []);

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
        <HeroHome post={latestFeaturedPost} />

        <div className="pt5  pt6-md">
          <Container>
            <section className="pb5">
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text="Latest interviews."
                  color="black"
                  size="medium"
                  truncate={null}
                  reveal={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {[...Array(interviewsLenth)].map((post, i) => (
                  <div key={post?.slug || post} className="col-24  col-12-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={
                          latestInterviews?.articles &&
                          latestInterviews?.articles[i]
                        }
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
                  text="More Interviews"
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
                      text="Latest news."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {[...Array(newsLength)].map((post, i) => (
                      <div
                        key={post?.slug || post}
                        className="col-24  col-12-md"
                      >
                        <div className="ph3  pv2">
                          <CardBlog
                            i={i}
                            post={
                              latestNews?.articles && latestNews?.articles[i]
                            }
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
                      text="More News"
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
                      text="Latest Insights."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {[...Array(insightsLength)].map((post, i) => (
                      <div
                        key={post?.slug || post}
                        className="col-24  col-12-md"
                      >
                        <div className="ph3  pv2">
                          <CardBlog
                            i={i}
                            post={
                              latestInsights?.articles &&
                              latestInsights?.articles[i]
                            }
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
                      text="More Insights"
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
