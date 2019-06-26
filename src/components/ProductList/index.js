/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

export class Productdata extends PureComponent {
  render() {
    const { padding } = this.props;
    const data = this.props.list;
    const items = this.props.list.items;
    console.log('data', data);
    console.log('items', items);

    return (
      <div className={padding}>
        <div className="pb3">
          <h1 className="t-title  black  f5  pb2">{data.title}</h1>
          {data.description && <p className="t-body  grey  f6">{data.description}</p>}
        </div>
        <div className="flex  flex-wrap">
          {items.map(product => (
            <div key={product.title} className="col-24  col-6-md  pa3">
              <article>
                <figure>
                  <Link className="db" title={product.slug} to={`/product/${product.slug}`}>
                    <AnimatedImage lazy src={product.img} alt={product.title} styles="h6  w-100" />
                  </Link>
                </figure>

                <div className="pv2  mt2">
                  <span className="t-body  grey  f6">£{product.price}</span>
                </div>

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

Productdata.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

Productdata.defaultProps = {
  list: [],
  padding: '',
};

export default Productdata;
