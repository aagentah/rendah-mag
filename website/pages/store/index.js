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
  const [categorys, setCategorys] = useState(null);
  const [products, setProducts] = useState(null);
  const [categorysLength, setCategorysLength] = useState(4);
  const [productsLength, setProductsLength] = useState(8);

  useEffect(() => {
    const action = async () => {
      const productsData = await getAllProducts();

      setProductsLength(productsData.length);
      setProducts(productsData);
    };

    action();
  }, []);

  useEffect(() => {
    if (products) {
      console.log('products', products);
      const categoryNames = map(products, 'category');
      const uniqueCategoryNames = uniqBy(categoryNames, 'category');
      const categoryGroups = [];
      console.log('uniqueCategoryNames', uniqueCategoryNames);

      for (let i = 0; i < uniqueCategoryNames.length; i += 1) {
        const categoryProducts = filter(products, {
          category: uniqueCategoryNames[i],
        });

        const categoryWithProducts = {
          name: uniqueCategoryNames[i],
          products: categoryProducts,
        };

        categoryGroups.push(categoryWithProducts);
      }

      setCategorysLength(categoryGroups.length);
      setCategorys(categoryGroups);
    }
  }, [products]);

  return (
    <Layout
      navOffset="top"
      navOnWhite={true}
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
      {
        // <HeroStore />
      }

      <div className="">
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
              {[...Array(categorysLength)].map((categoryIteration, i) => (
                <div className="col-24" key={categoryIteration}>
                  <div className="flex  flex-wrap  pb3  bb  bc-black  mb3">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text={categorys && products && categorys[i]?.name}
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
                          product={categorys && categorys[i]?.products[ii]}
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
