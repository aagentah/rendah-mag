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
        <div className="rel  bt  bw1  z9  pv2  footer">
          <footer className="container-fluid  footer">
            <div className="row">
              <div className="col-sm-12">
                <p className="pt2  mt1  tac-sm  pb2-sm  dib  db-sm  t8">Rendah Mag 2018 <span className="dib dn-sm">|</span></p>
                <Link className="title-font tac-sm  black  dib db-sm  ph2  pb2-sm  mv1-sm  t8  link" to={'/PrivacyPolicy'}>Privacy Policy</Link>
              </div>
              <div className="col-sm-12">
                <div className="footer__social--cont  pb3-sm">
                  <a className="footer__social  ph1" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                    <img src={require('../assets/social/iconmonstr-facebook-5.png')} alt="facebook" />
                  </a>
                  <a className="footer__social  ph1" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
                    <img src={require('../assets/social/iconmonstr-twitter-5.png')} alt="twitter" />
                  </a>
                  <a className="footer__social  ph1" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                    <img src={require('../assets/social/iconmonstr-instagram-5.png')} alt="instagram" />
                  </a>
                  {
                    // <a className="footer__social  ph1" href="https://www.soundcloud.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                    //   <img src={require('../assets/social/iconmonstr-soundcloud-5.png')} alt="soundcloud" />
                    // </a>
                    // <a className="footer__social  ph1" href="https://www.youtube.com/channel/UCFpU3WYYWy5qWSYf306_m3A" rel="noopener noreferrer" target="_blank">
                    //   <img src={require('../assets/social/iconmonstr-youtube-5.png')} alt="youtube" />
                    // </a>
                  }
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Footer;
