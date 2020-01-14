/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../../components/Loading';
import ArticleListGrid from '../../../../components/ArticleList/Grid';
import ArticleListList from '../../../../components/ArticleList/List';

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

    if (this.props.type === 'grid') return <ArticleListGrid {...this.props} list={searchArticles.list} />;
    if (this.props.type === 'list') return <ArticleListList {...this.props} list={searchArticles.list} />;
    return true;
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
    fetchSearchArticlesIfNeeded: (query: string, range: Array) =>
      dispatch(action.fetchSearchArticlesIfNeeded(query, range)),
  }),
);

SearchArticles.propTypes = {
  searchArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  type: PropTypes.string,
  match: PropTypes.shape(),
  range: PropTypes.arrayOf(PropTypes.number),
};

SearchArticles.defaultProps = {
  searchArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
  type: '',
  range: [],
};

const frontload = props =>
  Promise.all([
    props.fetchSearchArticlesIfNeeded(props.match, props.range),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(SearchArticles);
