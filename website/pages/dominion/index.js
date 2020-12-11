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
import HeroDominion from '~/components/hero/dominion';

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
      navOffset={null}
      navOnWhite={false}
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'Join the Dominion Subscription.',
        image: null,
      }}
      preview={null}
    >
      <HeroDominion />
      <div className="pt4  pt0-md">
        <Container>
          <div className="flex  flex-wrap  pb5">
            <div className="col-24  flex  justify-center">
              <div className="measure-wide  mt5  mb3">
                <div className="taj  pb4">
                  <Copy
                    /* Options */
                    text={`
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Eu feugiat pretium nibh ipsum. Nunc lobortis mattis aliquam
                    faucibus purus in. Sem et tortor consequat id porta nibh. Est
                    placerat in egestas erat imperdiet sed euismod nisi porta.
                    Consectetur libero id faucibus nisl. Tortor condimentum lacinia
                    quis vel eros donec ac odio tempor. Ut ornare lectus sit amet.
                    Nunc mattis enim ut tellus elementum sagittis vitae et leo.
                    Nunc aliquet bibendum enim facilisis gravida neque. Scelerisque
                    mauris pellentesque pulvinar pellentesque habitant.
                  `}
                    color="black"
                    size="medium"
                    truncate={null}
                  />
                </div>
                <div className="taj  pb4">
                  <Copy
                    /* Options */
                    text={`
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Eu feugiat pretium nibh ipsum. Nunc lobortis mattis aliquam
                    faucibus purus in. Sem et tortor consequat id porta nibh. Est
                    placerat in egestas erat imperdiet sed euismod nisi porta.
                    Consectetur libero id faucibus nisl. Tortor condimentum lacinia
                    quis vel eros donec ac odio tempor. Ut ornare lectus sit amet.
                    Nunc mattis enim ut tellus elementum sagittis vitae et leo.
                    Nunc aliquet bibendum enim facilisis gravida neque. Scelerisque
                    mauris pellentesque pulvinar pellentesque habitant.
                  `}
                    color="black"
                    size="medium"
                    truncate={null}
                  />
                </div>
                <div className="taj  pb4">
                  <Copy
                    /* Options */
                    text={`
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Eu feugiat pretium nibh ipsum. Nunc lobortis mattis aliquam
                    faucibus purus in. Sem et tortor consequat id porta nibh. Est
                    placerat in egestas erat imperdiet sed euismod nisi porta.
                    Consectetur libero id faucibus nisl. Tortor condimentum lacinia
                    quis vel eros donec ac odio tempor. Ut ornare lectus sit amet.
                    Nunc mattis enim ut tellus elementum sagittis vitae et leo.
                    Nunc aliquet bibendum enim facilisis gravida neque. Scelerisque
                    mauris pellentesque pulvinar pellentesque habitant.
                  `}
                    color="black"
                    size="medium"
                    truncate={null}
                  />
                </div>
              </div>
            </div>
            <div className="col-24  flex  justify-center">
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
                  data-item-payment-interval="Month"
                  data-item-payment-interval-count="1"
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
