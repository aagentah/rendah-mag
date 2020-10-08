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

export default function Dominion({ siteConfig }) {
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

  const descriptionTab = (
    <div className="db  pb3">Buy the dom subscription.</div>
  );

  const deliveryTab = (
    <div className="db  pb3">Delivers are blah blah blah...</div>
  );

  return (
    <Layout
      navOffset="top"
      navOnWhite
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'This is the Dominion page.',
        image: null,
      }}
      preview={null}
    >
      <div className="pt4  pt0-md">
        <Container>
          <div className="flex  flex-wrap  pb5">
            <div className="col-24  col-12-md  ph2  pb3">
              <div className="shadow2">
                {
                  // <Image
                  //   /* Options */
                  //   src={imageBuilder
                  //     .image(product.image1)
                  //     .height(1000)
                  //     .width(1000)
                  //     .auto('format').url()}
                  //   placeholder={imageBuilder
                  //     .image(product.image1)
                  //     .height(25)
                  //     .width(25)
                  //     .auto('format').url()}
                  //   alt={product.title}
                  //   figcaption={null}
                  //   height={500}
                  //   width={null}
                  //   customClass={null}
                  //   onClick={null}
                  //   /* Children */
                  //   withLinkProps={null}
                  // />
                }
              </div>
            </div>
            <div className="col-24  col-12-md  ph3-md">
              <div className="db  ph2  pt2  pb3">
                {
                  // <Heading
                  //   /* Options */
                  //   htmlEntity="h1"
                  //   text={product.title}
                  //   color="black"
                  //   size="large"
                  //   truncate={null}
                  //   reveal={null}
                  //   /* Children */
                  //   withLinkProps={null}
                  // />
                }
              </div>
              <div className="db  ph2  pb4">
                {
                  // <Label
                  //   /* Options */
                  //   customClass="ph2"
                  //   text={`£${product.price}`}
                  //   color="white"
                  //   backgroundColor="black"
                  //   onClick={null}
                  //   /* Children */
                  //   withLinkProps={null}
                  // />
                }
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
                      tabTitle: 'Deliveries',
                      tabContent: deliveryTab,
                    },
                  ]}
                  defaultSelected="1"
                />
              </div>

              <div className="db  ph2  pb3">
                <div
                  className="snipcart-add-item"
                  data-item-id="dominion-subscription"
                  data-item-price="7.99"
                  data-item-url="/dominion"
                  data-item-description=""
                  data-item-image=""
                  data-item-name="Dominion Subscription"
                  data-item-max-quantity="1"
                  data-item-weight="0"
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
              <div className="db  ph2  pb3">
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
                    inverted
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
  );
}

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
