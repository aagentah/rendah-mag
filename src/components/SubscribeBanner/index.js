/* eslint-disable react/sort-comp, react/prefer-stateless-function, no-return-assign,
react/no-danger */

import React, { PureComponent } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Icon } from 'rendah-pattern-library';

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
              className="t-title  ph2  pb2  w-100  f5  bb bc-black"
              ref={node => (email = node)}
              type="email"
              placeholder={this.state.inputPlaceHolder}
            />
            <span className="cp  absolute  right  pr1  pt1" role="button" tabIndex={0} onClick={submitInit}>
              <Icon icon={'arrow-right'} color={'black'} size={12} />
            </span>
          </form>

          {status === 'sending' && <div className="t-body  f7  black  pt2  grey">Subscribing...</div>}
          {status === 'error' && <div className="t-body  f7  black  pt2  grey">Please enter a valid email...</div>}
          {status === 'success' && <div className="t-body  f7  black  pt2  grey">Welcome to the family.</div>}
        </div>
      );
    };

    const url = 'https://rendahmag.us17.list-manage.com/subscribe/post?u=df0d549f92845c8dfc4d99dde&amp;id=2904b740be';
    return (
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status }) => (
          <CustomForm
            status={status}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    );
  }
}

export default SubscribeBanner;
