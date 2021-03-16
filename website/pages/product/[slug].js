import Router, { useRouter } from 'next/router';

import {
  Tabs,
  Heading,
  Copy,
  Label,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
  imageBuilder,
} from '~/lib/sanity/requests';

export default function Product({ siteConfig, product }) {
  const router = useRouter();

  if (!router.isFallback && !product?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
    const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

    const descriptionTab = (
      <div className="db  pb3">
        <BlockContent blocks={product?.description} />
      </div>
    );

    const deliveryTab = (
      <>
        <p className="f-secondary  taj  f5  lh-copy">
          All physical products are shipped within 2 working days and are
          available to be shipped globally.
        </p>
      </>
    );

    const dominionTab = (
      <>
        <div className="pa4  br4  ba  bw1  bc-black">
          <p className="f-secondary  taj  f5  pb3  lh-copy">
            For the same price, join the Dominion and recieve this item plus a
            bunch of additional monthly features. Fine out more.{' '}
            <strong>We offer the following to you:</strong>
          </p>

          <ul className="pl4  pb3">
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              A Welcome package (+ membership card & stickers).
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              A quarter-yearly printed issue of Rendah Mag.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Frequent exclusive music, samples, tutorials, and more from
              featured artists & collectives.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Your own Dominion Profile login.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Discounts from all coming Rendah Mag products.
            </li>
          </ul>

          <a
            className="f-secondary  taj  f5  pb3  lh-copy  underline  black"
            href="/dominion"
          >
            Find out more
          </a>
        </div>
      </>
    );
    return (
      <div className="bg-almost-white">
        <Layout
          navOffset="top"
          navOnWhite
          hasNav
          hasFooter
          meta={{
            siteConfig,
            title: product?.title,
            description: null,
            image: product?.image1,
          }}
          preview={null}
        >
          <div className="pt4  pt0-md">
            <Container>
              <div className="flex  flex-wrap  pb5">
                <div className="col-24  col-12-md  ph2  pb3">
                  <Image
                    /* Options */
                    src={imageBuilder
                      .image(product?.image1)
                      .height(1000)
                      .width(1000)
                      .auto('format')
                      .fit('clip')
                      .url()}
                    placeholder={imageBuilder
                      .image(product?.image1)
                      .height(25)
                      .width(25)
                      .auto('format')
                      .fit('clip')
                      .blur('20')
                      .url()}
                    alt={product?.title}
                    figcaption={null}
                    height={500}
                    width={null}
                    customClass="shadow2"
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
                <div className="col-24  col-12-md  ph3-md">
                  <div className="db  ph2  pt2">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text={product?.title}
                      color="black"
                      size="large"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                  <div className="db  ph2  pb4">
                    <Label
                      /* Options */
                      customClass="ph2"
                      text={`£${product?.price}`}
                      color="white"
                      backgroundColor="black"
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="bb  bc-black  pb3  mb4">
                    <Tabs
                      /* Options */
                      content={[
                        {
                          id: '1',
                          tabTitle: 'Description',
                          tabContent: descriptionTab,
                        },
                        {
                          id: '2',
                          tabTitle: 'Shipping & Returns',
                          tabContent: deliveryTab,
                        },
                        product.category === 'Printed Issues'
                          ? {
                              id: '3',
                              tabTitle: 'DOMINION',
                              tabContent: dominionTab,
                            }
                          : null,
                      ]}
                      defaultSelected="1"
                    />
                  </div>

                  <div className="db">
                    <div className="dib  ph2  pb3">
                      <div
                        className="snipcart-add-item"
                        data-item-id={product?.slug}
                        data-item-price={product?.price}
                        data-item-url={`/product/${product?.slug}`}
                        data-item-description=""
                        data-item-image={product?.image1}
                        data-item-name={product?.title}
                      >
                        <Button
                          /* Options */
                          type="primary"
                          size="medium"
                          text="Add to cart"
                          color="black"
                          fluid={false}
                          icon={buttonIconPlus}
                          iconFloat="left"
                          inverted={false}
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    </div>
                    <div className="dib  ph2  pb3">
                      <div className="snipcart-checkout">
                        <Button
                          /* Options */
                          type="primary"
                          size="medium"
                          text="View Basket"
                          color="black"
                          fluid={false}
                          icon={buttonIconCart}
                          iconFloat={null}
                          inverted="transparent"
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </Layout>
      </div>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const product = await getProduct(params.slug);
  return {
    props: {
      siteConfig,
      product,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllProductsTotal();

  return {
    paths:
      data.map((product) => ({
        params: {
          slug: product.slug,
        },
      })) || [],
    fallback: true,
  };
}
