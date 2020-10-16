import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroHome from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardProduct from '~/components/card/product';

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
  const [interviewsLength, setInterviewsLength] = useState(4);
  const [newsLength, setNewsLength] = useState(6);
  const [insightsLength, setInsightsLength] = useState(6);

  const handleAsyncTasks = async () => {
    const featuredPostData = await getFeaturedPost();
    const interviewsData = await getCategory('interviews', [
      0,
      interviewsLength - 1,
    ]);
    const newsData = await getCategory('news', [0, newsLength - 1]);
    const insightsData = await getCategory('insights', [0, insightsLength - 1]);

    setFeaturedPost(featuredPostData);
    setInterviews(interviewsData);
    setNews(newsData);
    setInsights(insightsData);
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
                  text="Interviews."
                  color="black"
                  size="medium"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
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
                      text="News."
                      color="black"
                      size="medium"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {[...Array(newsLength)].map((iteration, i) => (
                      <div key={iteration} className="col-24  col-12-md">
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
                      text="Insights."
                      color="black"
                      size="medium"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {[...Array(insightsLength)].map((iteration, i) => (
                      <div key={iteration} className="col-24  col-12-md">
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
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
