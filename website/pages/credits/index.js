import { useEffect, useState } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import Link from 'next/link';

import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Button from '~/components/elements/button';

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

  console.log('products', products);

  useEffect(() => {
    if (products) {
      const categoryNames = map(products, 'category');
      const uniqueCategoryNames = uniqBy(categoryNames, 'category');
      const categoryGroups = [];

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
      navOnWhite
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
      <div className="">
        <Container>
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Credits"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />

          <section className="pb3  pt5">
            <div className="flex  flex-wrap">
              {[...Array(categorysLength)].map((categoryIteration, i) => {
                if (categorys && products && categorys[i]?.name) {
                  return (
                    <div className="col-24" key={categoryIteration}>
                      <div className="flex  flex-wrap  relative  bb  bc-black  mb4">
                        <div className="absolute  left  bottom  pa2  bg-black  nb3">
                          <h2 className="t-primary  f5  white">
                            {categorys && products && categorys[i]?.name}
                          </h2>
                        </div>
                      </div>
                      <div className="flex  flex-wrap  pb3">
                        {[...Array(productsLength)].map(
                          (productIteration, ii) =>
                            products[ii]?.credits?.length && (
                              <div
                                key={productIteration}
                                className="col-24  pa3  flex  flex-wrap  bb  bc-silver"
                              >
                                <div className="col-24  col-12-md  pa3  flex  align-center  justify-center  justify-start-md">
                                  <p className="t-primary  f5">
                                    {products[ii].title}
                                  </p>
                                </div>
                                <div className="col-24  col-12-md  pa3  flex  align-center  justify-center  justify-end-md">
                                  <Button
                                    /* Options */
                                    type="primary"
                                    size="small"
                                    text="View Credits"
                                    color="black"
                                    fluid={false}
                                    icon={null}
                                    iconFloat="left"
                                    inverted={false}
                                    loading={false}
                                    disabled={false}
                                    skeleton={false}
                                    onClick={null}
                                    /* Children */
                                    withLinkProps={
                                      products[ii]?.slug && {
                                        type: 'next',
                                        href: '/credits/[slug]',
                                        target: null,
                                        routerLink: Link,
                                        routerLinkProps: {
                                          as: `/credits/${products[ii]?.slug}`,
                                          scroll: false,
                                        },
                                      }
                                    }
                                  />
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  );
                }
              })}
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
