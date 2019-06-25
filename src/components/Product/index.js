/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import Seo from './Seo';
import AnimatedImage from '../Elements/AnimatedImage';

export class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedPrice: null,
      selectedMaxQuantity: null,
      selectedType: null,
    };
  }

  renderVariant = variant => (
    <div className="pr2">
      <button
        className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac"
        type="button"
        onClick={() => {
          this.setState({
            selectedPrice: variant.type,
            selectedMaxQuantity: variant.quantity,
            selectedType: variant.type,
          });
        }}
      >
        {variant.type}
      </button>
    </div>
  );

  render() {
    const product = this.props.info;
    console.log(product);

    if (product.variants.length === 1) {
      this.setState({
        selectedPrice: product.variants[0].type,
        selectedMaxQuantity: product.variants[0].quantity,
        selectedType: product.variants[0].type,
      });
    }

    return (
      <React.Fragment>
        <div className="product">
          <article className="flex  flex-wrap  pa3">
            <figure className="col-24  col-12-md">
              <div className="db  shadow2">
                <AnimatedImage
                  lazy
                  src={product.img}
                  alt={product.title}
                  styles="fade-in-zoom-in  h10  w-100"
                />
              </div>
            </figure>

            <div className="col-24  col-12-md  pa3">
              <p className="t-title  grey  f4  bold  pb3">{product.title}</p>
              <p className="t-body  grey  f5  pb3">{product.description}</p>
              <p className="t-title  grey  f4  bold  pb4">£{product.price}</p>
              {this.state.selectedPrice}

              <div className="flex  flex-wrap">
                {product.variants.map(variant => this.renderVariant(variant))}
              </div>

              <button
                className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac  snipcart-add-item"
                type="button"
                data-item-id={product.slug}
                data-item-name={product.title}
                data-item-price={product.price}
                data-item-url={`/product/${product.slug}?variant=${this.state.selectedType}`}
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
};

Product.defaultProps = {
  info: {
    product: {},
    teamMember: {},
  },
};

export default Product;
