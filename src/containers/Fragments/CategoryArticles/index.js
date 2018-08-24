/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';


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
      categoryArticles.readyStatus === action.CATEGORYARTICLES_REQUESTING ||
      categoryArticles.readyStatus === action.CATEGORYARTICLES_FAILURE
    ) {
      return <Loading type="CategoryArticles" />;
    }

    return <ArticleListGrid type="grid" list={categoryArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderCategoryArticleList()}
      </React.Fragment>
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
