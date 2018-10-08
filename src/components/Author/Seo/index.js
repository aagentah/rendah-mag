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
        <meta name="twitter:image" content={author.img} />

        {/* Open Graph data */}
        <meta property="og:title" content={author.name} />
        <meta property="og:url" content={`https://www.rendahmag.com/author/${author.slug}`} />
        <meta property="og:image" content={author.img} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:description" content={author.description} />
        <meta property="article:section" content="Author" />
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
