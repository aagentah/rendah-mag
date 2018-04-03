/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import ArticleCard from '../../../components/ArticleCard';

// Export this for unit testing more easily
export class ArticleInfo extends PureComponent {
  componentDidMount() {
    const { fetchArticleIfNeeded, match: { params } } = this.props;

    fetchArticleIfNeeded(params.id);

    const id = this.props.match.params.id;
    this.props.fetchArticleIfNeeded(id);
  }

  renderArticleCard = () => {
    const { articleInfo, match: { params } } = this.props;
    const articleInfoById = articleInfo[params.id];

    if (!articleInfoById || articleInfoById.readyStatus === action.ARTICLE_REQUESTING) {
      return <div className="vh-100" />;
    }

    if (articleInfoById.readyStatus === action.ARTICLE_FAILURE) {
      return <p>Oops, Failed to load info!</p>;
    }

    return <ArticleCard info={articleInfoById.info} />;
  }

  render() {
    return (
      <div>
        <Helmet title="Article Info" />
        {this.renderArticleCard()}
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
  fetchArticleIfNeeded: PropTypes.func,
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

export default connector(ArticleInfo);
