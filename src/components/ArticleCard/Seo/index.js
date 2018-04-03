/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class Seo extends PureComponent {
  render() {
    const article = this.props.data;
    console.log('SEO');
    console.log(article);
    return (
      <div>
        <Helmet>
          <title>{article.title}</title>
          <meta name="description" content={article.description} />

          {/* Google+ */}
          <meta itemprop="name" content={article.title} />
          <meta itemprop="description" content={article.description} />
          <meta itemprop="image" content={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${article.img}`} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@RendahMag" />
          <meta name="twitter:title" content={article.title} />
          <meta name="twitter:description" content={article.description} />
          <meta name="twitter:image:src" content={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${article.img}`} />

          {/* Open Graph data */}
          <meta property="og:title" content={article.title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="http://www.RendahMag.com/" />
          <meta property="og:image" content={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${article.img}`} />
          <meta property="og:description" content={article.description} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="article:published_time" content={article.created} />
          <meta property="article:modified_time" content={article.created} />
          <meta property="article:section" content="Article Section" />
          <meta property="article:tag" content="Article Tag" />
          <meta property="fb:admins" content="Facebook numberic ID" />
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
