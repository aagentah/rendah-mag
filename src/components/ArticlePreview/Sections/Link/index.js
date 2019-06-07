/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Link extends PureComponent {
  render() {
    return (
      <div className="pv3  tac">
        <a className="btn  btn--primary  bg-white  bg-black-hover  ba  bw1  bc-black  black  white-hover  tac" href={this.props.url} rel="noopener noreferrer" target="_blank">
          {this.props.text}
        </a>
      </div>
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
