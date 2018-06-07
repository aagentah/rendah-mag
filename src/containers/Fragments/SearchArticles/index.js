/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../components/Loading';
import SearchArticleList from '../../../components/ArticleList/Search';


export class SearchArticles extends PureComponent {
  componentDidMount() {
    const query = this.props.match.params.query;
    this.props.fetchSearchArticlesIfNeeded(query);
  }

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

    return <SearchArticleList list={searchArticles.list} />;
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
  fetchSearchArticlesIfNeeded: PropTypes.func,
};

SearchArticles.defaultProps = {
  searchArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
  fetchSearchArticlesIfNeeded: () => {},
};

export default connector(SearchArticles);
