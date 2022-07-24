import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';

import { Heading, Label, Image, Button, Icon } from 'next-pattern-library';

import { useApp } from '~/context-provider/app';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import Tabs from '~/components/tabs';
import Modal from '~/components/modal';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
  imageBuilder
} from '~/lib/sanity/requests';

export default function Product({ siteConfig, product }) {
  const app = useApp();
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState('');

  const isSoldOut = product?.tag === 'Sold-out';
  const imageHeight = app.deviceSize === 'md' ? null : 500;

  if (!router.isFallback && !product?.slug) {
    Router.push('/404');
  }

  const submit = async priceId => {
    const response = await fetch(
      `${process.env.SITE_URL}/api/stripe/checkout-sessions`,
      {
        body: JSON.stringify({
          data: {
            priceId,
            quantity,
            mode: 'payment',
            successUrl: `/product/${product.slug}`,
            cancelUrl: `/product/${product.slug}`,
            shipping: {
              uk: product.shippingUK,
              europe: product.shippingEurope,
              worldwide: product.shippingWorldwide
            },
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

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
    const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
    const buttonIconMinus = <Icon icon={['fas', 'minus']} />;

    const renderPurchaseButton = () => {
      if (isSoldOut) {
        return (
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Sold Out"
            color="grey"
            fluid={true}
            icon={buttonIconPlus}
            iconFloat="left"
            inverted={false}
            loading={false}
            disabled
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        );
      }

      if (product.category === 'Printed Issues') {
        return (
          <>
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Purchase"
              color="black"
              fluid={true}
              icon={buttonIconPlus}
              iconFloat="left"
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={() => {
                setModalActive(true);
              }}
              /* Children */
              withLinkProps={null}
            />

            <Modal
              /* Options */
              size="medium"
              active={modalActive}
            >
              <div className="pb2  mb2">
                <Heading
                  /* Options */
                  htmlEntity="h3"
                  text="Subscribe instead for £7.99?"
                  color="black"
                  size="medium"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="pb4  pb3-md">
                <div className="pb3">
                  <p className="f-secondary  taj  f6  pb3  lh-copy">
                    Joining our Dominion Subscription is cheaper than individual
                    prints, and will give access to a great deal of additional
                    features.
                  </p>
                </div>

                <div className="measure-wide  ph4  ph0-md">
                  <p className="f-secondary  taj  f6  pb3  lh-copy">
                    <strong>We offer the following:</strong>
                  </p>
                  <ul className="pl3">
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      A Welcome package (+ membership card & stickers).
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      A quarter-yearly printed issue of Rendah Mag.
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      Monthly exclusive music, samples, tutorials, and 'behind
                      the scenes' insights of underground music
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
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

              <div className="flex  flex-wrap  pb2">
                <div className="col-24  col-12-md  flex  justify-center  justify-start-md  align-center  pb3  pb0-md  ph0  ph3-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Subscribe"
                    color="black"
                    fluid={true}
                    icon={buttonIconPlus}
                    iconFloat="left"
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/dominion',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/dominion`,
                        scroll: false
                      }
                    }}
                  />
                </div>
                <div className="col-24  col-12-md  flex  justify-center  justify-end-md  align-center  ph0  ph3-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Single purchase"
                    color="black"
                    fluid={true}
                    icon={buttonIconPlus}
                    iconFloat="left"
                    inverted={true}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={() => submit(product?.priceId)}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>
            </Modal>
          </>
        );
      }

      return (
        <Button
          /* Options */
          type="primary"
          size="medium"
          text="Add to Cart"
          color="black"
          fluid={true}
          icon={buttonIconPlus}
          iconFloat="left"
          inverted={false}
          loading={false}
          disabled={false}
          skeleton={false}
          onClick={() => submit(product?.priceId)}
          /* Children */
          withLinkProps={null}
        />
      );
    };

    const descriptionTab = (
      <div className="rich-text">
        <Sections body={product?.description} />
      </div>
    );

    const deliveryTab = (
      <div className="rich-text">
        <p>
          All physical products are shipped from the UK within 2 working days
          and are available to purchase globally.
        </p>
      </div>
    );

    return (
      <div className="product  bg-almost-white">
        <Layout
          navOffset="top"
          navOnWhite
          hasNav
          hasFooter
          meta={{
            siteConfig,
            title: product?.title,
            description: null,
            image: product?.image1
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
                    height={imageHeight}
                    width={null}
                    customClass="shadow2"
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
                <div className="col-24  col-12-md  pl4-md">
                  <div className="db  ph2">
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
                  <div className="flex  flex-wrap  ph2  pb3">
                    <div className="dib  pr2">
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

                    {product?.tag && product?.tag !== 'None' && (
                      <div className="dib  pr2">
                        <Label
                          /* Options */
                          customClass="ph2"
                          text={product?.tag}
                          color="black"
                          backgroundColor="white"
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    )}
                  </div>

                  <div className="product__tabs  bb  bc-black  mb3">
                    <Tabs
                      /* Options */
                      content={[
                        {
                          id: '1',
                          tabTitle: 'Description',
                          tabContent: descriptionTab
                        },
                        {
                          id: '2',
                          tabTitle: 'Shipping Info',
                          tabContent: deliveryTab
                        }
                      ]}
                      defaultSelected="1"
                    />
                  </div>

                  {!isSoldOut && (
                    <div className="flex  flex-wrap  align-center  justify-center  justify-start-md  ph2  pt2  pb4">
                      <div className="col-24  col-8-md  flex  flex-wrap  align-center  pb3  pb0-md">
                        {renderPurchaseButton()}
                      </div>
                      <div className="col-24  col-8-md  flex  flex-wrap  justify-center  align-center  ph3-md  pb3  pb0-md">
                        <div className="flex  flex-wrap  bg-white  justify-center  pv3  br2  w-100">
                          <span
                            onClick={() =>
                              quantity > 1 && setQuantity(quantity - 1)
                            }
                            className="ph2  cp"
                          >
                            {buttonIconMinus}
                          </span>
                          <span className="w2  tac">{quantity}</span>
                          <span
                            onClick={() => setQuantity(quantity + 1)}
                            className="ph2  cp"
                          >
                            {buttonIconPlus}
                          </span>
                        </div>
                      </div>
                      <div className="col-24  col-8-md  flex  flex-wrap  align-center">
                        <div className="flex  flex-wrap  bg-white  justify-center  pa2  ph3  br2  w-100">
                          <input
                            className="input  w-100  tac"
                            placeholder="PROMO CODE"
                            type="text"
                            value={discount}
                            onChange={e => setDiscount(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
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

  // if (!product.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 1,
  //   };
  // }

  return {
    props: {
      siteConfig,
      product
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const data = await getAllProductsTotal();

  return {
    paths:
      data.map(product => ({
        params: {
          slug: product.slug
        }
      })) || [],
    fallback: 'blocking'
  };
}
