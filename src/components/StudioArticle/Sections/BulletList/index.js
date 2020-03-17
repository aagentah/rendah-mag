/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BulletList extends Component {
  renderChildren = (child, i) => {
    if (child.marks) {
      if (child.marks.includes('stong') && child.marks.includes('em')) {
        return (
          <strong key={i} className="di">
            <em>{child.text}</em>
          </strong>
        );
      }
      if (child.marks.includes('strong')) {
        return (
          <strong key={i} className="di">
            {child.text}
          </strong>
        );
      }
      if (child.marks.includes('em')) {
        return (
          <em key={i} className="di">
            {child.text}
          </em>
        );
      }
    }

    return child.text;
  };

  render() {
    const { text } = this.props;

    if (text[0].text) {
      return (
        <React.Fragment>
          <li className="db  t-body  lh-copy  f6  black">
            {text.map((child, i) => this.renderChildren(child, i))}
          </li>
        </React.Fragment>
      );
    }
    return false;
  }
}

export default BulletList;

BulletList.propTypes = {
  text: PropTypes.string,
};

BulletList.defaultProps = {
  text: '',
};
