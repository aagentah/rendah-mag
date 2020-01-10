/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Card, Image, Label, Heading } from 'rendah-pattern-library';

export class ProductList extends PureComponent {
  render() {
    const { padding } = this.props;
    const list = this.props.list;
    const products = this.props.list.items;

    const renderProduct = (product) => {
      const withLinkProps = {
        type: 'internal',
        url: `/product/${product.slug}`,
        target: '_top',
        routerLink: Redirect,
      };

      const cardImage = (
        <Image
          /* Options */
          src={product.img1}
          placeholder={`${product.img1}?w=100`}
          alt={product.title}
          figcaption={null}
          height={250}
          onClick={null}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      const priceLabel = (
        <Label
          /* Options */
          type={'price'}
          text={`£${product.price}`}
          color={'black'}
          backgroundColor={'white'}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
      );

      const specialPriceLabel = (product.specialPrice) ? (
        <Label
          /* Options */
          type={'sale-price'}
          text={`£${product.specialPrice}`}
          color={'black'}
          backgroundColor={'white'}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
      ) : null;

      const categoryLabel = (product.tag && product.tag !== 'None') ? (
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
      ) : null;

      const cardHeading = (
        <Heading
          /* Options */
          htmlEntity={'h2'}
          text={product.title}
          color={'black'}
          size={'small'}
          truncate={2}
          reveal={null}
          /* Children */
          withLinkProps={withLinkProps}
        />
      );

      return (
        <Card
          /* Options */
          type={'block'}
          onClick={null}
          /* Children */
          image={cardImage}
          labelBlock={[priceLabel, specialPriceLabel, categoryLabel]}
          title={cardHeading}
          description={null}
          button={null}
        />
      );
    };

    return (
      <div className={padding}>
        <div className="ph3  pb3">
          <Heading
            /* Options */
            htmlEntity={'h1'}
            text={list.title}
            color={'black'}
            size={'medium'}
            truncate={null}
            reveal
            /* Children */
            withLinkProps={null}
          />
          {list.description && <p className="t-body  grey  f6">{list.description}</p>}
        </div>
        <div className="flex  flex-wrap">
          {products.map(product => (
            <div key={product.title} className="col-24  col-8-md  pa3">
              <product>
                {renderProduct(product)}
              </product>
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
