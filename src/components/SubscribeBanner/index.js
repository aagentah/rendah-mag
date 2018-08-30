/* eslint-disable react/sort-comp, react/prefer-stateless-function, no-return-assign,
react/no-danger */

import React, { PureComponent } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import { ArrowRight } from '../Elements/Svg';

export class SubscribeBanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputPlaceHolder: 'ENTER YOUR EMAIL' };
  }

  render() {
    const CustomForm = ({ status, onValidated }) => {
      let email;

      const submit = () =>
        email &&
        email.value.indexOf('@') > -1 &&
        onValidated({
          EMAIL: email.value,
        });

      const submitInit = (e) => {
        e.preventDefault();
        submit();
      };

      return (
        <div>
          <form className="rel" onSubmit={submitInit} action="" noValidate>
            <input
              className="t-title  ph2  pb1  w-100  f5  bb bc-black"
              ref={node => (email = node)}
              type="email"
              placeholder={this.state.inputPlaceHolder}
            />
            <span className="cp  abs  right" role="button" tabIndex={0} onClick={submitInit}><ArrowRight /></span>
          </form>
          {status === 'sending' && <div className="message">Subscribing...</div>}
          {status === 'error' && <div className="message">Please enter a valid email...</div>}
          {status === 'success' && <div className="message">Welcome to the family.</div>}
        </div>
      );
    };

    const url = 'https://rendahmag.us17.list-manage.com/subscribe/post?u=df0d549f92845c8dfc4d99dde&amp;id=2904b740be';
    return (
      <div className="container-medium  center">
        <div className="flex  pv2  ph1  ph0-lg">
          <div className="col-24">
            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status }) => (
                <CustomForm
                  status={status}
                  onValidated={formData => subscribe(formData)}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SubscribeBanner;
