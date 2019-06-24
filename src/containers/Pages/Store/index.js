/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import Collections from '../../../containers/Fragments/Store/Collections';
import Categories from '../../../containers/Fragments/Store/Categories';
import Products from '../../../containers/Fragments/Store/Products';

export class Store extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Store';
    const searchQuery = this.props.match.params.query;
    const desc = 'We ship worldwide and you can cancel at any time.';
    const canonical = 'https://www.rendahmag.com/store';

    console.log('this.props', this.props);
    console.log('searchQuery', searchQuery);

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>
        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />

        <div className="container-medium  center">
          <div className="flex  flex-wrap">
            <div className="col-24  col-6-md">
              <span>Collections</span>
              <Collections range={[1, 24]} type="grid" padding="pa2" />
              <span>Categories</span>
              <Categories range={[1, 24]} type="grid" padding="pa2" />
            </div>
            <div className="col-24  col-18-md">
              <Products range={[1, 24]} type="grid" padding="pa2" query={searchQuery} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Store.propTypes = {
  match: PropTypes.shape(),
};

Store.defaultProps = {
  match: [],
};

export default Store;
