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
            text="Store"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />

          <section className="pb3  pt5">
            <div className="flex flex-wrap">
              {[...Array(categorysLength)].map((categoryIteration, i) => {
                if (categorys && products && categorys[i]?.name) {
                  return (
                    <div className="col-24 pb4" key={i}>
                      <div className="flex flex-wrap relative bb bc-black mb4">
                        <div className="absolute left bottom pa2 bg-black nb3">
                          <h2 className="t-primary f5 white">
                            {categorys && products && categorys[i]?.name}
                          </h2>
                        </div>
                      </div>
                      <div className="flex flex-wrap pb3">
                        {[...Array(categorys[i].productsLength)].map(
                          (productIteration, ii) => (
                            <div key={ii} className="col-24 col-6-md pa3">
                              <CardProduct
                                i={ii}
                                product={
                                  categorys && categorys[i]?.products[ii]
                                }
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
