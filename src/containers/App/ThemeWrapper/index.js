/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function,
jsx-a11y/no-static-element-interactions, arrow-body-style */

import React, { PureComponent } from 'react';
import includes from 'lodash/includes';

import Header from '../Header';
import Footer from '../Footer';

export class ThemeWrapper extends PureComponent {
  constructor() {
    super();
    this.state = {
      theme: 'light',
    };
  }

  componentDidMount() {
    this.handleTheme();
  }

  componentWillReceiveProps() {
    this.handleTheme();
  }

  handleTheme = () => {
    if (typeof window !== 'undefined') {
      this.setState({ theme: includes(window.location.pathname, '/studio') ? 'dark' : 'light' });
    }
  };

  render() {
    return (
      <div className="App" data-theme={this.state.theme}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default ThemeWrapper;
