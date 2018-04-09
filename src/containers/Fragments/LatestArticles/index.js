/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import LatestArticleList from '../../../components/ArticleList/Latest';


export class LatestArticles extends PureComponent {
  componentDidMount() {
    this.props.fetchLatestArticlesIfNeeded();
  }

  renderLatestArticleList = () => {
    const { latestArticles } = this.props;

    if (
      !latestArticles.readyStatus ||
      latestArticles.readyStatus === action.LATESTARTICLES_INVALID ||
      latestArticles.readyStatus === action.LATESTARTICLES_REQUESTING
    ) {
      return (
        <div className="loader">
          <span className="spinner1" />
          <span className="spinner2" />
          <span className="spinner3" />
        </div>
      );
    }

    if (latestArticles.readyStatus === action.LATESTARTICLES_FAILURE) {
      return <div />;
    }

    return <LatestArticleList list={latestArticles.list} />;
  };

  render() {
    return (
      <div>
        {this.renderLatestArticleList()}
      </div>
    );
  }
}

const connector = connect(
  ({ latestArticles }) => ({ latestArticles }),
  dispatch => ({
    fetchLatestArticlesIfNeeded: () => dispatch(action.fetchLatestArticlesIfNeeded()),
  }),
);

LatestArticles.propTypes = {
  latestArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchLatestArticlesIfNeeded: PropTypes.func,
};

LatestArticles.defaultProps = {
  latestArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchLatestArticlesIfNeeded: () => {},
};

export default connector(LatestArticles);
