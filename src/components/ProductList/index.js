/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

export class ProductList extends PureComponent {
  renderPrice = (product) => {
    console.log(product, 'ooo');
    if (product.specialPrice) {
      return (
        <p className="t-body  grey  f6">
          <span className="strike  o-50  pr1">£{product.price}</span> £{product.specialPrice}
        </p>
      );
    }

    return <p className="t-body  grey  f6">£{product.price}</p>;
  };

  render() {
    const { padding } = this.props;
    const data = this.props.list;
    const items = this.props.list.items;

    return (
      <div className={padding}>
        <div className="ph3  pb3">
          <h1 className="t-title  black  bold  f4  pb2  mb1  pt2  pt2-md">{data.title}</h1>
          {data.description && <p className="t-body  grey  f6">{data.description}</p>}
        </div>
        <div className="flex  flex-wrap">
          {items.map(product => (
            <div key={product.title} className="col-24  col-8-md  pa3">
              <article>
                <figure>
                  <Link
                    className="db  shadow2"
                    title={product.slug}
                    to={`/product/${product.slug}`}
                  >
                    <AnimatedImage
                      lazy
                      src={product.img}
                      alt={product.title}
                      styles="fade-in-zoom-in  h8  w-100"
                    />
                  </Link>
                </figure>

                <div className="pv2  mt2">{this.renderPrice(product)}</div>

                <div>
                  <Link to={`/product/${product.slug}`} className="t-body  db  link  pb2">
                    <p className="t-title  black  f5  cp  over-hidden  link  grid-card__title">
                      {product.title}
                    </p>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

ProductList.defaultProps = {
  list: [],
  padding: '',
};

export default ProductList;
