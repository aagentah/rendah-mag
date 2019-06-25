/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';

// import Seo from './Seo';
import AnimatedImage from '../Elements/AnimatedImage';

export class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedPrice: null,
      selectedMaxQuantity: null,
      selectedVariant: null,
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      const values = queryString.parse(this.props.location.search);

      this.setState({
        selectedVariant: values.variant,
      });
    }
  }

  renderVariant = variant => (
    <div className="pr2">
      <button
        className={`
          ${
            this.state.selectedVariant === variant.type
              ? 'btn  btn--primary  bg-black  ba  bw1  bc-black  white  tac'
              : 'btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac'
          }`}
        type="button"
        onClick={() => {
          this.setState({
            selectedPrice: variant.type,
            selectedMaxQuantity: variant.quantity,
            selectedVariant: variant.type,
          });

          const history = createBrowserHistory();
          history.push({ search: `?variant=${variant.type}` });
        }}
      >
        {variant.type}
      </button>
    </div>
  );

  render() {
    const product = this.props.info;
    console.log(product);

    return (
      <React.Fragment>
        <div className="product">
          <article className="flex  flex-wrap  pa3">
            <figure className="col-24  col-12-md">
              <div className="db">
                <AnimatedImage
                  lazy
                  src={product.img}
                  alt={product.title}
                  styles="fade-in-zoom-in  h12  w-100"
                />
              </div>
            </figure>

            <div className="col-24  col-12-md  pa3">
              <p className="t-title  grey  f4  bold  pb2">{product.title}</p>
              <p className="t-title  grey  f4  bold  pb3">£{product.price}</p>
              <p className="t-body  grey  f5  pb4">{product.description}</p>

              <p className="t-body  grey  f6  pb2">Sizes:</p>
              <div className="flex  flex-wrap  pb4">
                {product.variants.map(variant => this.renderVariant(variant))}
              </div>

              <button
                className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac  snipcart-add-item"
                type="button"
                data-item-id={`${product.slug}-${this.state.selectedVariant}`}
                data-item-name={`${product.title} (${this.state.selectedVariant})`}
                data-item-price={product.price}
                data-item-url={`https://rendahmag.com/product/${product.slug}?variant=${
                  this.state.selectedVariant
                }`}
                data-item-description={product.description}
                data-item-max-quantity={this.state.selectedMaxQuantity}
                disabled={!this.state.selectedPrice}
              >
                Add to Cart
              </button>
            </div>
          </article>
        </div>
      </React.Fragment>
    );
  }
}

Product.propTypes = {
  info: PropTypes.shape({
    product: PropTypes.shape({}),
    teamMember: PropTypes.shape({}),
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

Product.defaultProps = {
  info: {
    product: {},
    teamMember: {},
  },
  location: {
    search: '',
  },
};

export default Product;
