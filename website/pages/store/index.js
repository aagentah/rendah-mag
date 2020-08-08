import map from 'lodash/map';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';

import { Heading } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import CardProduct from '../../components/card/product';

import { getSiteConfig, getAllProducts } from '../../lib/sanity/requests';

export default function Post({ siteConfig, allProducts }) {
  console.log('allProducts', allProducts);

  const collectionNames = map(allProducts, 'collection');
  const uniqueCollectionNames = uniqBy(collectionNames, 'collection');
  const collectionGroups = [];

  for (var i = 0; i < uniqueCollectionNames.length; i++) {
    const products = filter(allProducts, {
      collection: uniqueCollectionNames[i],
    });

    const collectionWithProducts = {
      name: uniqueCollectionNames[i],
      products,
    };

    collectionGroups.push(collectionWithProducts);
  }

  console.log('collectionGroups', collectionGroups);

  return (
    <Layout
      navOffset={'top'}
      navOnWhite={true}
      meta={{
        siteConfig,
        title: 'Store',
        description: 'This is the Store page.',
        image: null,
      }}
      preview={null}
    >
      <Container>
        <div className="pt4  pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Store"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        {collectionGroups.length === 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - No Results for &quot;
              {params.slug}
              &quot;
            </h2>
          </section>
        )}

        {collectionGroups.length > 0 && (
          <section className="pb3">
            <div className="flex  flex-wrap">
              {collectionGroups.map((group, i) => (
                <div key={group.name}>
                  <div className="flex  flex-wrap  pb3  bb  bc-black  mb3">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text={group.name}
                      color="black"
                      size="medium"
                      truncate={0}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                  <div className="flex  flex-wrap  pb3">
                    {group.products.map((product, ii) => (
                      <div key={product.title} className="pa3">
                        <CardProduct i={ii} product={product} />
                      </div>
                    ))}
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

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const allProducts = await getAllProducts();

  return {
    props: {
      siteConfig,
      allProducts,
    },
  };
}
