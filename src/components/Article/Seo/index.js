/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { article } = this.props;
    console.log('article');
    console.log(article);

    return (
      <React.Fragment>
        <Helmet>
          <title>{article.title}</title>
          <meta name="description" content={article.description} />

          {/* Google+ */}
          <meta itemprop="name" content={article.title} />
          <meta itemprop="description" content={article.description} />
          <meta itemprop="image" content={article.img} />

          {/* Twitter  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rendahmag" />
          <meta name="twitter:title" content={article.title} />
          <meta name="twitter:description" content={article.description} />
          <meta name="twitter:image:src" content={article.img} />

          {/* Open Graph data */}
          <meta property="og:title" content={article.title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.rendahmag.com/" />
          <meta property="og:image" content={article.img} />
          <meta property="og:description" content={article.description} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="article:published_time" content={article.created} />
          <meta property="article:modified_time" content={article.created} />
          <meta property="article:section" content="article" />
        </Helmet>
      </React.Fragment>
    );
  }
}

Seo.propTypes = {
  article: PropTypes.shape(),
};

Seo.defaultProps = {
  article: {},
};

export default Seo;
