/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ArticleInfo from '../../../containers/Fragments/ArticleInfo';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';
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
        <p className="t7  tac  grey  pv3-sm  pv4">MORE ARTICLES</p>
        <div className="pb2">
          <ExtraArticles />
        </div>
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
