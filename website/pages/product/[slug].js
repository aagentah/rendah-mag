import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BlockContent from '@sanity/block-content-to-react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';
import { useApp } from '~/context-provider/app';
import Table from '~/components/table';

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

const Timeline = dynamic(() => import('~/components/timeline'));

export default function Product({ siteConfig, product }) {
  const app = useApp();
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState('');
  const isMobile = app.deviceSize === 'md';
  const height = app.deviceSize === 'md' ? 500 : 400;

  // Keen slider for Additional shots on mobile
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      const interval = setInterval(() => {
        instanceRef.current?.moveToIdx(
          instanceRef.current.track.details.abs + 1
        );
      }, 7500);
      return () => clearInterval(interval);
    }
  }, [instanceRef]);

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
          <div className="container my-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 mb-12">
              <div className="md:col-span-3 max-w-md mb-12">
                <p className="text-md md:text-lg text-neutral-400 leading-relaxed text-left mb-8">
                  <strong>{product?.title}</strong>
                </p>

                <div className="max-w-md">
                  <div className="rich-text rich-text-spacing text-sm">
                    <BlockContent
                      blocks={product?.description}
                      serializers={SANITY_BLOCK_SERIALIZERS}
                    />
                  </div>

                  <Table
                    className="text-xs md:text-sm py-8"
                    rows={[
                      {
                        left: 'Tag(s)',
                        right: product?.tag,
                        rightClassName: 'text-right',
                      },
                      {
                        left: 'Price',
                        right: `£${product?.price}`,
                        rightClassName: 'text-right',
                      },
                      {
                        left: 'Available Shipping',
                        right: 'Globally',
                        rightClassName: 'text-right',
                      },
                    ]}
                  />

                  {renderPurchaseButton()}
                </div>
              </div>

              <div className="md:col-span-1">
                <div>
                  <ImageNew
                    height={height}
                    imageObject={product?.imageObject}
                    className="brightness-75"
                  />
                </div>
              </div>
            </div>
          </div>

          <Container>
            {product.images?.length && (
              <div className="mb-24">
                <div className="mb-8">
                  <Heading
                    htmlEntity="h1"
                    text="Additional shots"
                    color="neutral-500"
                    size="medium"
                    truncate={null}
                    withLinkProps={null}
                    className="mb-6"
                  />
                </div>
                {isMobile ? (
                  <div className="relative">
                    <div ref={sliderRef} className="keen-slider">
                      {product.images.map((image, index) => (
                        <div key={index} className="keen-slider__slide">
                          <ImageNew
                            imageObject={image.imageObject}
                            alt={`Additional shot ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4 space-x-2">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => instanceRef.current?.moveToIdx(idx)}
                          className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                            currentSlide === idx
                              ? 'bg-neutral-300'
                              : 'bg-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12">
                    {product.images.map((image, index) => (
                      <div key={index}>
                        <ImageNew imageObject={image.imageObject} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Container>

          <Timeline />
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
