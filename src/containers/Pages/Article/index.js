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
        <p className="tac  dark-grey  t6  ttu  t-title-bold  mt3  pt4  pt4-sm  pv4  pb3-sm">MORE ARTICLES</p>
        <CategoryGrid />
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
