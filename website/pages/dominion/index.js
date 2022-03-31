import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';

import { Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Dominion({ siteConfig }) {
  const [discount, setDiscount] = useState('');
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

  const submit = async () => {
    const priceId =
      process.env.ENV_TYPE === 'development'
        ? 'price_1KOTLxKb3SeE1fXfnkcObl4Q'
        : 'dominion-subscription_2ff0f5';

    const response = await fetch(
      `${process.env.SITE_URL}/api/stripe/checkout-sessions`,
      {
        body: JSON.stringify({
          data: {
            priceId,
            quantity: 1,
            mode: 'subscription',
            successUrl: '/dominion-thank-you',
            cancelUrl: '/dominion',
            discount
          }
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    if (response.ok) {
      // Success
      const data = await response.json();
      window.location.href = data.url;
    }
  };

  const ButtonWrapper = ({ type }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          intent: 'subscription'
        }
      });
    }, [type]);

    return (
      <PayPalButtons
        createSubscription={(data, actions) => {
          return actions.subscription
            .create({
              // plan_id: 'P-6B5761572P962811FMJCNAWY'
              plan_id: 'P-9GU47458MW257550KMJCN3FA'
            })
            .then(orderId => {
              // Your code here after create the order
              return orderId;
            });
        }}
        style={{
          label: 'subscribe'
        }}
      />
    );
  };

  return (
    <Layout
      navOffset="top"
      navOnWhite
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'Something new & exciting.',
        image:
          'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610196181/dominion/dominion-social-facebook-meta.png'
      }}
      preview={null}
    >
      <div className="pt4  pt0-md">
        <Container>
          <div className="measure-wide  mla  mra  mb4">
            <Image
              /* Options */
              src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610317978/dominion/dominion-logo.png"
              placeholder={null}
              alt="Dominion"
              figcaption={null}
              height={null}
              width={null}
              customClass={null}
              skeleton={false}
              onClick={null}
            />
          </div>

          <div className="flex  flex-wrap  pv3">
            <div className="col-24  flex  justify-center">
              <div className="measure-wide  mb3  ph4  ph0-md">
                <p className="f-secondary  taj  f5  lh-copy">
                  Right now, the Rendah Mag team embarks upon a new journey.
                  With so much happening right now, we want to push our platform
                  into new territory, offering a new way for you to explore the
                  landscape of underground music culture. With an absolute
                  pleasure, we bring you the DOMINION.
                </p>
              </div>
            </div>
          </div>

          <div className="flex  flex-wrap-reverse  flex-wrap-md  pb4-md  ph5-md">
            <div className="col-24  col-11-md  flex  justify-center  align-center">
              <img
                className="mb3  mb0-md"
                src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617893807/dominion/welcome-pack.png"
                alt="Welcome Pack"
              />
            </div>
            <div className="col-24  col-13-md  flex  justify-center  align-center  ph0  ph4-md">
              <div className="measure-wide  ph4  ph0-md">
                <p className="f-secondary  taj  f5  pb3  lh-copy">
                  <strong>We offer the following:</strong>
                </p>
                <ul className="pl3">
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    A Welcome package (+ membership card & stickers).
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    A quarter-yearly printed issue of Rendah Mag.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Monthly exclusive music, samples, tutorials, and 'behind the
                    scenes' insights of underground music.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Your own Dominion Profile & login.
                  </li>
                  {
                    // <li className="f-secondary  tal  f5  pb2  lh-copy">
                    //   Discounts from all coming Rendah Mag products.
                    // </li>
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className="flex  flex-wrap  pb5">
            <div className="col-24  flex  justify-center">
              <div className="measure-wide  mb3  ph4  ph0-md">
                <p className="f-secondary  taj  f5  pb3  lh-copy">
                  Our mission with this project is to present something new and
                  exciting for the community in the hope that we can truly bring
                  something of value to artists and listeners alike. We want to
                  work not only with people of the industry, but also yourself
                  on a personal level to create something unique. I hope you can
                  join us.
                </p>
              </div>
            </div>

            <div className="col-24  flex  justify-center">
              <div className="db  ph2  pb3  mb2">
                <Button
                  /* Options */
                  type="primary"
                  size="medium"
                  text="Click here to join"
                  color="black"
                  fluid={false}
                  icon={buttonIconPlus}
                  iconFloat="left"
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={submit}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="db  ph2  pb3  mb2">
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'AXJ4HaEwC7x-IEoVwM1z0_8Oh3AtG5EhS5h71ZXfDOypuuiw8h5LEwYIQYgrWpP1fD9W_rHBV6yQtBWq',
                    components: 'buttons',
                    intent: 'subscription',
                    vault: true
                  }}
                >
                  <ButtonWrapper type="subscription" />
                </PayPalScriptProvider>
              </div>
            </div>

            <div className="col-24  flex  flex-wrap  align-center  justify-center  ph2">
              <div className="mw4  shadow1">
                <input
                  className="input"
                  placeholder="PROMO CODE"
                  type="text"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                />
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
      siteConfig
    }
  };
}
