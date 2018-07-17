/* @flow */
/* eslint-disable import/no-named-as-default, react/prefer-stateless-function */

import React, { PureComponent } from 'react';

export class UpdatesBanner extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="container  pt3  pb3">
          <div className="row">
            <div className="col-24">
              <a className="link" href="https://discord.gg/JpVAzuH" rel="noopener noreferrer" target="_blank">
                <div className="mv3  shadow2  shadow3-hover  UpdatesBanner__bg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="rel  tac  mid-grey  t5  khula-bold  pb0  pt2  UpdatesBanner__title">JOIN US ON DISCORD</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdatesBanner;
