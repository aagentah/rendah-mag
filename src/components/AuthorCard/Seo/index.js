/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class Seo extends PureComponent {
  render() {
    const author = this.props.data;
    console.log('SEO');
    console.log(author);
    return (
      <div>
        <Helmet>
          <title>{author.name}</title>
          <meta name="description" content={author.description} />

          {/* Google+ */}
          <meta itemprop="name" content={author.name} />
          <meta itemprop="description" content={author.description} />
          <meta itemprop="image" content={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@RendahMag" />
          <meta name="twitter:title" content={author.name} />
          <meta name="twitter:description" content={author.description} />
          <meta name="twitter:image:src" content={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />

          {/* Open Graph data */}
          <meta property="og:title" content={author.name} />
          <meta property="og:type" content="author" />
          <meta property="og:url" content="http://www.RendahMag.com/" />
          <meta property="og:image" content={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />
          <meta property="og:description" content={author.description} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="author:section" content="Article Section" />
          <meta property="author:tag" content="Article Tag" />
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
