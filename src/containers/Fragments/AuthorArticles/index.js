/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';


export class AuthorArticles extends PureComponent {
  renderAuthorArticleList = () => {
    const { authorArticles } = this.props;

    if (
      !authorArticles.readyStatus ||
      authorArticles.readyStatus === action.AUTHORARTICLES_INVALID ||
      authorArticles.readyStatus === action.AUTHORARTICLES_REQUESTING ||
      authorArticles.readyStatus === action.AUTHORARTICLES_FAILURE
    ) {
      return <Loading type="AuthorArticles" />;
    }

    return <ArticleListGrid {...this.props} type="grid" list={authorArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderAuthorArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ authorArticles }) => ({ authorArticles }),
  dispatch => ({
    fetchAuthorArticlesIfNeeded: (id: string) =>
      dispatch(action.fetchAuthorArticlesIfNeeded(id)),
  }),
);

AuthorArticles.propTypes = {
  authorArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  match: PropTypes.shape(),
};

AuthorArticles.defaultProps = {
  authorArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
  fetchAuthorArticlesIfNeeded: () => {},
};

const frontload = props =>
  Promise.all([
    props.fetchAuthorArticlesIfNeeded(props.match.params.id),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(AuthorArticles);
