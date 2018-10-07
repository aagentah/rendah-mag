/* eslint-disable import/no-named-as-default,
import/no-named-as-default-member */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import Article from '../../../components/Article';

export class ArticleInfo extends PureComponent {
  renderArticle = () => {
    const { articleInfo, match: { params } } = this.props;
    const articleInfoById = articleInfo[params.id];

    if (
      !articleInfoById ||
      articleInfoById.readyStatus === action.ARTICLE_REQUESTING ||
      articleInfoById.readyStatus === action.ARTICLE_FAILURE
    ) {
      return <Loading type="ArticleInfo" />;
    }

    return <Article info={articleInfoById.info} />;
  }

  render() {
    return (
      <div>
        {this.renderArticle()}
      </div>
    );
  }
}

const connector = connect(
  ({ articleInfo }) => ({ articleInfo }),
  dispatch => ({
    fetchArticleIfNeeded: (id: string) => dispatch(action.fetchArticleIfNeeded(id)),
  }),
);

ArticleInfo.propTypes = {
  articleInfo: PropTypes.shape({
    articleId: PropTypes.string,
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    info: PropTypes.object,
  }),
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ArticleInfo.defaultProps = {
  articleInfo: {
    articleId: '',
    readyStatus: '',
    err: '',
    info: {},
  },
  match: [],
  fetchArticleIfNeeded: () => {},
};

const frontload = props =>
  Promise.all([
    props.fetchArticleIfNeeded(props.match.params.id),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(ArticleInfo);
