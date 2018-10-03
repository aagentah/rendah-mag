/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Link extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <a className="link  black  t-body" href={this.props.url} rel="noopener noreferrer" target="_blank">
          <span className="Article__link--span  pb2">{this.props.text}</span>
        </a>
      </React.Fragment>
    );
  }
}

Link.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

Link.defaultProps = {
  text: '',
  url: '',
};

export default Link;
