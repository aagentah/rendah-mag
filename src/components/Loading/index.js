/* eslint-disable eslint-disablee */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Loading extends PureComponent {
  renderLoading = () => (
    <div className={`Loading  Loading--${this.props.type}`}>
      <span className="spinner1" />
      <span className="spinner2" />
      <span className="spinner3" />
    </div>
  );

  render() {
    return (
      <div>
        {this.renderLoading()}
      </div>
    );
  }
}

Loading.propTypes = {
  type: PropTypes.string,
};

Loading.defaultProps = {
  type: '',
};

export default Loading;
