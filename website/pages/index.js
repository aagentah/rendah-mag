import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroHome from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardProduct from '~/components/card/product';
import SubscribeForm from '~/components/subscribe-form';

import {
  getSiteConfig,
  getLatestFeaturedPost,
  getLatestInterviews,
  getAllPosts,
  getAllProducts,
} from '~/lib/sanity/requests';

export default function Home({
  siteConfig,
  latestFeaturedPost,
  latestInterviews,
  allPosts,
  allProducts,
}) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  console.log('latestFeaturedPost', latestFeaturedPost);

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        meta={{
          siteConfig,
          title: 'Home',
          description: 'This is the Home page.',
          image: null,
        }}
        preview={null}
      >
        <HeroHome post={latestFeaturedPost} />

        <div className="pt6">
          <Container>
            {latestInterviews.length > 0 && (
              <section className="pb5">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
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
                  {latestInterviews.map((post, i) => (
                    <div key={post.slug} className="col-24  col-12-md">
                      <div className="ph3  pv2">
                        <CardBlog i={i} post={post} columnCount={2} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {allPosts.length > 0 && (
              <section className="pb5">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
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
                  {allPosts.map((post, i) => (
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

          <section className="pb5">
            <SubscribeForm />
          </section>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const latestFeaturedPost = await getLatestFeaturedPost();
  const latestInterviews = await getLatestInterviews();
  const allPosts = await getAllPosts();
  const allProducts = await getAllProducts();

  return {
    props: {
      siteConfig,
      latestFeaturedPost,
      latestInterviews,
      allPosts,
      allProducts,
    },
  };
}
