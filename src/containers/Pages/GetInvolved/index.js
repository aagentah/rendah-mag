/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Instagram from '../../../components/Instagram';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';

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
            <div className="col-lg-14">
              <h1 className="tal  dark-grey  t6  ttu  t-title-bold  mt3  pt4  pt4-sm  pv4  pb3-sm">Get Involved</h1>
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
              <p className="pt3">
                Rendah is written in <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank" className="black  bold  link  no-underline">React.js</a>
                &nbsp;&&nbsp;<a href="https://nodejs.org/en/" rel="noopener noreferrer" target="_blank" className="black  bold  link  no-underline">Node.js</a>.
                <br />
                You can check our <a href="https://github.com/danjonesdev/rendah-mag" rel="noopener noreferrer" target="_blank" className="black  bold  link  no-underline">Github repository</a>
              </p>
            </div>
            <div className="col-lg-10">
              <div className="container-fluid  pv4">
                <div className="row">
                  <div className="col-24  pt4">
                    <Instagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ExtraArticles />
      </main>
    );
  }
}

export default GetInvolved;
