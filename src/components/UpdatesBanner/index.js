/* @flow */
/* eslint-disable import/no-named-as-default, react/prefer-stateless-function */

import React, { PureComponent } from 'react';

export class UpdatesBanner extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="container  pt4  pb3">
          <div className="row">
            <div className="col-24">
              <a className="link  db  shadow2  shadow3-hover" href="https://www.facebook.com/rendahmag/photos/a.398209153997157.1073741829.302421033575970/438109933340412/?type=3&theater" rel="noopener noreferrer" target="_blank">
                <img className="w-100" alt="Giveaway" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1533498843/brand/robert-moog-poster-competition-website.jpg" />
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdatesBanner;
