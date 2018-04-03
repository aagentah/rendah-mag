/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import WeekArticleList from '../../../components/ArticleList/Week';

// Export this for unit testing more easily
export class WeekArticles extends PureComponent {
  componentDidMount() {
    this.props.fetchWeekArticlesIfNeeded();
  }

  renderWeekArticleList = () => {
    const { weekArticles } = this.props;

    if (
      !weekArticles.readyStatus ||
      weekArticles.readyStatus === action.WEEKARTICLES_INVALID ||
      weekArticles.readyStatus === action.WEEKARTICLES_REQUESTING
    ) {
      return <div className="vh-100" />;
    }

    if (weekArticles.readyStatus === action.WEEKARTICLES_FAILURE) {
      return <div />;
    }

    return <WeekArticleList list={weekArticles.list} />;
  };

  render() {
    return (
      <div>
        {this.renderWeekArticleList()}
      </div>
    );
  }
}

const connector = connect(
  ({ weekArticles }) => ({ weekArticles }),
  dispatch => ({
    fetchWeekArticlesIfNeeded: () => dispatch(action.fetchWeekArticlesIfNeeded()),
  }),
);

WeekArticles.propTypes = {
  weekArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchWeekArticlesIfNeeded: PropTypes.func,
};

WeekArticles.defaultProps = {
  weekArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchWeekArticlesIfNeeded: () => {},
};

export default connector(WeekArticles);
