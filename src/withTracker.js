/* eslint-disable arrow-parens, react/prop-types */

import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

GoogleAnalytics.initialize('UA-120300345-1');

ReactPixel.init('525916664612219', null, {
  autoConfig: true,
  debug: true,
});

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
    ReactPixel.pageView();
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
