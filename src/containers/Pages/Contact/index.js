/* eslint-disable max-len, import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Instagram from '../../../components/Instagram';

export class Contact extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="Contact" />
        <div className="container  tal  ph4-sm">
          <div className="row">
            <div className="col-sm-14">
              <h1 className="black  title-font  t5  pt5  pt4-sm  pv4  pb3-sm">Contact</h1>
              <p className="pb4">
                Rendah exists to bring exposure to a somewhat small community, with so much new talent emerging,
                The future of the Beats movement is looking very promising. Rendah is built from within the community.
                <br /><br />
                Get involved. We&apos;re constantly on the look out for new members for the Rendah team. Whether
                you&apos;re a writer, a developer, an artist, a label or even just a fan, we encourage you to get in touch!
              </p>
              <a href="mailto:info@rendahmag.com">
                <img className="w2  dib  pr2" src={require('../../App/assets/social/iconmonstr-email-11.png')} alt="facebook" />
                <span className="contact__email--link  dib  pb3  black  no-underline">info@rendahmag.com</span>
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

export default Contact;
