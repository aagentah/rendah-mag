/* eslint-disable import/no-named-as-default,
import/no-named-as-default-member */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../../components/Loading';
import Product from '../../../../components/Product';

export class ProductInfo extends PureComponent {
  renderProduct = () => {
    const { productInfo, match: { params } } = this.props;
    const productInfoById = productInfo[params.id];

    if (
      !productInfoById ||
      productInfoById.readyStatus === action.PRODUCT_REQUESTING ||
      productInfoById.readyStatus === action.PRODUCT_FAILURE
    ) {
      return <Loading type="ProductInfo" />;
    }

    return <Product info={productInfoById.info} {...this.props} />;
  }

  render() {
    return (
      <div>
        {this.renderProduct()}
      </div>
    );
  }
}

const connector = connect(
  ({ productInfo }) => ({ productInfo }),
  dispatch => ({
    fetchProductIfNeeded: (id: string) => dispatch(action.fetchProductIfNeeded(id)),
  }),
);

ProductInfo.propTypes = {
  productInfo: PropTypes.shape({
    productId: PropTypes.string,
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    info: PropTypes.object,
  }),
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ProductInfo.defaultProps = {
  productInfo: {
    productId: '',
    readyStatus: '',
    err: '',
    info: {},
  },
  match: [],
  fetchProductIfNeeded: () => {},
};

const frontload = props =>
  Promise.all([
    props.fetchProductIfNeeded(props.match.params.id),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(ProductInfo);
