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

import { getSiteConfig, getProduct, imageBuilder } from '~/lib/sanity/requests';

export default function Post({ siteConfig, product }) {
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

  const descriptionTab = (
    <div className="db  pb3">
      <BlockContent blocks={product.description} />
    </div>
  );

  const deliveryTab = (
    <>
      <Copy
        /* Options */
        text={`
          All physical products are shipped within 2 working days and are available to be shipped globally.
        `}
        color="black"
        size="medium"
        truncate={null}
      />
    </>
  );

  return (
    <div className="bg-almost-white">
      <Layout
        navOffset="top"
        navOnWhite
        meta={{
          siteConfig,
          title: 'Product',
          description: 'This is the Product page.',
          image: null,
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
                    .image(product.image1)
                    .height(1000)
                    .width(1000)
                    .url()}
                  placeholder={imageBuilder
                    .image(product.image1)
                    .height(25)
                    .width(25)
                    .url()}
                  alt={product.title}
                  figcaption={null}
                  height={500}
                  width={null}
                  customClass="shadow2"
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
              <div className="col-24  col-12-md  ph3-md">
                <div className="db  ph2  pt2  pb3">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text={product.title}
                    color="black"
                    size="large"
                    truncate={null}
                    reveal={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
                <div className="db  ph2  pb4">
                  <Label
                    /* Options */
                    customClass="ph2"
                    text={`£${product.price}`}
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
                    ]}
                    defaultSelected="1"
                  />
                </div>

                <div className="dib  ph2  pb3">
                  <div
                    className="snipcart-add-item"
                    data-item-id={product.slug}
                    data-item-price={product.price}
                    data-item-url={`/product/${product.slug}`}
                    data-item-description=""
                    data-item-image={product.image1}
                    data-item-name={product.title}
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
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
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

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const product = await getProduct(params.slug);
  return {
    props: {
      siteConfig,
      product,
    },
  };
}
