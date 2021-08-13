import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

import {
  Heading,
  Copy,
  Label,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import { useApp } from '~/context-provider/app';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';
import Sections from '~/components/article/body-sections';
import Tabs from '~/components/tabs';
import Modal from '~/components/modal';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
  imageBuilder,
} from '~/lib/sanity/requests';

export default function Product({ siteConfig, product }) {
  const app = useApp();
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);

  const isSoldOut = product?.tag === 'Sold-out';
  const imageHeight = app.deviceSize === 'md' ? null : 500;

  if (!router.isFallback && !product?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
    const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
    const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

    const renderPurchaseButton = () => {
      if (isSoldOut) {
        return (
          <div className="dib  ph2  pb3">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Sold Out"
              color="grey"
              fluid={false}
              icon={buttonIconPlus}
              iconFloat="left"
              inverted={false}
              loading={false}
              disabled={true}
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        );
      }

      if (product.category === 'Printed Issues') {
        return (
          <>
            <div className="dib  ph2  pb3">
              <Button
                /* Options */
                type="primary"
                size="medium"
                text="Add to Cart"
                color="black"
                fluid={false}
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
            </div>

            <Modal
              /* Options */
              size="medium"
              active={modalActive}
            >
              <div className="pb2  mb2">
                <Heading
                  /* Options */
                  htmlEntity="h3"
                  text="Subscribe instead?"
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
                  <Copy
                    /* Options */
                    text={`
                    In addition to selling our print magazines, we also
                    offer an immersive Subscription service called the Dominion,
                    Joining the Dominion is cheaper than individual prints,
                    and will give access to a great deal of additional features.
                  `}
                    color="black"
                    size="medium"
                    truncate={null}
                  />
                </div>

                <div className="measure-wide  ph4  ph0-md">
                  <p className="f-secondary  taj  f6  pb3  lh-copy">
                    <strong>We offer the following to you:</strong>
                  </p>
                  <ul className="pl3">
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      A Welcome package (+ membership card & stickers).
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      A quarter-yearly printed issue of Rendah Mag.
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      Frequent exclusive music, samples, tutorials, and more
                      from featured artists & collectives.
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      Your own Dominion Profile login.
                    </li>
                    <li className="f-secondary  tal  f6  pb2  lh-copy">
                      Discounts from all coming Rendah Mag products.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex  flex-wrap  pb2">
                <div className="col-24  flex  flex-wrap  justify-center  justify-between-md  align-center">
                  <div className="db  dib-md  ph0">
                    <Button
                      /* Options */
                      type="primary"
                      size="medium"
                      text="Subscribe"
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
                  <div className="db  dib-md  ph0  pb3  pb0-md">
                    <div
                      className="snipcart-add-item"
                      data-item-id={product?.slug}
                      data-item-price={product?.price}
                      data-item-url={`/product/${product?.slug}`}
                      data-item-description=""
                      data-item-image={product?.image1}
                      data-item-name={product?.title}
                      data-item-weight={product?.weight}
                    >
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Contunue single purchase"
                        color="black"
                        fluid={false}
                        icon={buttonIconArrowRight}
                        iconFloat="right"
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
                </div>
              </div>
            </Modal>
          </>
        );
      }

      return (
        <div className="dib  ph2  pb3">
          <div
            className="snipcart-add-item"
            data-item-id={product?.slug}
            data-item-price={product?.price}
            data-item-url={`/product/${product?.slug}`}
            data-item-description=""
            data-item-image={product?.image1}
            data-item-name={product?.title}
            data-item-weight={product?.weight}
          >
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Add to Cart"
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
      );
    };

    const descriptionTab = (
      <div className="rich-text  db  pb3">
        <div className="rich-text">
          <Sections body={product?.description} />
        </div>
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

    const dominionTab = (
      <>
        <div className="rich-text">
          <p>
            If you prefer, join our Dominion Subscription and recieve this
            product plus additional monthly features.{' '}
            <strong>We offer the following to you:</strong>
          </p>

          <ul>
            <li>A Welcome package (+ membership card & stickers).</li>
            <li>A quarter-yearly printed issue of Rendah Mag.</li>
            <li>
              Frequent exclusive music, samples, tutorials, and more from
              featured artists & collectives.
            </li>
            <li>Your own Dominion Profile login.</li>
            <li>Discounts from all coming Rendah Mag products.</li>
          </ul>

          <a className="f6  underline" href="/dominion">
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

                  <div className="product__tabs  bb  bc-black  pb3  mb4">
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

                  <div className="flex  flex-wrap  align-center">
                    {renderPurchaseButton()}

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

  // if (!product.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 1,
  //   };
  // }

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
    fallback: 'blocking',
  };
}
