/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

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

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>
        <div className="container-medium  center  pv4">
          <div className="flex  flex-wrap">
            <div className="col-24  col-6-md">
              <span className="t-title  black  f6  bold">Collections</span>
              <Collections range={[1, 24]} type="grid" padding="pa2" />
              <span className="t-title  black  f6  bold">Categories</span>
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
