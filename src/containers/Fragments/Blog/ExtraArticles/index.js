/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../../components/Loading';
import ArticleListGrid from '../../../../components/ArticleList/Grid';
import ArticleListList from '../../../../components/ArticleList/List';

export class ExtraArticles extends PureComponent {
  componentDidMount() {
    const range = this.props.range;
    this.props.fetchExtraArticlesIfNeeded(range);
  }

  renderExtraArticleList = () => {
    const { extraArticles } = this.props;

    if (
      !extraArticles.readyStatus ||
      extraArticles.readyStatus === action.EXTRAARTICLES_INVALID ||
      extraArticles.readyStatus === action.EXTRAARTICLES_REQUESTING ||
      extraArticles.readyStatus === action.EXTRAARTICLES_FAILURE
    ) {
      return <Loading type="ExtraArticles" />;
    }

    if (this.props.type === 'grid') return <ArticleListGrid {...this.props} list={extraArticles.list} />;
    if (this.props.type === 'list') return <ArticleListList {...this.props} list={extraArticles.list} />;
    return true;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderExtraArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ extraArticles }) => ({ extraArticles }),
  dispatch => ({
    fetchExtraArticlesIfNeeded: (range: Array) =>
      dispatch(action.fetchExtraArticlesIfNeeded(range)),
  }),
);

ExtraArticles.propTypes = {
  extraArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchExtraArticlesIfNeeded: PropTypes.func,
  type: PropTypes.string,
  range: PropTypes.arrayOf(PropTypes.number),
};

ExtraArticles.defaultProps = {
  extraArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchExtraArticlesIfNeeded: () => {},
  type: '',
  range: [],
};

export default connector(ExtraArticles);
