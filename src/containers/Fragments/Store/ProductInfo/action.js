import sanity from '../../../../utils/sanity-store';

export const PRODUCT_REQUESTING = 'PRODUCT_REQUESTING';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/product' : 'https://rendah-mag.herokuapp.com/api/product';

export const fetchProduct = (productId: string) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUESTING, productId });

  const params = {
    limit: '0',
    productId,
  };

  const query = `*[_type == "item" && slug.current == $productId] [${params.limit}] {
      title,
      description,
      "slug": slug.current,
      "img1": image1.asset->url,
      "img2": image2.asset->url,
      "created": publishedAt,
      ...,
    }`;

  return sanity.fetch(query, params).then((res) => {
    if (res) {
      dispatch({ type: PRODUCT_SUCCESS, productId, data: res });
    } else {
      dispatch({ type: PRODUCT_FAILURE, productId, err: 'error' });
    }
  });
};

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchProduct = (state, productId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;
  const productInfo = state.productInfo[productId];
  // Preventing dobule fetching data in production
  if (productInfo && productInfo.readyStatus === PRODUCT_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchProductIfNeeded = (productId: string) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchProduct(getState(), productId)) {
    /* istanbul ignore next */
    return dispatch(fetchProduct(productId));
  }

  /* istanbul ignore next */
  return Promise.resolve();
};
