/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';


export class Seo extends PureComponent {
  render() {
    const article = this.props.data;
    console.log('SEO');
    console.log(article);
    return (
      <div>
        <Helmet>
          <title>{article.name}</title>
          <meta name="description" content={article.name} />

          {/* Google+ */}
          <meta itemprop="name" content={article.name} />
          <meta itemprop="description" content={article.name} />
          {/* Twitter  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@RendahMag" />
          <meta name="twitter:title" content={article.name} />
          <meta name="twitter:description" content={article.name} />

          {/* Open Graph data */}
          <meta property="og:title" content={article.name} />
          <meta property="og:type" content="article" />
          <meta property="og:description" content={article.name} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="article:published_time" content={article.name} />
          <meta property="article:modified_time" content={article.name} />
          <meta property="article:section" content="article" />
        </Helmet>
      </div>
    );
  }
}

Seo.propTypes = {
  data: PropTypes.shape(),
};

Seo.defaultProps = {
  data: {},
};

export default Seo;
