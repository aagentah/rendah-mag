/* eslint-disable react/sort-comp */

import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import SubscribeFrom from 'react-mailchimp-subscribe';

// Export this for unit testing more easily
export class SubscribeBanner extends PureComponent {
  renderForm = () => {
    const formProps = {
      action: 'https://rendahmag.us17.list-manage.com/subscribe/post?u=df0d549f92845c8dfc4d99dde&amp;id=2904b740be',
      messages: {
        inputPlaceholder: 'Enter your email...',
        btnLabel: 'Subscribe',
        sending: 'Subscribing',
        success: 'Subscribed',
        error: 'Not a valid email...',
      },
      styles: {
        sending: {
          fontSize: 16,
          color: 'black',
        },
        success: {
          fontSize: 16,
          color: 'black',
        },
        error: {
          fontSize: 16,
          color: 'black',
        },
      },
    };

    return <SubscribeFrom {...formProps} />;
  };

  render() {
    return (
      <div className="subscribeBanner">
        {this.renderForm()}
      </div>
    );
  }
}

// SubscribeBanner.propTypes = {
//   type: PropTypes.string,
//   color: PropTypes.string,
//   text: PropTypes.string,
// };
//
// SubscribeBanner.defaultProps = {
//   type: '',
//   color: '',
//   text: '',
// };

export default SubscribeBanner;
