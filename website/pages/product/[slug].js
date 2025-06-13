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
import SubscriptionBanner from '~/components/subscription-banner';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
  getActiveMembership,
  imageBuilder,
} from '~/lib/sanity/requests';

import { getCurrencySymbol, formatPrice } from '~/lib/utils/currency';
import {
  getRegionalPricing,
  getDisplayRegion,
} from '~/lib/utils/regional-pricing';

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

export default function Product({ siteConfig, product, membership }) {
  const app = useApp();
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState('');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [customerCountry, setCustomerCountry] = useState(null);
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

  // Get customer country for shipping restrictions
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // @why: Add timeout to prevent hanging on slow IP detection service
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://ipapi.co/country_code/', {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const countryCode = await response.text();
          setCustomerCountry(countryCode.trim());
        } else {
          throw new Error('IP detection service unavailable');
        }
      } catch (error) {
        console.error('Failed to detect country:', error);
        // @why: Fallback to global shipping if detection fails
        setCustomerCountry(null);
      }
    };

    detectCountry();
  }, []);

  const isSoldOut = product?.tag === 'Sold-out';

  // Function to get regional price based on customer country
  const getRegionalPrice = () => {
    if (!product?.regionalPricing || !customerCountry) {
      return { price: product?.price || 0, currency: 'GBP' }; // Fallback to legacy price
    }

    // @why: Use centralized utility to ensure consistency across the platform
    return getRegionalPricing(product.regionalPricing, customerCountry);
  };



  // Function to get membership regional price based on customer country
  const getMembershipRegionalPrice = () => {
    if (!membership?.regionalPricing || !customerCountry) {
      return { price: 12, currency: 'GBP' }; // Fallback to legacy price
    }

    // @why: Use centralized utility to ensure consistency with membership page
    return getRegionalPricing(membership.regionalPricing, customerCountry);
  };

  const handlePurchase = async () => {
    setIsCheckoutLoading(true);

    try {
      const response = await fetch('/api/stripe/product-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productSlug: product.slug, // CMS-driven: use actual product slug from Sanity
          quantity: 1,
          customerCountry: customerCountry,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Track Meta Pixel event before redirect
        if (typeof window !== 'undefined' && window.fbq) {
          console.log('Meta Pixel: InitiateCheckout fired (product)');
          window.fbq('track', 'InitiateCheckout');
        }

        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error starting checkout. Please try again.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (!router.isFallback && !product?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <IconShoppingCart color="#ffffff" size={16} />;
    const buttonIconPlus = <IconPlus color="#000000" size={16} />;
    const buttonIconPlusWhite = <IconPlus color="#ffffff" size={16} />;
    const buttonIconMinus = <IconMinus color="#000000" size={16} />;

    const renderPurchaseButton = () => {
      // Show loading state while detecting customer country
      const isCountryLoading = customerCountry === null;

      if (isSoldOut) {
        return null
      }

      if (product.category === 'Printed Issues') {
        return (
          <>
            <Button
              type="primary"
              size="medium"
              text={isCountryLoading ? 'Loading...' : 'Purchase'}
              color="rendah-red"
              fluid={false}
              icon={buttonIconPlusWhite}
              iconFloat="left"
              inverted={false}
              loading={isCheckoutLoading || isCountryLoading}
              disabled={isCheckoutLoading || isCountryLoading}
              skeleton={false}
              onClick={() => setModalActive(true)}
              withLinkProps={null}
            />

            <p className="text-xs text-neutral-500 text-balance pt-2">
              [or join membership <i>instead</i> for{' '}
              <Link href={`/membership`}>
                <span className="text-neutral-500 underline">
                  {(() => {
                    // @why: Show loading state until customer country is detected
                    if (customerCountry === null) {
                      return '...';
                    }
                    const { price, currency } = getMembershipRegionalPrice();
                    return `${getCurrencySymbol(currency)}${price}`;
                  })()}
                </span>
              </Link>
              ]
            </p>

            <Modal size="large" active={modalActive}>
              <div className="pb-3">
                <h2 className="text-balance">
                  Join membership <i>instead</i> for{' '}
                  <Link href={`/membership`}>
                    <span className="text-rendah-red underline">
                      {(() => {
                        // @why: Show loading state until customer country is detected
                        if (customerCountry === null) {
                          return '...';
                        }
                        const { price, currency } =
                          getMembershipRegionalPrice();
                        return `${getCurrencySymbol(currency)}${price}`;
                      })()}
                      ?
                    </span>
                  </Link>
                </h2>
              </div>

              <div className="pb-3 md:pb-4">
                <p className="text-neutral-500 text-xs md:text-sm pb-2">
                  It's <i>FREE</i> Global Shipping & Includes:
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
                  loading={isCheckoutLoading || isCountryLoading}
                  disabled={isCheckoutLoading || isCountryLoading}
                  skeleton={false}
                  onClick={handlePurchase}
                  withLinkProps={null}
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
          text={isCountryLoading ? 'Loading...' : 'Purchase'}
          color="neutral-400"
          fluid={false}
          icon={buttonIconPlusWhite}
          iconFloat="left"
          inverted={false}
          loading={isCheckoutLoading || isCountryLoading}
          disabled={isCheckoutLoading || isCountryLoading}
          skeleton={false}
          onClick={handlePurchase}
          withLinkProps={null}
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
                        ...(!isSoldOut
                          ? [
                              {
                                left: 'Price',
                                right: (() => {
                                  // Show loading state until customer country is detected
                                  if (customerCountry === null) {
                                    return '...';
                                  }
                                  const { price, currency } = getRegionalPrice();
                                  return `${getCurrencySymbol(currency)}${price}`;
                                })(),
                                rightClassName: 'text-right',
                              },
                            ]
                          : []),
                        {
                          left: 'Available',
                          right: (() => {
                            // Show loading state until customer country is detected
                            if (customerCountry === null) {
                              return '...';
                            }
                            return `${getDisplayRegion()} ${
                              customerCountry
                                ? `(${customerCountry})`
                                : 'Globally'
                            }`;
                          })(),
                          rightClassName: 'text-right',
                        },
                        {
                          left: 'Expected Shipping',
                          right: (
                            <span className="text-right">
                             July 2025 Onwards
                            </span>
                          ),
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

            <div className="container">
              <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
            </div>

            <SubscriptionBanner showDominionButton={false} />
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
  const membership = await getActiveMembership();
  return {
    props: {
      siteConfig,
      product,
      membership,
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
