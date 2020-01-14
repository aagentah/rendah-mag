/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../../components/Loading';
import ArticleListGrid from '../../../../components/StudioArticleList/Grid';


export class LatestStudioArticles extends PureComponent {
  renderLatestStudioArticleList = () => {
    const { latestStudioArticles } = this.props;

    if (
      !latestStudioArticles.readyStatus ||
      latestStudioArticles.readyStatus === action.LATESTSTUDIOARTICLES_INVALID ||
      latestStudioArticles.readyStatus === action.LATESTSTUDIOARTICLES_REQUESTING ||
      latestStudioArticles.readyStatus === action.LATESTSTUDIOARTICLES_FAILURE
    ) {
      return <Loading type="LatestStudioArticles" />;
    }

    return <ArticleListGrid {...this.props} list={latestStudioArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLatestStudioArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ latestStudioArticles }) => ({ latestStudioArticles }),
  dispatch => ({
    fetchLatestStudioArticlesIfNeeded: (range: Array) =>
      dispatch(action.fetchLatestStudioArticlesIfNeeded(range)),
  }),
);

LatestStudioArticles.propTypes = {
  latestStudioArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  type: PropTypes.string,
  range: PropTypes.arrayOf(PropTypes.number),
};

LatestStudioArticles.defaultProps = {
  latestStudioArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchLatestStudioArticlesIfNeeded: () => {},
  type: '',
  range: [],
};

const frontload = props =>
  Promise.all([
    props.fetchLatestStudioArticlesIfNeeded(props.range),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(LatestStudioArticles);
