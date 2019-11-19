/* @flow */
/* eslint-disable import/no-named-as-default,
  react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Paragraph extends Component {
  renderChildren = (child, markDefs, i) => {
    if (child.marks) {
      // If has inline URL link
      if (markDefs.length) {
        if (child.marks[0] === markDefs[0]._key) {
          return (
            <a key={i} target="_blank" href={markDefs[0].url} rel="noopener noreferrer" className="di  underline  rendah-red">
              {child.text}
            </a>
          );
        }
      }

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
    const { text, markDefs } = this.props;

    if (text[0].text) {
      return (
        <React.Fragment>
          <p className="db  t-body  lh-copy  f6  dark-grey  taj  pv3">
            {text.map((child, i) => this.renderChildren(child, markDefs, i))}
          </p>
        </React.Fragment>
      );
    }
    return false;
  }
}

Paragraph.propTypes = {
  text: PropTypes.array,
  markDefs: PropTypes.array,
};

Paragraph.defaultProps = {
  text: [],
  markDefs: [],
};

export default Paragraph;
