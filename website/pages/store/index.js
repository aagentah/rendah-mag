import { useEffect, useState } from 'react';
import Head from 'next/head';
import map from 'lodash/map';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';

import { Heading } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardProduct from '~/components/card/product';
import HeroStore from '~/components/hero/store';

import { getSiteConfig, getAllProducts } from '~/lib/sanity/requests';

export default function Store({ siteConfig }) {
  const [collections, setCollections] = useState(null);
  const [products, setProducts] = useState(null);
  const [collectionsLength, setCollectionsLength] = useState(4);
  const [productsLength, setProductsLength] = useState(8);

  const handleAsyncTasks = async () => {
    const productsData = await getAllProducts();

    setProductsLength(productsData.length);
    setProducts(productsData);
  };

  useEffect(() => {
    handleAsyncTasks();
  }, []);

  useEffect(() => {
    if (products) {
      const collectionNames = map(products, 'collection');
      const uniqueCollectionNames = uniqBy(collectionNames, 'collection');
      const collectionGroups = [];

      for (let i = 0; i < uniqueCollectionNames.length; i += 1) {
        const collectionProducts = filter(products, {
          collection: uniqueCollectionNames[i],
        });

        const collectionWithProducts = {
          name: uniqueCollectionNames[i],
          products: collectionProducts,
        };

        collectionGroups.push(collectionWithProducts);
      }

      setCollectionsLength(collectionGroups.length);
      setCollections(collectionGroups);
    }
  }, [products]);

  return (
    <Layout
      navOffset={null}
      navOnWhite={false}
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Store',
        description: null,
        image: null,
      }}
      preview={null}
    >
      <HeroStore />

      <div className="pt5  pt6-md">
        <Container>
          <div className="pb2">
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

          <section className="pb3  pt4">
            <div className="flex  flex-wrap">
              {[...Array(collectionsLength)].map((collectionIteration, i) => (
                <div className="col-24" key={collectionIteration}>
                  <div className="flex  flex-wrap  pb3  bb  bc-black  mb3">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text={collections && products && collections[i]?.name}
                      color="black"
                      size="medium"
                      truncate={0}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                  <div className="flex  flex-wrap  pb3">
                    {[...Array(productsLength)].map((productIteration, ii) => (
                      <div
                        key={productIteration}
                        className="col-24  col-6-md  pa3"
                      >
                        <CardProduct
                          i={ii}
                          product={collections && collections[i]?.products[ii]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
