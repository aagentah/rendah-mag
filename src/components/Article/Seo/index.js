/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { title, description, img, created } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />

          {/* Google+ */}
          <meta itemprop="name" content={title} />
          <meta itemprop="description" content={description} />
          <meta itemprop="image" content={img} />

          {/* Twitter  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rendahmag" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image:src" content={img} />

          {/* Open Graph data */}
          <meta property="og:title" content={title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.rendahmag.com/" />
          <meta property="og:image" content={img} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="article:published_time" content={created} />
          <meta property="article:modified_time" content={created} />
          <meta property="article:section" content="article" />
        </Helmet>
      </React.Fragment>
    );
  }
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  created: PropTypes.string,
};

Seo.defaultProps = {
  title: '',
  description: '',
  img: '',
  created: '',
};

export default Seo;
