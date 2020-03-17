/* eslint-disable import/no-named-as-default, max-len */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'rendah-pattern-library';
// import MessengerCustomerChat from 'react-messenger-customer-chat';

export class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <React.Fragment>
        <div className="pt4">
          <footer className="container-large  center  rel  bt  bw1  pv3">
            <div className="flex  flex-wrap">

              <div className="col-14  pt2">
                <p className="t-body  f7  di">Rendah Mag {new Date().getFullYear()} <span>|</span></p>
                <Link className="t-body  black  link  f7  di  pl1  pr1" title="privacy-policy" to={'/privacy-policy'}>Privacy Policy</Link>
                <span className="t-body  black  link  f7">|</span>
                <a title="info@rendahmag.com" href="mailto:info@rendahmag.com" className="t-body  black  link  f7  pl1">info@rendahmag.com</a>
              </div>

              <div className="col-10  flex  justify-end">
                <a title="facebook" className="w2  mh1" href="https://www.facebook.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                  <Icon icon={'facebook'} color={'black'} size={30} />
                </a>
                <a title="twitter" className="w2  mh1" href="https://twitter.com/RendahMag" rel="noopener noreferrer" target="_blank">
                  <Icon icon={'twitter'} color={'black'} size={30} />
                </a>
                <a title="instagram" className="w2  mh1" href="https://www.instagram.com/rendahmag/" rel="noopener noreferrer" target="_blank">
                  <Icon icon={'instagram'} color={'black'} size={30} />
                </a>
              </div>
            </div>
          </footer>
        </div>

        {/*
          <MessengerCustomerChat
            pageId="302421033575970"
            appId="2015199145383303"
            htmlRef="e0ffc7758bd165bc109a0d2729a08ea62622422e7ac95fc2a4"
            loggedInGreeting="Welcome to Rendah."
            loggedOutGreeting="Welcome to Rendah."
            themeColor="#737373"
          />
        */}
      </React.Fragment>
    );
  }
}

export default Footer;
