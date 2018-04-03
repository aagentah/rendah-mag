/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import LatestArticleList from '../../../components/ArticleList/Latest';

// Export this for unit testing more easily
export class CategoryArticles extends PureComponent {
  componentDidMount() {
    const query = this.props.match.params.query;
    this.props.fetchCategoryArticlesIfNeeded(query);
  }

  renderCategoryArticleList = () => {
    const { categoryArticles } = this.props;

    if (
      !categoryArticles.readyStatus ||
      categoryArticles.readyStatus === action.CATEGORYARTICLES_INVALID ||
      categoryArticles.readyStatus === action.CATEGORYARTICLES_REQUESTING
    ) {
      return <div className="vh-100" />;
    }

    if (categoryArticles.readyStatus === action.CATEGORYARTICLES_FAILURE) {
      return <div />;
    }

    return <LatestArticleList list={categoryArticles.list} />;
  };

  render() {
    return (
      <div>
        {this.renderCategoryArticleList()}
      </div>
    );
  }
}

const connector = connect(
  ({ categoryArticles }) => ({ categoryArticles }),
  dispatch => ({
    fetchCategoryArticlesIfNeeded: (query: string) =>
      dispatch(action.fetchCategoryArticlesIfNeeded(query)),
  }),
);

CategoryArticles.propTypes = {
  categoryArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  match: PropTypes.shape(),
  fetchCategoryArticlesIfNeeded: PropTypes.func,
};

CategoryArticles.defaultProps = {
  categoryArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
  fetchCategoryArticlesIfNeeded: () => {},
};

export default connector(CategoryArticles);
