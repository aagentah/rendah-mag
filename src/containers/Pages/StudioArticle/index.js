/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ArticleInfo from '../../../containers/Fragments/Studio/ArticleInfo';

export class StudioArticle extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in  bg-dark-grey">
        <ArticleInfo match={this.props.match} />
      </main>
    );
  }
}

StudioArticle.propTypes = {
  match: PropTypes.shape(),
};

StudioArticle.defaultProps = {
  match: [],
};

export default StudioArticle;
