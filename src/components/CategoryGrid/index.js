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
              <Link className="link" to={'/category/interviews'}>
                <div className="mv3  shadow2  shadow3-hover  CategoryGrid__bg  CategoryGrid__bg--1" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  dark-grey  t5  khula-bold  pb1  pt2  CategoryGrid__title">INTERVIEWS</h4>
                </div>
              </Link>
            </div>
            <div className="col-sm-24  col-lg-8">
              <Link className="link" to={'/category/insights'}>
                <div className="mv3  shadow2  shadow3-hover  CategoryGrid__bg  CategoryGrid__bg--2" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  dark-grey  t5  khula-bold  pb1  pt2  CategoryGrid__title">INSIGHTS</h4>
                </div>
              </Link>
            </div>
            <div className="col-sm-24  col-lg-8">
              <Link className="link" to={'/category/news'}>
                <div className="mv3  shadow2  shadow3-hover  CategoryGrid__bg  CategoryGrid__bg--3" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  dark-grey  t5  khula-bold  pb1  pt2  CategoryGrid__title">NEWS</h4>
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
