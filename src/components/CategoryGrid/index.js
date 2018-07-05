/* @flow */
/* eslint-disable import/no-named-as-default, react/prefer-stateless-function */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class CategoryGrid extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="container  pt3  pb5">
          <div className="row">
            <div className="col-sm-24  col-lg-8">
              <Link className="link" to={'/category/Interviews'}>
                <div className="mv3  shadow2  CategoryGrid__bg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/categories/interviews.jpg)' }}>
                  <h4 className="rel  tac  white  t6  title-font  bg-black  pv1  CategoryGrid__title">Interviews</h4>
                </div>
              </Link>
            </div>
            <div className="col-sm-24  col-lg-8">
              <Link className="link" to={'/category/Insights'}>
                <div className="mv3  shadow2  CategoryGrid__bg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/categories/insights.jpg)' }}>
                  <h4 className="rel  tac  white  t6  title-font  bg-black  pv1  CategoryGrid__title">Insights</h4>
                </div>
              </Link>
            </div>
            <div className="col-sm-24  col-lg-8">
              <Link className="link" to={'/category/News'}>
                <div className="mv3  shadow2  CategoryGrid__bg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/categories/news.jpg)' }}>
                  <h4 className="rel  tac  white  t6  title-font  bg-black  pv1  CategoryGrid__title">News</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CategoryGrid;
