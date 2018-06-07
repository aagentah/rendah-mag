/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../components/Loading';
import LatestArticleList from '../../../components/ArticleList/Latest';


export class ExtraArticles extends PureComponent {
  componentDidMount() {
    this.props.fetchExtraArticlesIfNeeded();
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

    return <LatestArticleList list={extraArticles.list} extra />;
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
    fetchExtraArticlesIfNeeded: () => dispatch(action.fetchExtraArticlesIfNeeded()),
  }),
);

ExtraArticles.propTypes = {
  extraArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchExtraArticlesIfNeeded: PropTypes.func,
};

ExtraArticles.defaultProps = {
  extraArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchExtraArticlesIfNeeded: () => {},
};

export default connector(ExtraArticles);
