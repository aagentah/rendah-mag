import { Heading } from 'next-pattern-library';

import Layout from '../components/layout';
import Container from '../components/layout/container';
import CardDefault from '../components/card/default';
import CardProduct from '../components/card/product';
import SubscribeForm from '../components/subscribe-form';
// import RenderComponents from '../../helpers/render-components';

import {
  getSiteConfig,
  getAllPosts,
  getAllProducts,
} from '../lib/sanity/requests';

export default function Home({ siteConfig, allPosts, allProducts }) {
  return (
    <>
      <Layout
        meta={{
          siteConfig,
          title: 'Home',
          description: 'This is the Home page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pv4  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Next Boilerplate"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          {
            // homePage.components.length > 0 &&
            //   homePage.components.map(component => (
            //     <RenderComponents component={component} />
            //   ))
          }

          {allPosts.length > 0 && (
            <section className="pb3">
              <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                - Posts
              </h2>

              <div className="flex  flex-wrap">
                {allPosts.map((post, i) => (
                  <div key={post.slug} className="col-24  col-6-md">
                    <div className="pa3">
                      <CardDefault i={i} post={post} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {allProducts.length > 0 && (
            <section className="pb3">
              <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                - Products
              </h2>

              <div className="flex  flex-wrap">
                {allProducts.map((product, i) => (
                  <div key={product.slug} className="col-24  col-6-md">
                    <div className="pa3">
                      <CardProduct i={i} product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - Subscribe Banner
            </h2>

            <SubscribeForm />
          </section>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const allPosts = await getAllPosts();
  const allProducts = await getAllProducts();

  return {
    props: { siteConfig, allPosts, allProducts },
  };
}
