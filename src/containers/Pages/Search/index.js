/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import SearchArticles from '../../../containers/Fragments/SearchArticles';
import CategoryGrid from '../../../components/CategoryGrid';

export class Search extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Search';
    const searchQuery = this.props.match.params.query;

    return (
      <main className="page-fade-in">
        <Helmet title={title} />
        <Hero type="h1" title={searchQuery} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />
        <p className="t-body  dark-grey  f6  tac  mw6  db  center  pb4">
          Latest results for:&nbsp;
          <span className="bold">{searchQuery}</span>
        </p>
        <SearchArticles match={this.props.match} />
        <CategoryGrid />
      </main>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape(),
};

Search.defaultProps = {
  match: [],
};

export default Search;
