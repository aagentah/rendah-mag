/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key */

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
          {this.props.list.map((item, i) => (
            <li className="pv1  normal-font  grey" key={i}><p>{item}</p></li>
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
