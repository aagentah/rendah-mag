/* global Snipcart */

import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import isEmpty from 'lodash/isEmpty';
import shuffle from 'lodash/shuffle';

import {
  Tabs,
  Heading,
  Copy,
  Label,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import {
  getSiteConfig,
  getDominionUsers,
  imageBuilder,
} from '~/lib/sanity/requests';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Dominion({ siteConfig }) {
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
  const [currentTab, setCurrentTab] = useState();
  const [snipcartData, setSnipcartData] = useState();
  const [dominionUsers, setDominionUsers] = useState([]);

  useEffect(() => {
    const action = async () => {
      const dominionUsersRes = await getDominionUsers();
      setDominionUsers(shuffle(dominionUsersRes));
    };

    action();
  }, []);

  useEffect(() => {
    if (process.browser) {
      if (window.Snipcart) {
        Snipcart.subscribe('order.completed', function (data) {
          if (data.items.length) {
            for (let i = 0; i < data.items.length; i += 1) {
              const item = data.items[i];

              if (item.id === 'dominion-subscription') {
                setTimeout(() => {
                  Snipcart.api.modal.close();
                  Router.push('/dominion-thank-you');
                }, 3000);
              }
            }
          }
        });

        Snipcart.subscribe('page.changed', (page) => {
          setCurrentTab(page);
        });

        Snipcart.subscribe('billingaddress.changed', (address) => {
          setSnipcartData(address);
        });
      }
    }
  });

  // Check if email already has a subscription
  useEffect(() => {
    const fetchCustomerLatestSubscription = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/snipcart/get-customer-latest-subscription`,
        {
          body: JSON.stringify({ email: snipcartData.email }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      const json = await response.json();

      if (response.ok) {
        // Success
        if (!isEmpty(json)) {
          const emailQuery = snipcartData?.email
            ? `?prefillEmail=${snipcartData.email}`
            : '';
          Snipcart.api.modal.close();
          Router.push(`/dominion-already-member${emailQuery}`);
        }
      }
    };

    if (
      currentTab === 'shipping-method' ||
      currentTab === 'payment-method' ||
      currentTab === 'order-confirm'
    ) {
      if (snipcartData) fetchCustomerLatestSubscription();
    }
  }, [currentTab, snipcartData]);

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

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
          'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610196181/dominion/dominion-social-facebook-meta.png',
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
                  This year, the Rendah Mag team embarks upon a new journey.
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
                  <strong>We offer the following to you:</strong>
                </p>
                <ul className="pl3">
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
                  data-item-recurring-shipping="false"
                >
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
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>
              {
                // <div className="db  ph2  pb3">
                //   <div className="snipcart-checkout">
                //     <Button
                //       /* Options */
                //       type="primary"
                //       size="medium"
                //       text="View Basket"
                //       color="black"
                //       fluid={false}
                //       icon={buttonIconCart}
                //       iconFloat={null}
                //       inverted
                //       loading={false}
                //       disabled={false}
                //       skeleton={false}
                //       onClick={null}
                //       /* Children */
                //       withLinkProps={null}
                //     />
                //   </div>
                // </div>
              }
            </div>

            {
              // {dominionUsers.length && (
              //   <div class="fff">
              //     <div class="fff-track">
              //       {dominionUsers.map((iteration, i) => (
              //         <div class="fff2">
              //           <img
              //             src={imageBuilder
              //               .image(iteration?.avatar)
              //               .width(250)
              //               .height(100)
              //               .auto('format')
              //               .fit('clip')
              //               .url()}
              //             height="100"
              //             width="250"
              //             alt=""
              //           />
              //         </div>
              //       ))}
              //     </div>
              //   </div>
              // )}
            }

            <form action="/api/stripe/checkout-sessions" method="POST">
              <section>
                <button type="submit" role="link">
                  Checkout
                </button>
              </section>
            </form>
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
