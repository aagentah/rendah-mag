import sanity from '../../../../utils/sanity-store';

export const PRODUCTS_INVALID = 'PRODUCTS_INVALID';
export const PRODUCTS_REQUESTING = 'PRODUCTS_REQUESTING';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/products' : 'https://rendah-mag.herokuapp.com/api/products';

export const fetchProducts = (id: string, range: Array) =>
  (dispatch) => {
    dispatch({ type: PRODUCTS_REQUESTING });

    const params = {
      range: `${range[0] - 1}..${range[1] - 1}`,
      id,
    };

    let query;
    console.log('params.id', params.id);
    if (params.id) {
      query = `*[_type == "collection" && slug.current == "${params.id}" || _type == "category" && slug.current == "${params.id}"] [0] {
        ...,
        "items": *[_type == "item" && references(^._id)] | order(publishedAt desc) [${params.range}] {
          title,
          description,
          price,
          "slug": slug.current,
          "img": image.asset->url,
          ...,
          }
        }`;
    } else {
      query = `*[_type == "collection"] [0] {
        ...,
        "items": *[_type == "item" && references(^._id)] | order(publishedAt desc) [${params.range}] {
          title,
          description,
          price,
          "slug": slug.current,
          "img": image.asset->url,
          ...,
          }
        }`;
    }

    return sanity.fetch(query).then((res) => {
      console.log(' res', res);
      if (res.items) {
        dispatch({ type: PRODUCTS_SUCCESS, data: res });
      } else {
        dispatch({ type: PRODUCTS_FAILURE, err: 'error' });
      }
    });
  };


/* istanbul ignore next */
export const fetchProductsIfNeeded = (id: string, limit: number) => dispatch =>
  dispatch(fetchProducts(id, limit));
