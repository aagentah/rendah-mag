import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import isEmpty from 'lodash/isEmpty';

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

import { getSiteConfig, getProduct, imageBuilder } from '~/lib/sanity/requests';

export default function Dominion({ siteConfig }) {
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
  const [currentTab, setCurrentTab] = useState();
  const [snipcartData, setSnipcartData] = useState();

  useEffect(() => {
    if (process.browser) {
      if (window.Snipcart) {
        Snipcart.subscribe('order.completed', function (data) {
          const emailQuery = data?.email ? `?prefillEmail=${data.email}` : '';

          if (data.items.length) {
            for (let i = 0; i < data.items.length; i += 1) {
              const item = data.items[i];

              if (item.id === 'dominion-subscription') {
                setTimeout(() => {
                  Snipcart.api.modal.close();
                  Router.push(`/dominion-thank-you${emailQuery}`);
                }, 3000);
              }
            }
          }
        });

        Snipcart.subscribe('page.changed', function (page) {
          setCurrentTab(page);
        });

        Snipcart.subscribe('billingaddress.changed', function (address) {
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

  return (
    <Layout
      navOffset="top"
      navOnWhite={true}
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'Join the Dominion Subscription.',
        image: null,
      }}
      preview={null}
    >
      <div className="pt4  pt0-md">
        <Container>
          <div className="flex  flex-wrap  pb5">
            <div className="col-24  flex  justify-center">
              <img
                className="w-100  ph3  ph0-md  mb4  measure-wide"
                src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610063765/dominion/dominion-logo.png"
              />
            </div>

            <div className="col-24  flex  justify-center">
              <div className="measure-wide  mb3  ph4  ph0-md">
                <p className="f-secondary  taj  f5  pb4  lh-copy">
                  This year, the Rendah Mag team embarks upon a new journey.
                  With so much happening right now, we want to push our platform
                  into new territory, offering a new way for you to explore the
                  landscape of underground music culture. With an absolute
                  pleasure, we bring you the DOMINION.
                </p>
                <p className="f-secondary  taj  f5  pb3  lh-copy">
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
                    Exclusive monthly updates on releases & insights within
                    underground music culture.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Your own Dominion Profile login.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Discounts from all coming Rendah Mag products
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Exclusive music, samples, and tutorials from featured
                    artists & collectives.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy  fw7  green">
                    If you're joining us in January, you also get a FREE
                    Dominion Cassette Tape Cypher!
                  </li>
                </ul>

                <p className="f-secondary  taj  f5  pb3  lh-copy">
                  Our mission with this project is to offer something new and
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
                  data-item-weight="1"
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
                //       onClick={null}
                //       /* Children */
                //       withLinkProps={null}
                //     />
                //   </div>
                // </div>
              }
            </div>
          </div>
        </Container>

        <div className="w-100  pt5  pt6-md  pb5  bg-almost-white  relative  mt5">
          <div className="col-24  flex  justify-center  w-100  absolute  nt6  top  left">
            <img
              className="w-100  ph5  ph6-md  mb3  measure-wide"
              src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610064911/dominion/cassette.png"
            />
          </div>
        </div>
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
