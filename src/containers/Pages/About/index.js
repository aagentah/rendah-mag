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
        <div className="container  mb4">
          <div className="row">
            <div className="col-sm-24">
              <h1 className="black  title-font  t5  pt5  pv4">About Rendah</h1>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default About;
