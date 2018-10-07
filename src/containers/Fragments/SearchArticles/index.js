/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';

export class SearchArticles extends PureComponent {
  renderSearchArticleList = () => {
    const { searchArticles } = this.props;

    if (
      !searchArticles.readyStatus ||
      searchArticles.readyStatus === action.SEARCHARTICLES_INVALID ||
      searchArticles.readyStatus === action.SEARCHARTICLES_REQUESTING ||
      searchArticles.readyStatus === action.SEARCHARTICLES_FAILURE
    ) {
      return <Loading type="SearchArticles" />;
    }

    return <ArticleListGrid {...this.props} type="grid" list={searchArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderSearchArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ searchArticles }) => ({ searchArticles }),
  dispatch => ({
    fetchSearchArticlesIfNeeded: (query: string) =>
      dispatch(action.fetchSearchArticlesIfNeeded(query)),
  }),
);

SearchArticles.propTypes = {
  searchArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  match: PropTypes.shape(),
};

SearchArticles.defaultProps = {
  searchArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
};

const frontload = props =>
  Promise.all([
    props.fetchSearchArticlesIfNeeded(props.match.params.query),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(SearchArticles);

