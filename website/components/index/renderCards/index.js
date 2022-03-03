import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heading, Button, Icon } from 'next-pattern-library';

import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getCategory } from '~/lib/sanity/requests';

export default function Home({ siteConfig }) {
  const [news, setNews] = useState(null);
  const [insights, setInsights] = useState(null);
  const [premieres, setPremieres] = useState(null);
  const [guestMixes, setGuestMixes] = useState(null);

  const [newsLength, setNewsLength] = useState(6);
  const [insightsLength, setInsightsLength] = useState(6);
  const [premieresLength, setPremieresLength] = useState(4);
  const [guestMixesLength, setGuestMixesLength] = useState(4);

  // Render remaining content
  useEffect(() => {
    const action = async () => {
      const newsRes = await getCategory('news', [1, 6]);
      const insightsRes = await getCategory('insights', [1, 6]);
      const premieresRes = await getCategory('premieres', [1, 4]);
      const guestMixesRes = await getCategory('guest-mix', [1, 4]);

      setNews(newsRes);
      setInsights(insightsRes);
      setPremieres(premieresRes);
      setGuestMixes(guestMixesRes);
    };

    action();
  }, []);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <Container>
        <div className="flex  flex-wrap">
          <div className="col-24">
            <section className="pb5">
              <div className="pb4  ph3">
                <div className="bg-black  pa2  dib">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Premieres"
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="flex  flex-wrap">
                {[...Array(premieresLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={premieres?.articles && premieres?.articles[i]}
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
                  text="All Premieres"
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
                      as: `/category/premieres`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex  flex-wrap">
          <div className="col-24  col-12-md  pr0  pr3-md">
            <section className="pb5">
              <div className="pb4  ph3">
                <div className="bg-black  pa2  dib">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="News"
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
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
                  text="All News"
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
              <div className="pb4  ph3">
                <div className="bg-black  pa2  dib">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Insights"
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
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
                  text="All Insights"
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

      <Container>
        <div className="flex  flex-wrap">
          <div className="col-24">
            <section className="pb5  pb6-md">
              <div className="pb4  ph3">
                <div className="bg-black  pa2  dib">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Guest Mixes"
                    color="white"
                    size="small"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="flex  flex-wrap">
                {[...Array(guestMixesLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={guestMixes?.articles && guestMixes?.articles[i]}
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
                  text="All Guest Mixes"
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
                      as: `/category/guest-mix`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
