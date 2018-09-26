/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { author } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{author.name}</title>
          <meta name="description" content={author.description} />

          {/* Google+ */}
          <meta itemprop="name" content={author.name} />
          <meta itemprop="description" content={author.description} />
          <meta itemprop="image" content={author.img} />

          {/* Twitter  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rendahmag" />
          <meta name="twitter:title" content={author.name} />
          <meta name="twitter:description" content={author.description} />
          <meta name="twitter:image:src" content={author.img} />

          {/* Open Graph data */}
          <meta property="og:title" content={author.name} />
          <meta property="og:type" content="author" />
          <meta property="og:url" content="https://www.rendahmag.com/" />
          <meta property="og:image" content={author.img} />
          <meta property="og:description" content={author.description} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="author:section" content="author" />
        </Helmet>
      </React.Fragment>
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
