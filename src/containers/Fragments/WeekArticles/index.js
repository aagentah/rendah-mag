/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';


export class WeekArticles extends PureComponent {
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

    return <ArticleListGrid {...this.props} type="week" list={weekArticles.list} />;
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
};

WeekArticles.defaultProps = {
  weekArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
};

const frontload = props =>
  Promise.all([
    props.fetchWeekArticlesIfNeeded(),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(WeekArticles);

