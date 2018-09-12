/* eslint-disable import/no-named-as-default, max-len */

import React from 'react';
import { Link } from 'react-router-dom';

export class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="pt4">
        <footer className="container-large  center  rel  bt  bw1  z9  pv3">
          <div className="flex  flex-wrap">

            <div className="col-14  pt2">
              <p className="t-body  f7  di">Rendah Mag 2018 <span>|</span></p>
              <Link className="t-body  black  link  f7  di  pl1  pr1" to={'/privacy-policy'}>Privacy Policy</Link>
              <span>|</span>
              <a href="mailto:info@rendahmag.com" className="t-body  black  link  f7  pl1">info@rendahmag.com</a>
            </div>

            <div className="col-10  flex  justify-end">
              <a className="w2  mh1" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                <img src={require('../assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
              </a>
              <a className="w2  mh1" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
                <img src={require('../assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
              </a>
              <a className="w2  mh1" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                <img src={require('../assets/social/iconmonstr-instagram-5.png')} alt="instagram" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
