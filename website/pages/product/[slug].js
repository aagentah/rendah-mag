import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';
import { useApp } from '~/context-provider/app';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import Tabs from '~/components/tabs';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
  imageBuilder
} from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));

const IconShoppingCart = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconShoppingCart)
);

const IconPlus = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconPlus)
);

const IconMinus = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconMinus)
);

const IconInfoCircle = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconInfoCircle)
);

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
    const buttonIconCart = <IconShoppingCart color="white" size={16} />;
    const buttonIconPlus = <IconPlus color="black" size={16} />;
    const buttonIconPlusWhite = <IconPlus color="white" size={16} />;
    const buttonIconMinus = <IconMinus color="black" size={16} />;

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
              icon={buttonIconPlusWhite}
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
                  htmlEntity="p"
                  text="Subscribe instead for £9.00?"
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
                    icon={buttonIconPlusWhite}
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
          icon={buttonIconPlusWhite}
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
                {isSoldOut && (
                  <div className="col-24">
                    <div className="relative">
                      <div className="absolute  top  right  br-100  nt4  nr4  info-color  o-10  f4">
                        <IconInfoCircle color="#6697f4" size={100} />
                      </div>

                      <div className="bc-info-color  ba  bw1  br3  pa4  ph5-md  mb4  relative">
                        <div className="pb3">
                          <Heading
                            /* Options */
                            htmlEntity="h1"
                            text="Print sold out?"
                            color="black"
                            size="large"
                            truncate={null}
                            /* Children */
                            withLinkProps={null}
                          />
                        </div>

                        <p className="black  f6  lh-copy  mb3">
                          You may be in luck. We reserve a few copies of our
                          latest print for those wishing to subscribe instead.
                          Joining our Dominion Subscription is cheaper than
                          individual prints, and will give access to a great
                          deal of additional features.
                        </p>

                        <div className="col-24">
                          <Button
                            /* Options */
                            type="primary"
                            size="small"
                            text="Subscribe"
                            color="black"
                            fluid={false}
                            icon={buttonIconPlusWhite}
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
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-24  col-12-md  ph2  pb4  pb3-md">
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
                    width={500}
                    customClass="shadow2  br3"
                    priority={true}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
                <div className="col-24  col-12-md  pl4-md">
                  <div className="dib  pb3  pl2  pr3">
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

                  {product?.tag && product?.tag !== 'None' && (
                    <div className="db  dib-md  pr2  pb3  pb0-md  pl2  pl0-md">
                      <Label
                        /* Options */
                        customClass="bold  ba  bc-black"
                        text={product?.tag}
                        color="black"
                        backgroundColor=""
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  )}
                  <div className="flex  flex-wrap  ph2  pb3">
                    <div className="dib  pr2">
                      <p className="dib  black  f4  f5-md  lh-copy  fw7">
                        £{product?.price}
                      </p>

                      {!isSoldOut && (
                        <p className="db  dib-md  rendah-red  f6  lh-copy  pl2-md  pt2  pt0-md">
                          (or <span className="fw7">£9 + free shipping</span> on
                          the{' '}
                          <Link href="/dominion" legacyBehavior>
                            <span className="cp  underline  fw7">
                              Dominion Subscription
                            </span>
                          </Link>
                          )
                        </p>
                      )}
                    </div>
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
  //     revalidate: 10,
  //   };
  // }

  return {
    props: {
      siteConfig,
      product
    },
    revalidate: 10
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
