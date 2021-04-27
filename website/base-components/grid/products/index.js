import { useEffect, useState } from 'react';

import Container from '~/components/layout/container';
import CardProduct from '~/components/card/product';

import { getAllProducts } from '~/lib/sanity/requests';

export default function GridProducts({ padding, marginTop, marginBottom }) {
  const [products, setProducts] = useState(null);
  const [productsLength, setProductsLength] = useState(12);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await getAllProducts();
      setProductsLength(productsData.length);
      setProducts(productsData);
    };

    getProducts();
  }, []);

  return (
    <>
      {productsLength > 0 && (
        <Container>
          <section
            className={`grid  grid--products  pv${padding}  mt${marginTop}  mb${marginBottom}`}
          >
            <div className="flex  flex-wrap">
              {[...Array(productsLength)].map((iteration, i) => (
                <div key={iteration} className="col-24  col-6-md">
                  <div className="pa3">
                    <CardProduct i={i} product={products && products[i]} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
