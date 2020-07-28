import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';

import { Image, Heading, Button, Icon } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import CardProduct from '../../components/card/product';

import {
  imageBuilder,
  getSiteConfig,
  getProductAndMore,
} from '../../lib/sanity/requests';

export default function Product({
  siteConfig,
  product,
  moreProducts,
  preview,
}) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isFallback && !product?.slug) Router.push('/404');
  }, [router.isFallback, product?.slug]);

  if (router.isFallback) return <p>Loading...</p>;

  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

  if (!router.isFallback && product?.slug) {
    return (
      <Layout
        meta={{
          siteConfig,
          title: product.title,
          description: product.excerpt,
          image: product.coverImage,
        }}
        preview={preview}
      >
        <Container>
          <article className="flex  flex-wrap">
            <section className="col-24  col-12-md">
              <Image
                /* Options */
                src={imageBuilder
                  .image(product.coverImage)
                  .height(1080)
                  .width(1080)
                  .url()}
                placeholder={imageBuilder
                  .image(product.coverImage)
                  .height(108)
                  .width(108)
                  .url()}
                alt={product.title}
                figcaption={null}
                height={500}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </section>

            <section className="col-24  col-12-md  ph4  pv3">
              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={product.title}
                  color="black"
                  size="large"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  almost-black  lh-copy  pb4">
                {product.price}
              </p>

              <div className="post__body  pb4">
                <BlockContent blocks={product.content} />
              </div>

              <div className="flex  flex-wrap  align-center">
                <div className="pr3">
                  <div
                    className="snipcart-add-item"
                    data-item-id={product.slug}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.slug}`}
                    data-item-description=""
                    data-item-image={product.coverImage}
                    data-item-name={product.title}
                  >
                    <Button
                      /* Options */
                      type="primary"
                      size="medium"
                      text="Add to cart"
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
                <div className="pr3">
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
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                </div>
              </div>

              <span className="snipcart-items-count" />
              <span className="snipcart-total-price" />
            </section>
          </article>

          {moreProducts.length > 0 && (
            <section className="pb3">
              <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                - More Products
              </h2>

              <div className="flex  flex-wrap">
                {moreProducts.map((p, i) => (
                  <div key={p.slug} className="col-24  col-6-md">
                    <div className="pa3">
                      <CardProduct i={i} product={p} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </Container>
      </Layout>
    );
  }

  return false;
}

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getProductAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      product: data.product || null,
      moreProducts: data.moreProducts || null,
    },
  };
}
