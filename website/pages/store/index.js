import { useEffect, useState } from 'react';
import uniq from 'lodash/uniq';

import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardProduct from '~/components/card/product';

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

      const categoryNames = products.map((product) => product.category);
      console.log('categoryNames', categoryNames);

      const uniqueCategoryNames = uniq(categoryNames);
      console.log('uniqueCategoryNames', uniqueCategoryNames);

      const categoryGroups = [];

      for (let i = 0; i < uniqueCategoryNames.length; i += 1) {
        const categoryProducts = products.filter(
          (product) => product.category === uniqueCategoryNames[i]
        );

        const categoryWithProducts = {
          name: uniqueCategoryNames[i],
          products: categoryProducts,
          productsLength: categoryProducts.length, // Adding the number of products
        };

        console.log('categoryWithProducts', categoryWithProducts);

        categoryGroups.push(categoryWithProducts);
      }

      setCategorysLength(categoryGroups.length);
      setCategorys(categoryGroups);
    }

    console.log('products', products);
    console.log('categorys', categorys);
  }, [products]);

  return (
    <Layout
      navOffset="top"
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
        <div className="container">
          <div className="my-12">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Store"
              color="neutral-300"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <section className="pb-12">
            {[...Array(categorysLength)].map((categoryIteration, i) => {
              if (categorys && products && categorys[i]?.name) {
                return (
                  <div className="w-full" key={i}>
                    <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />

                    <div className="flex flex-wrap mb-8">
                      <h2 className="text-sm text-neutral-500">
                        {categorys[i]?.name}
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-12 mb-8">
                      {[...Array(categorys[i].productsLength)].map(
                        (productIteration, ii) => (
                          <div key={i}>
                            <CardProduct
                              i={ii}
                              product={categorys && categorys[i]?.products[ii]}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </section>
        </div>
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
