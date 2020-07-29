import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '../components/layout';
import Container from '../components/layout/container';
import CardBlog from '../components/card/blog';
import CardProduct from '../components/card/product';
import SubscribeForm from '../components/subscribe-form';
// import RenderComponents from '../../helpers/render-components';

import {
  getSiteConfig,
  getLatestInterviews,
  getAllPosts,
  getAllProducts,
} from '../lib/sanity/requests';

export default function Home({
  siteConfig,
  latestInterviews,
  allPosts,
  allProducts,
}) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const heroImage = (
    <Image
      /* Options */
      src="https://images.unsplash.com/photo-1555086156-e6c7353d283f"
      placeholder="https://via.placeholder.com/500x500"
      alt="This is the alt text."
      figcaption={null}
      height={500}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      color="white"
      size="x-large"
      truncate={null}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroButton = (
    <Button
      /* Options */
      type="secondary"
      size="medium"
      text="Read more"
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

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
        <div className="">
          {
            // <div className="layout--split__left">
            //   <div
            //     className="layout--split__left__background"
            //     style={{
            //       backgroundImage:
            //         'url(https://images.unsplash.com/photo-1555086156-e6c7353d283f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)',
            //     }}
            //   ></div>
            // </div>
          }

          <Parallax
            className="z1  nt4"
            y={['-110px', '100px']}
            tagOuter="figure"
          >
            <div className="hero--homepage">
              <Hero
                /* Options */
                height={500}
                /* Children */
                image={heroImage}
                title={heroHeading}
                description={null}
                button={heroButton}
              />
            </div>
          </Parallax>

          <div className="pt6  ph3  ph4-md">
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

              {
                // {allProducts.length > 0 && (
                //   <section className="pb3">
                //     <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                //       - Products
                //     </h2>
                //
                //     <div className="flex  flex-wrap">
                //       {allProducts.map((product, i) => (
                //         <div key={product.slug} className="col-24  col-8-md">
                //           <div className="pa3">
                //             <CardProduct i={i} product={product} />
                //           </div>
                //         </div>
                //       ))}
                //     </div>
                //   </section>
                // )}
              }

              <section className="pb3">
                <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                  - Subscribe Banner
                </h2>

                <SubscribeForm />
              </section>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const latestInterviews = await getLatestInterviews();
  const allPosts = await getAllPosts();
  const allProducts = await getAllProducts();

  return {
    props: { siteConfig, latestInterviews, allPosts, allProducts },
  };
}
