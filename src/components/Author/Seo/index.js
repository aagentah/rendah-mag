/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { author } = this.props;

    return (
      <Helmet>
        <title>{author.name}</title>
        <meta name="description" content={author.description} />

        {/* Twitter  */}
        <meta name="twitter:title" content={author.name} />
        <meta name="twitter:description" content={author.description} />
        <meta name="twitter:image:src" content={author.img} />

        {/* Open Graph data */}
        <meta property="og:title" content={author.name} />
        <meta property="og:image" content={author.img} />
        <meta property="og:description" content={author.description} />
        <meta property="article:section" content="author" />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  author: PropTypes.shape(),
};

Seo.defaultProps = {
  author: {},
};

export default Seo;
