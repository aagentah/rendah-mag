/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../../components/Loading';
import ProductList from '../../../../components/ProductList';


export class Products extends PureComponent {
  renderProductList = () => {
    const { products } = this.props;

    if (
      !products.readyStatus ||
      products.readyStatus === action.PRODUCTS_INVALID ||
      products.readyStatus === action.PRODUCTS_REQUESTING ||
      products.readyStatus === action.PRODUCTS_FAILURE
    ) {
      return <Loading type="Products" />;
    }

    return <ProductList {...this.props} list={products.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderProductList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ products }) => ({ products }),
  dispatch => ({
    fetchProductsIfNeeded: (query: string, range: Array) =>
      dispatch(action.fetchProductsIfNeeded(query, range)),
  }),
);

Products.propTypes = {
  products: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  type: PropTypes.string,
  range: PropTypes.arrayOf(PropTypes.number),
};

Products.defaultProps = {
  products: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchProductsIfNeeded: () => {},
  type: '',
  range: [],
};

const frontload = props =>
  Promise.all([
    props.fetchProductsIfNeeded(props.query, props.range),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(Products);
