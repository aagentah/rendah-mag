import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Image from '~/components/elements/image';
import ImageNew from '~/components/elements/image-new';
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
  imageBuilder,
} from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));

const IconShoppingCart = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconShoppingCart)
);

const IconPlus = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconPlus)
);

const IconMinus = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconMinus)
);

const IconInfoCircle = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconInfoCircle)
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

  console.log('product', product);

  // const submit = async (priceId) => {
  //   const response = await fetch(
  //     `${process.env.SITE_URL}/api/stripe/checkout-sessions`,
  //     {
  //       body: JSON.stringify({
  //         data: {
  //           priceId,
  //           quantity,
  //           mode: 'payment',
  //           successUrl: `/product/${product.slug}`,
  //           cancelUrl: `/product/${product.slug}`,
  //           shipping: {
  //             uk: product.shippingUK,
  //             europe: product.shippingEurope,
  //             worldwide: product.shippingWorldwide,
  //           },
  //           discount,
  //         },
  //       }),
  //       headers: { 'Content-Type': 'application/json' },
  //       method: 'POST',
  //     }
  //   );

  //   if (response.ok) {
  //     // Success
  //     const data = await response.json();
  //     window.location.href = data.url;
  //   }
  // };

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <IconShoppingCart color="white" size={16} />;
    const buttonIconPlus = <IconPlus color="black" size={16} />;
    const buttonIconPlusWhite = <IconPlus color="white" size={16} />;
    const buttonIconMinus = <IconMinus color="black" size={16} />;
    const columns = 24 / product?.images?.length;

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
              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="p"
                  text="Subscribe instead for £11?"
                  color="black"
                  size="medium"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
              <div className="pb2  mb2">
                <Heading
                  /* Options */
                  htmlEntity="p"
                  text="+ free global shipping"
                  color="rendah-red"
                  size="small"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="pb4  pb3-md">
                <p className="t-secondary  taj  f6  pb3  lh-copy">
                  Joining our subscription is cheaper than individual prints,
                  and will give access to a great deal of additional features.
                </p>

                <div className="measure-wide page--dominion">
                  <p className="t-secondary  taj  f6  pb3  lh-copy">
                    <strong>We offer the following:</strong>
                  </p>

                  <ul className="pl3">
                    <li className="t-primary  tal  f6  pb2  lh-copy">
                      3x Printed magazines per year (free global shipping).
                    </li>
                    <li className="t-primary  tal  f6  pb2  lh-copy">
                      Welcome pack with stickers and membership card.
                    </li>
                    <li className="t-primary  tal  f6  pb2  lh-copy">
                      Subscriber-dashboard; crafted for both artists &
                      enthusiasts.
                    </li>
                    <li className="t-primary  tal  f6  pb2  lh-copy">
                      Exlusive music, art, samples, resources, and insights.
                    </li>
                    <li className="t-primary  tal  f6  pb2  lh-copy">
                      Digital access to previous prints.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex  flex-wrap  pb2">
                <div className="col-24  col-12-md  flex  justify-center  justify-start-md  align-center  pb3  pb0-md  ph0  ph3-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="small"
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
                        scroll: false,
                      },
                    }}
                  />
                </div>
                <div className="col-24  col-12-md  flex  justify-center  justify-end-md  align-center  ph0  ph3-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="small"
                    text="Single purchase"
                    color="black"
                    fluid={true}
                    icon={buttonIconPlus}
                    iconFloat="left"
                    inverted={true}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'external',
                      href: product?.stripeCheckoutUrl,
                      target: '_blank',
                      routerLink: null,
                      routerLinkProps: null,
                    }}
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
          text="Purchase"
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
            type: 'external',
            href: product?.stripeCheckoutUrl,
            target: '_blank',
            routerLink: null,
            routerLinkProps: null,
          }}
        />
      );
    };

    const descriptionTab = product?.description ? (
      <div className="rich-text  rich-text__product">
        <Sections body={product?.description} />
      </div>
    ) : null;

    const deliveryTab = (
      <div className="rich-text">
        <p>
          All physical products are shipped from the UK within 4 working days
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
            image: product?.image1,
          }}
          preview={null}
        >
          <div className="pt4  pt0-md">
            <Container>
              <div className="flex  flex-wrap  pb4">
                {isSoldOut && (
                  <div className="col-24">
                    <div className="relative">
                      <div className="absolute  top  right  br-100  nt4  nr3  nr4-md  info-color  z2  bg-white  f4">
                        <IconInfoCircle color="#6697f4" size={100} />
                      </div>

                      <div className="bg-white  bc-info-color  ba  bw1  br3  pa4  z1  ph5-md  mb4  relative">
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
                          You may be in luck. We reserve some copies of our
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
                                scroll: false,
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-24  col-12-md  ph2  pb4  pb3-md">
                  <ImageNew
                    imageObject={product?.imageObject}
                    className="br3 shadow2"
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

                      {
                        //  {!isSoldOut && (
                        //   <p className="db  dib-md  rendah-red  f6  lh-copy  pl2-md  pt2  pt0-md">
                        //     (or <span className="fw7">£9 + Free Shipping</span> on
                        //     the{' '}
                        //     <Link href="/dominion" legacyBehavior>
                        //       <span className="cp  underline  fw7">
                        //         Dominion Subscription
                        //       </span>
                        //     </Link>
                        //     )
                        //   </p>
                        // )}
                      }
                    </div>
                  </div>

                  <div className="product__tabs  bb  bc-black  mb3">
                    <Tabs
                      /* Options */
                      content={[
                        {
                          id: '1',
                          tabTitle: 'Description',
                          tabContent: descriptionTab,
                        },
                        // {
                        //   id: '2',
                        //   tabTitle: 'Shipping Info',
                        //   tabContent: deliveryTab,
                        // },
                      ]}
                      defaultSelected="1"
                    />
                  </div>

                  {!isSoldOut && (
                    <div className="flex  flex-wrap  align-center  justify-center  justify-start-md  ph2  pt2  pb4">
                      <div className="col-24  col-8-md  flex  flex-wrap  align-center  pb3  pb0-md">
                        {renderPurchaseButton()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {product.images?.length && (
                <>
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text="Additional shots"
                      color="black"
                      size="medium"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex flex-wrap mb6">
                    {product.images?.map((image, index) => (
                      <div
                        key={index}
                        className={`col-24 col-${columns}-md ph2 pb4 pb3-md`}
                      >
                        <ImageNew imageObject={image.imageObject} />
                      </div>
                    ))}
                  </div>
                </>
              )}
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
      product,
    },
    revalidate: 10,
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
    fallback: 'blocking',
  };
}
