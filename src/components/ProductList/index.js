/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

export class ProductList extends PureComponent {
  render() {
    const { list, padding } = this.props;
    console.log(list);

    return (
      <div className={`${padding}`}>
        {list.map(product => (
          <div key={product.title} className="col-24  col-6-md  pa3">
            <article>
              <figure>
                <Link className="db  shadow2" title={product.slug} to={`/product/${product.slug}`}>
                  <AnimatedImage
                    lazy
                    src={product.img}
                    alt={product.title}
                    styles="fade-in-zoom-in  h5  w-100"
                  />
                </Link>
              </figure>

              <div className="pv2  mt2">
                <span className="t-body  grey  f6">| </span>
              </div>

              <div>
                <Link to={`/product/${product.slug}`} className="t-body  db  link  pb2">
                  <p className="t-title  black  f5  cp  over-hidden  link  grid-card__title">{product.title}</p>
                </Link>
                <p className="t-body  grey  f6  over-hidden  mt1  grid-card__desc">{product.description}</p>
              </div>
            </article>
          </div>
        ))}
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
