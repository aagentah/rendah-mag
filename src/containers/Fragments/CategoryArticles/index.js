/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';


export class CategoryArticles extends PureComponent {
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

    return <ArticleListGrid {...this.props} type="grid" list={categoryArticles.list} />;
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
};

CategoryArticles.defaultProps = {
  categoryArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
};

const frontload = props =>
  Promise.all([
    props.fetchCategoryArticlesIfNeeded(props.match.params.query),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(CategoryArticles);

