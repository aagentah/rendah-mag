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
    loop: false,
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
              color="rendah-red"
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
            <Modal size="large" active={modalActive}>
              <div className="pb-3 md:pb-4">
                <h2 className="text-balance">
                  Join membership <i>instead</i> for{' '}
                  <Link href={`/membership`}>
                    <span className="text-rendah-red underline">£11?</span>
                  </Link>
                </h2>
              </div>

              <div className="pb-3 md:pb-4">
                <p className="text-neutral-500 text-xs md:text-sm pb-2">
                  Free Global Shipping and includes:
                </p>
                <div className="w-full">
                  <Table
                    className="text-xs sm:text-sm py-8"
                    rows={[
                      {
                        left: 'Magazine Delivery',
                        right: (
                          <span className="text-right">
                            3x prints yearly
                            <br />
                            Membership Pack
                          </span>
                        ),
                      },
                      {
                        left: 'Dashboard Access',
                        right: (
                          <span className="text-right">
                            Membership dashboard
                            <br />
                            20% additional discount
                          </span>
                        ),
                      },
                      {
                        left: 'Digital Archive',
                        right: (
                          <span className="text-right">
                            Print Archive Access
                          </span>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="gap-4 flex flex-col md:flex-row justify-center md:justify-between">
                <Button
                  type="primary"
                  size="small"
                  text="Single purchase only"
                  color="neutral-400"
                  fluid={true}
                  icon={null}
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

                <Button
                  type="primary"
                  size="small"
                  text="Explore membership"
                  color="rendah-red"
                  fluid={true}
                  icon={null}
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
          <article className="pb-12">
            <div className="container my-12 md:my-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <div className="md:col-span-3 max-w-md mb-12">
                  <h1 className="text-neutral-300 text-left mb-8">
                    {product?.title}
                  </h1>

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
                      height={null}
                      imageObject={product?.imageObject}
                      className="brightness-75"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Container>
              {product.images?.length && (
                <div className="py-12">
                  <div className="mb-8">
                    <Heading
                      htmlEntity="h2"
                      text="Additional shots"
                      color="neutral-400"
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

            <div className="container my-12 md:my-16">
              <Timeline />
            </div>
          </article>
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
