/* eslint-disable import/no-named-as-default,
import/no-named-as-default-member */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import Loading from '../../../components/Loading';
import Article from '../../../components/Article';

export class ArticleInfo extends PureComponent {
  componentDidMount() {
    const { fetchArticleIfNeeded, match: { params } } = this.props;

    fetchArticleIfNeeded(params.id);

    const id = this.props.match.params.id;
    this.props.fetchArticleIfNeeded(id);
  }

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

    return (
      <div>
        <Helmet>
          <title>{articleInfoById.info.title}</title>
          <meta name="description" content={articleInfoById.info.title} />

          {/* Open Graph data */}
          <meta property="og:title" content={articleInfoById.info.title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="http://www.RendahMag.com/" />
          <meta property="og:description" content={articleInfoById.info.title} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="article:published_time" content={articleInfoById.info.title} />
          <meta property="article:modified_time" content={article.created} />
          <meta property="article:section" content="article" />
        </Helmet>
        <Article info={articleInfoById.info} />;
      </div>
    );
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
