/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key, react/self-closing-comp,
jsx-a11y/no-static-element-interactions */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Seo from './Seo';

export class Article extends PureComponent {
  render() {
    const article = this.props.info;
    return (
      <div>
        <Seo data={article} />
        <div>
          {article.name}
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape(),
};

Article.defaultProps = {
  info: {},
};

export default Article;
