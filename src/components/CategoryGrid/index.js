/* @flow */
/* eslint-disable import/no-named-as-default, react/prefer-stateless-function */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class CategoryGrid extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="container-medium  center">
          <div className="flex  flex-wrap">
            <div className="col-24  col-8-lg  ph3">
              <Link className="link" to={'/category/interviews'}>
                <div className="mv3  shadow2  shadow3-hover" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  dark-grey  t5  t-title-bold  pb1">INTERVIEWS</h4>
                </div>
              </Link>
            </div>
            <div className="col-24  col-8-lg  ph3">
              <Link className="link" to={'/category/insights'}>
                <div className="mv3  shadow2  shadow3-hover" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  dark-grey  t5  t-title-bold  pb1">INSIGHTS</h4>
                </div>
              </Link>
            </div>
            <div className="col-24  col-8-lg  ph3">
              <Link className="link" to={'/category/news'}>
                <div className="mv3  shadow2  shadow3-hover" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  dark-grey  t5  t-title-bold  pb1">NEWS</h4>
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
