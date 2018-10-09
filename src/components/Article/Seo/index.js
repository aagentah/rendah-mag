/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { title, slug, description, img, created, author } = this.props;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.rendahmag.com/article/${slug}`} />

        {/* Twitter  */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />

        {/* Open Graph data */}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`https://www.rendahmag.com/article/${slug}`} />
        <meta property="og:image" content={img} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:description" content={description} />
        <meta property="article:published_time" content={created} />
        <meta property="article:modified_time" content={created} />
        <meta property="article:section" content="Article" />
        <meta property="article:author" content={author} />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  created: PropTypes.string,
  author: PropTypes.string,
};

Seo.defaultProps = {
  title: '',
  slug: '',
  description: '',
  img: '',
  created: '',
  author: '',
};

export default Seo;
