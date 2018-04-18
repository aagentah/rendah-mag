/* eslint-disable eslint-disable import/no-named-as-default,
import/no-named-as-default-member, arrow-body-style */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Heading extends PureComponent {
  renderLoading = () => {
    return (
      <div className={`Loading  Loading--${this.props.type}`}>
        <span className="spinner1" />
        <span className="spinner2" />
        <span className="spinner3" />
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderLoading()}
      </div>
    );
  }
}

Heading.propTypes = {
  type: PropTypes.string,
};

Heading.defaultProps = {
  type: '',
};

export default Heading;
