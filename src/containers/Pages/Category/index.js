/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import startCase from 'lodash/startCase';

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
    const title = startCase(this.props.match.params.query);
    const canonical = `https://www.rendahmag.com/category/${this.props.match.params.query}`;
    let description = null;

    switch (title) {
      case 'News':
        description = 'Bringing you the latest news within the scene.';
        break;
      case 'Interviews':
        description = 'Read exclusive interviews with established & upcoming artists.';
        break;
      case 'Insights':
        description = 'Explicit reviews & insights to some of our favourite releases.';
        break;
      default:
        description = null;
    }

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>
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
