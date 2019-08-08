/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../../components/Loading';
import ArticleListCarousel from '../../../../components/ArticleList/Carousel';


export class FeaturedArticles extends PureComponent {
  renderFeaturedArticleList = () => {
    const { featuredArticles } = this.props;

    if (
      !featuredArticles.readyStatus ||
      featuredArticles.readyStatus === action.FEATUREDARTICLES_INVALID ||
      featuredArticles.readyStatus === action.FEATUREDARTICLES_REQUESTING ||
      featuredArticles.readyStatus === action.FEATUREDARTICLES_FAILURE
    ) {
      return <Loading type="FeaturedArticles" />;
    }

    return <ArticleListCarousel {...this.props} list={featuredArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderFeaturedArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ featuredArticles }) => ({ featuredArticles }),
  dispatch => ({
    fetchFeaturedArticlesIfNeeded: () => dispatch(action.fetchFeaturedArticlesIfNeeded()),
  }),
);

FeaturedArticles.propTypes = {
  featuredArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
};

FeaturedArticles.defaultProps = {
  featuredArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
};

const frontload = props =>
  Promise.all([
    props.fetchFeaturedArticlesIfNeeded(),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(FeaturedArticles);
