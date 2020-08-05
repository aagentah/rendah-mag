import { Heading, Copy, Label, Image } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import CardBlog from '../../components/card/blog';

import {
  getSiteConfig,
  getProduct,
  imageBuilder,
} from '../../lib/sanity/requests';

export default function Post({ siteConfig, product }) {
  console.log('product', product);
  return (
    <Layout
      navOffset={'top'}
      navOnWhite={true}
      meta={{
        siteConfig,
        title: 'Search',
        description: 'This is the Search page.',
        image: null,
      }}
      preview={null}
    >
      <Container>
        <div className="flex  flex-wrap  pb5">
          <div className="col-24  col-12-md  ph2  pb3">
            <div className="shadow2">
              <Image
                /* Options */
                src={imageBuilder
                  .image(product.image1)
                  .height(1000)
                  .width(1000)
                  .url()}
                placeholder={imageBuilder
                  .image(product.image1)
                  .height(25)
                  .width(25)
                  .url()}
                alt={product.title}
                figcaption={null}
                height={500}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
          <div className="col-24  col-12-md  ph3-md">
            <div className="db  ph2  pb2">
              <Heading
                /* Options */
                htmlEntity="h1"
                text={product.title}
                color="black"
                size="large"
                truncate={null}
                reveal={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="db  ph2  pb3">
              <Label
                /* Options */
                customClass="ph2"
                text={`£${product.price}`}
                color="white"
                backgroundColor="black"
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params, preview = false }) {
  console.log('params', params);
  const siteConfig = await getSiteConfig();
  const product = await getProduct(params.slug);
  console.log('product', product);
  return {
    props: {
      siteConfig,
      product,
    },
  };
}
