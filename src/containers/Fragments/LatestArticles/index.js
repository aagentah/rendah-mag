/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';
import ArticleListList from '../../../components/ArticleList/List';


export class LatestArticles extends PureComponent {
  renderLatestArticleList = () => {
    const { latestArticles } = this.props;

    if (
      !latestArticles.readyStatus ||
      latestArticles.readyStatus === action.LATESTARTICLES_INVALID ||
      latestArticles.readyStatus === action.LATESTARTICLES_REQUESTING ||
      latestArticles.readyStatus === action.LATESTARTICLES_FAILURE
    ) {
      return <Loading type="LatestArticles" />;
    }

    if (this.props.type === 'grid') return <ArticleListGrid {...this.props} list={latestArticles.list} />;
    if (this.props.type === 'list') return <ArticleListList {...this.props} list={latestArticles.list} />;
    return true;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLatestArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ latestArticles }) => ({ latestArticles }),
  dispatch => ({
    fetchLatestArticlesIfNeeded: (limit: number) =>
      dispatch(action.fetchLatestArticlesIfNeeded(limit)),
  }),
);

LatestArticles.propTypes = {
  latestArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  type: PropTypes.string,
  limit: PropTypes.number,
};

LatestArticles.defaultProps = {
  latestArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchLatestArticlesIfNeeded: () => {},
  type: '',
  limit: 0,
};

const frontload = props =>
  Promise.all([
    props.fetchLatestArticlesIfNeeded(props.limit),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(LatestArticles);

