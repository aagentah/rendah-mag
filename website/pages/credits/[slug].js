import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';

import { useApp } from '~/context-provider/app';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
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

  console.log('product?.creditsItems', product?.creditsItems);

  const submit = async (priceId) => {
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
              worldwide: product.shippingWorldwide,
            },
            discount,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    if (response.ok) {
      // Success
      const data = await response.json();
      window.location.href = data.url;
    }
  };

  if (!router.isFallback && product?.slug) {
    const descriptionTab = (
      <div className="rich-text  rich-text__product">
        <Sections body={product?.description} />
      </div>
    );

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
          <div className="pt4">
            <Container>
              {product?.creditsItems?.length ? (
                <div className="ba  bc-red  shadow2  pa4  mb5">
                  <div className="rendah-red  t-primary  bold  f3  f2-md  pb3">
                    Credits ({product?.title})
                  </div>

                  {product?.creditsItems.map(
                    ({ feature, creditsItemPages }, i) => (
                      <div key={i} className="col-24  col-12-md  pa3">
                        <div className="silver  t-primary  bold  f4-md  f3-md  pb3">
                          {feature}
                        </div>
                        <div>
                          {creditsItemPages?.length &&
                            creditsItemPages.map(
                              ({ pages, description }, i) => (
                                <div key={i} className="col-24  pa3">
                                  <div className="rendah-red  t-primary  bold  f5  pb3">
                                    {pages}
                                  </div>
                                  <div className="pa3">
                                    <div className="rich-text  rich-text__product">
                                      <Sections body={description} />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="rendah-red  t-primary  bold  f4  f5-md  pb3  tac  mla  mra  mt5">
                  No credits available for {product?.title}
                </div>
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
