/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Instagram from '../../../components/Instagram';

export class GetInvolved extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="Get Involved" />
        <div className="container  tal  ph4-sm">
          <div className="row">
            <div className="col-sm-14">
              <h1 className="black  title-font  t5  pt5  pt4-sm  pv4  pb3-sm">Get Involved</h1>
              <p className="pb4">
                Rendah Mag exists to bring exposure to an ever-growing community,
                focusing on the latest Halftime, Beats & Experimental news & releases.
                <br /><br />
                Get involved. We&apos;re constantly on the look out for new members for
                the Rendah team. Whether you&apos;re a writer, a developer, an artist, a
                label or even just a fan, we invite you to get in touch!
              </p>
              <a href="mailto:info@rendahmag.com">
                <img className="w2  dib  pr2" src={require('../../App/assets/social/iconmonstr-email-11.png')} alt="facebook" />
                <span className="GetInvolved__email--link  dib  pb3  black  no-underline">info@rendahmag.com</span>
              </a>
            </div>
            <div className="col-sm-10">
              <div className="container-fluid  pv4">
                <div className="row">
                  <div className="col-sm-24  pt4">
                    <Instagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default GetInvolved;
