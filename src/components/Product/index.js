/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state,
jsx-a11y/no-static-element-interactions */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import ReactPixel from 'react-facebook-pixel';
import BlockContent from '@sanity/block-content-to-react';

import Seo from './Seo';
import AnimatedImage from '../Elements/AnimatedImage';

export class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedMaxQuantity: null,
      selectedVariant: null,
      selectedImageUrl: null,
    };
  }

  componentWillMount() {
    const product = this.props.info;

    if (this.props.location.search) {
      const values = queryString.parse(this.props.location.search);

      this.setState({
        selectedVariant: values.variant,
      });
    }

    ReactPixel.fbq('track', 'ViewContent', {
      content_name: product.title,
      content_ids: [product.slug],
      content_type: 'product',
      product_catalog_id: 715844545502722,
      value: product.specialPrice || product.price,
      currency: 'GBP',
    });
  }

  renderVariant = (variant) => {
    const handleDisabled = (availability) => {
      if (availability === 'soldOut') return true;
      if (availability === 'limited') return false;
      if (availability === 'unlimited') return false;

      return false;
    };

    return (
      <div className="pr2">
        <button
          className={`
          ${
            this.state.selectedVariant === variant.type
              ? 'btn  btn--primary  bg-black  ba  bw1  bc-black  white  tac'
              : 'btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac'
          }`}
          type="button"
          disabled={handleDisabled(variant.availability)}
          onClick={() => {
            this.setState({
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
  };

  renderThumbnail = (product, img) => {
    if (img) {
      return (
        <div className="pr2">
          <div
            className="w3  db  shadow2  cp"
            onClick={() => {
              this.setState({ selectedImageUrl: img });
            }}
          >
            <AnimatedImage lazy src={img} alt={product.title} styles="fade-in-zoom-in  w-100" />
          </div>
        </div>
      );
    }

    return false;
  };

  renderPrice = (product) => {
    if (product.specialPrice) {
      return (
        <p className="t-title  grey  f4  pb3">
          <span className="strike  o-50  pr1">£{product.price}</span> £{product.specialPrice}
        </p>
      );
    }

    return <p className="t-title  grey  f4  pb3">£{product.price}</p>;
  };

  renderTag = (product) => {
    switch (product.tag) {
      case 'None':
        return false;
      case 'Sale':
        return (
          <span className="dib  t-body  bg-sale  white  f6  tac  pv1  ph2  mr2  br-pill">
            {product.tag}
          </span>
        );
      case 'Pre-order':
        return (
          <span className="dib  t-body  bg-pre-order  white  f6  tac  pv1  ph2  mr2  br-pill">
            {product.tag}
          </span>
        );
      default:
        return false;
    }
  };

  render() {
    const product = this.props.info;
    const images = [product.img1, product.img2, product.img3];

    const buyButtonProps = {};

    if (product.recurringType && product.recurringInterval) {
      buyButtonProps['data-item-payment-interval'] = product.recurringType;
      buyButtonProps['data-item-payment-interval-count'] = product.recurringInterval;
    }

    return (
      <React.Fragment>
        <Seo
          title={product.title}
          slug={product.slug}
          description={product.title}
          img={product.img1}
          price={product.specialPrice || product.price}
        />

        <div className="product">
          <article className="flex  flex-wrap  pa3">
            <figure className="col-24  col-12-md  pb3  pb0-md">
              <div className="flex  w-100">
                <div className="db  shadow2">
                  <AnimatedImage
                    lazy
                    src={this.state.selectedImageUrl || product.img1}
                    alt={product.title}
                    styles="fade-in-zoom-in  w-100"
                  />
                </div>
              </div>
              <div className="flex  w-100  pv3">
                {images.map(img => this.renderThumbnail(product, img))}
              </div>
            </figure>

            <div className="col-24  col-12-md  ph2  ph4-md">
              <div className="dib  pv2  mt2  tal">{this.renderTag(product)}</div>

              <p className="t-title  grey  f4  bold  pb2">{product.title}</p>
              {this.renderPrice(product)}

              <div className="product__description  t-body  lh-copy  grey  f5  pb4">
                <BlockContent blocks={product.description} />
              </div>

              <p className="t-body  grey  f6  pb2">Sizes:</p>
              <div className="flex  flex-wrap  pb4">
                {product.variants.map(variant => this.renderVariant(variant))}
              </div>

              <button
                className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac  w-100  snipcart-add-item"
                type="button"
                data-item-id={`${product.slug}-${this.state.selectedVariant}`}
                data-item-name={`${product.title} (${this.state.selectedVariant})`}
                data-item-weight={product.weight || 0}
                data-item-price={product.specialPrice || product.price}
                data-item-url={`https://rendahmag.com/product/${product.slug}?variant=${
                  this.state.selectedVariant
                }`}
                data-item-description={product.title}
                data-item-max-quantity={this.state.selectedMaxQuantity}
                disabled={!this.state.selectedVariant}
                {...buyButtonProps}
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
    slug: PropTypes.string,
    specialPrice: PropTypes.string,
    price: PropTypes.string,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

Product.defaultProps = {
  info: {
    slug: '',
    specialPrice: '',
    price: '',
  },
  location: {
    search: '',
  },
};

export default Product;
