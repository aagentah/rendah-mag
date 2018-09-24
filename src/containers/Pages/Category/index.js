/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import CategoryArticles from '../../../containers/Fragments/CategoryArticles';

export class Category extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = this.props.match.params.query;

    return (
      <main className="page-fade-in">
        <Helmet title={title} />
        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />
        <CategoryArticles match={this.props.match} />
      </main>
    );
  }
}

Category.propTypes = {
  match: PropTypes.shape(),
};

Category.defaultProps = {
  match: [],
};

export default Category;
