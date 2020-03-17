/* eslint-disable import/no-named-as-default, react/no-did-mount-set-state,
jsx-a11y/no-static-element-interactions */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import ReactPixel from 'react-facebook-pixel';
import BlockContent from '@sanity/block-content-to-react';
import { Label, Heading, Button } from 'rendah-pattern-library';

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
        <div
          className="col-24  snipcart-add-item"
        >
          <Button
            /* Options */
            type={'primary'}
            size={'small'}
            text={variant.type}
            color={'black'}
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={this.state.selectedVariant !== variant.type}
            loading={false}
            disabled={handleDisabled(variant.availability)}
            onClick={() => {
              this.setState({
                selectedMaxQuantity: variant.quantity,
                selectedVariant: variant.type,
              });

              const history = createBrowserHistory();
              history.push({ search: `?variant=${variant.type}` });
            }}
            /* Children */
            withLinkProps={null}
          />
        </div>
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
    console.log('product.tag', product.tag);

    switch (product.tag) {
      case 'None':
        return false;
      case 'Sale':
        return (
          <Label
            /* Options */
            type={'category'}
            text={product.tag}
            color={'black'}
            backgroundColor={null}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        );
      case 'Pre-order':
        return (
          <Label
            /* Options */
            type={'category'}
            text={product.tag}
            color={'black'}
            backgroundColor={null}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        );
      case 'Sold-out':
        return (
          <Label
            /* Options */
            type={'category'}
            text={product.tag}
            color={'white'}
            backgroundColor={'black'}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
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
          availability={product.tag !== 'Sold-out'}
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

              <Heading
                /* Options */
                htmlEntity={'h1'}
                text={product.title}
                color={'black'}
                size={'medium'}
                truncate={null}
                reveal
                /* Children */
                withLinkProps={null}
              />

              {this.renderPrice(product)}

              <div className="product__description  t-body  lh-copy  grey  f5  pb4">
                <BlockContent blocks={product.description} />
              </div>

              <p className="t-body  grey  f6  pb2">Sizes:</p>
              <div className="flex  flex-wrap  pb4">
                {product.variants.map(variant => this.renderVariant(variant))}
              </div>

              <div
                className="col-24  snipcart-add-item"
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
                <Button
                  /* Options */
                  type={'primary'}
                  size={'medium'}
                  text={'Add to Cart'}
                  color={'black'}
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
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
