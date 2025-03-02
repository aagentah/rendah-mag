import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import BlockContent from '@sanity/block-content-to-react';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';
import { useApp } from '~/context-provider/app';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

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

  if (!router.isFallback && !product?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <IconShoppingCart color="#ffffff" size={16} />;
    const buttonIconPlus = <IconPlus color="#000000" size={16} />;
    const buttonIconPlusWhite = <IconPlus color="#ffffff" size={16} />;
    const buttonIconMinus = <IconMinus color="#000000" size={16} />;

    const renderPurchaseButton = () => {
      if (isSoldOut) {
        return (
          <Button
            type="primary"
            size="medium"
            text="Sold Out"
            color="neutral-400"
            fluid={false}
            icon={buttonIconPlus}
            iconFloat="left"
            inverted={false}
            loading={false}
            disabled
            skeleton={false}
            onClick={null}
            withLinkProps={null}
          />
        );
      }

      if (product.category === 'Printed Issues') {
        return (
          <>
            <Button
              type="primary"
              size="medium"
              text="Purchase"
              color="neutral-400"
              fluid={false}
              icon={buttonIconPlusWhite}
              iconFloat="left"
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={() => setModalActive(true)}
              withLinkProps={null}
            />
            <Modal size="medium" active={modalActive}>
              <div className="pb-2">
                <Heading
                  htmlEntity="p"
                  text="Subscribe instead for £11?"
                  color="neutral-400"
                  size="medium"
                  truncate={0}
                  onClick={null}
                  withLinkProps={null}
                />
              </div>
              <div className="pb-2 mb-2">
                <Heading
                  htmlEntity="p"
                  text="+ free global shipping"
                  color="red-600"
                  size="small"
                  truncate={0}
                  onClick={null}
                  withLinkProps={null}
                />
              </div>
              <div className="pb-4">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Joining our subscription is cheaper than individual prints and
                  gives access to additional features.
                </p>
                <div className="max-w-prose">
                  <p className="text-neutral-600 text-sm leading-relaxed pb-3">
                    <strong>We offer the following:</strong>
                  </p>
                  <ul className="pl-3">
                    <li className="text-neutral-800 text-sm leading-relaxed pb-2">
                      3x Printed magazines per year (free global shipping).
                    </li>
                    <li className="text-neutral-800 text-sm leading-relaxed pb-2">
                      Welcome pack with stickers and membership card.
                    </li>
                    <li className="text-neutral-800 text-sm leading-relaxed pb-2">
                      Member dashboard; crafted for both artists & enthusiasts.
                    </li>
                    <li className="text-neutral-800 text-sm leading-relaxed pb-2">
                      Exclusive music, art, samples, resources, and insights.
                    </li>
                    <li className="text-neutral-800 text-sm leading-relaxed pb-2">
                      Digital access to previous prints.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center pb-3 md:pb-0">
                  <Button
                    type="primary"
                    size="small"
                    text="Subscribe"
                    color="neutral-400"
                    fluid={true}
                    icon={buttonIconPlusWhite}
                    iconFloat="left"
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    withLinkProps={{
                      type: 'next',
                      href: '/membership',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: { as: `/membership`, scroll: false },
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                  <Button
                    type="primary"
                    size="small"
                    text="Single purchase"
                    color="neutral-400"
                    fluid={true}
                    icon={buttonIconPlus}
                    iconFloat="left"
                    inverted={true}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
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
          type="primary"
          size="medium"
          text="Purchase"
          color="neutral-400"
          fluid={false}
          icon={buttonIconPlusWhite}
          iconFloat="left"
          inverted={false}
          loading={false}
          disabled={false}
          skeleton={false}
          onClick={null}
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

    return (
      <div className="bg-gray-50">
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
          <Container>
            {isSoldOut && (
              <div className="mb-8">
                <div className="relative">
                  <div className="border border-neutral-400 rounded-lg p-4 md:px-6 relative">
                    <Heading
                      htmlEntity="h1"
                      text="Print sold out?"
                      color="neutral-400"
                      size="large"
                      truncate={null}
                      withLinkProps={null}
                    />
                    <p className="text-neutral-400 text-sm leading-relaxed my-3">
                      We reserve some copies of our latest print for those
                      wishing to subscribe instead. Joining our Dominion
                      Subscription is cheaper than individual prints and gives
                      additional features.
                    </p>
                    <Button
                      type="primary"
                      size="small"
                      text="Subscribe"
                      color="neutral-400"
                      fluid={false}
                      icon={buttonIconPlusWhite}
                      iconFloat="left"
                      inverted={false}
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      withLinkProps={{
                        type: 'next',
                        href: '/membership',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: { as: `/membership`, scroll: false },
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              <div className="flex justify-center col-span-4">
                <ImageNew
                  imageObject={product?.imageObject}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="flex flex-col justify-center col-span-8 gap-y-4">
                <Heading
                  htmlEntity="h1"
                  text={product?.title}
                  color="neutral-400"
                  size="large"
                  truncate={null}
                  withLinkProps={null}
                  className="mb-4"
                />
                {product?.tag && product?.tag !== 'None' && (
                  <Label
                    customClass="inline text-xxs px-2 py-0.5 border border-neutral-400 text-neutral-400"
                    text={product?.tag}
                    color="neutral-400"
                    backgroundColor=""
                    onClick={null}
                    withLinkProps={null}
                  />
                )}
                <p className="text-neutral-400 text-2xl font-bold mb-6">
                  £{product?.price}
                </p>
                <div className="rich-text mb-8 text-neutral-400">
                  <BlockContent
                    blocks={product?.description}
                    serializers={SANITY_BLOCK_SERIALIZERS}
                  />
                </div>
                <div className="mb-8">{renderPurchaseButton()}</div>
              </div>
            </div>
            {product.images?.length && (
              <div className="mb-24">
                <div className="mb-8">
                  <Heading
                    htmlEntity="h1"
                    text="Additional shots"
                    color="neutral-400"
                    size="medium"
                    truncate={null}
                    withLinkProps={null}
                    className="mb-6"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <ImageNew imageObject={image.imageObject} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Layout>
      </div>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const product = await getProduct(params.slug);
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
        params: { slug: product.slug },
      })) || [],
    fallback: 'blocking',
  };
}
