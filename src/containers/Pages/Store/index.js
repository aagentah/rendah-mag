/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

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
    const desc = 'We ship worldwide.';
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
            <div className="w-100  pb3  pb4-md">
              <Link title="Subscribe" to="/product/rendah-mag-issue-001" className="w-100  link">
                <img className="w-100  shadow2  br2  dn  db-md" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1569520981/shop/subscribe-banner-desktop_2.png" alt="Subscribe Banner" />
              </Link>
              <Link title="Subscribe" to="/product/rendah-mag-issue-001" className="w-100  link">
                <img className="w-100  shadow2  br2  db  dn-md" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1569520983/shop/subscribe-banner-mobile_1.png" alt="Subscribe Banner" />
              </Link>
            </div>
          </div>
          <div className="flex  flex-wrap">
            <div className="col-24  col-6-md  ph2  ph0-md">
              <span className="t-title  black  f6  bold  dn  db-md">Collections</span>
              <Collections
                {...this.props}
                range={[1, 24]}
                name="Collections"
                type="grid"
                padding="pv2  pl2  pr4"
              />
              <span className="t-title  black  f6  bold  dn  db-md">Categories</span>
              <Categories
                {...this.props}
                range={[1, 24]}
                name="Categories"
                type="grid"
                padding="pv2  pl2  pr4"
              />
            </div>
            <div className="col-24  col-18-md">
              <Products range={[1, 24]} type="grid" padding="" query={searchQuery} />
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
