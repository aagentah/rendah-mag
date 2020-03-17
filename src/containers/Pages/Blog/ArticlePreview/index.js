/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ArticlePreviewInfo from '../../../../containers/Fragments/Blog/ArticlePreviewInfo';

export class Article extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <ArticlePreviewInfo match={this.props.match} />
      </main>
    );
  }
}

Article.propTypes = {
  match: PropTypes.shape(),
};

Article.defaultProps = {
  match: [],
};

export default Article;
