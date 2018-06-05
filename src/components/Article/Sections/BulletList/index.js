/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class BulletList extends PureComponent {
  text = () => {
    if (this.props.text) {
      return <p className="pv1  normal-font  grey">{this.props.text}</p>;
    }
    return null;
  };

  render() {
    return (
      <div>
        {this.text()}
        <ul className="mb0">
          {this.props.list.map(item => (
            <li key={item} className="pv1  normal-font  grey"><p>{item}</p></li>
          ))}
        </ul>
      </div>
    );
  }
}

BulletList.propTypes = {
  text: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};

BulletList.defaultProps = {
  text: '',
  list: [
    '',
  ],
};

export default BulletList;
