/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { title, slug, description, img, price } = this.props;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.rendahmag.com/product/${slug}`} />

        {/* Twitter  */}
        <meta name="twitter:card" content="product" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />
        <meta name="twitter:data1" content={price} />
        <meta name="twitter:label1" content="Price" />

        {/* Open Graph data */}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`https://www.rendahmag.com/product/${slug}`} />
        <meta property="og:image" content={img} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:type" content="og:product" />
        <meta property="og:description" content={description} />
        <meta property="product:plural_title" content={title} />
        <meta property="product:price:amount" content={price} />
        <meta property="product:price:currency" content="GBP" />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
};

Seo.defaultProps = {
  title: '',
  slug: '',
  description: '',
  img: '',
  price: '',
};

export default Seo;
