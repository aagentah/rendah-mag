/* eslint-disable max-len */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

export class About extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="About" />
        <h1 className="dn">About</h1>
        <div className="container  mb4  ph4-sm">
          <div className="row">
            <div className="col-sm-24">
              <h1 className="black  title-font  t5  pt5  pt4-sm  pv4  pb3-sm">About Rendah</h1>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default About;
