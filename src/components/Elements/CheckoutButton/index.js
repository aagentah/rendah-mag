/* eslint-disable import/no-named-as-default, arrow-body-style,
jsx-a11y/no-static-element-interactions, react/prefer-stateless-function */

import React, { PureComponent } from 'react';

import { Cart } from '../Svg';

export class CheckoutButton extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <span className="snipcart-checkout  rel  cp">
          <Cart />
          <div className="snipcart-summary">
            <span className="snipcart-total-items" />
          </div>
        </span>
      </React.Fragment>
    );
  }
}

export default CheckoutButton;
