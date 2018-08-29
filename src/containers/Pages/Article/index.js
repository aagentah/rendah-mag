/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ArticleInfo from '../../../containers/Fragments/ArticleInfo';
import CategoryGrid from '../../../components/CategoryGrid';

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
        <ArticleInfo match={this.props.match} />
        <CategoryGrid padding="pt5" />
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
