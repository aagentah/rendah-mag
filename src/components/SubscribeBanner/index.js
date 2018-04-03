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
        inputPlaceholder: 'ENTER YOUR EMAIL',
        btnLabel: 'SUBSCRIBE',
        sending: 'SUBSCRIBING',
        success: 'SUBSCRIBED',
        error: 'NOT A VALID EMAIL',
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
