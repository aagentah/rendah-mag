/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../components/Loading';
import WeekArticleList from '../../../components/ArticleList/Week';


export class WeekArticles extends PureComponent {
  componentDidMount() {
    this.props.fetchWeekArticlesIfNeeded();
  }

  renderWeekArticleList = () => {
    const { weekArticles } = this.props;

    if (
      !weekArticles.readyStatus ||
      weekArticles.readyStatus === action.WEEKARTICLES_INVALID ||
      weekArticles.readyStatus === action.WEEKARTICLES_REQUESTING ||
      weekArticles.readyStatus === action.WEEKARTICLES_FAILURE
    ) {
      return <Loading type="WeekArticles" />;
    }

    return <WeekArticleList list={weekArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderWeekArticleList()}
      </React.Fragment>
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
