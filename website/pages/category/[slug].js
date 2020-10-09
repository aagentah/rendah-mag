import Link from 'next/link';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroHome from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardProduct from '~/components/card/product';

import getSiteConfigCookies from '~/lib/get-site-config-cookies';
import { getSiteConfig, getLatestCategoryPosts } from '~/lib/sanity/requests';

export default function Category({ siteConfig, title, posts }) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={true}
        meta={{
          siteConfig,
          title: title,
          description: 'This is the Category page.',
          image: null,
        }}
        preview={null}
      >
        <div className="pt6">
          <Container>
            {posts.length > 0 && (
              <section className="pb5">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text={`${title}.`}
                    color="black"
                    size="medium"
                    truncate={null}
                    reveal={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {posts.map((post, i) => (
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
    </>
  );
}

export async function getServerSideProps({ req, params, preview = false }) {
  const cookies = req?.headers?.cookie;
  const siteConfig = getSiteConfigCookies(cookies) || (await getSiteConfig());
  const latestCategory = await getLatestCategoryPosts(params.slug, [0, 99]);
  const title = latestCategory.title;
  const posts = latestCategory.articles;

  return {
    props: {
      siteConfig,
      title,
      posts,
    },
  };
}
