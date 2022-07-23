import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';

function PaypalPay() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) Router.replace('/dominion-thank-you');
  }, [redirect]);

  const ButtonWrapper = ({ type }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          intent: 'subscription'
        }
      });
    }, [type]);

    return (
      <PayPalButtons
        createSubscription={(data, actions) => {
          return actions.subscription
            .create({
              plan_id: 'P-6B5761572P962811FMJCNAWY'
            })
            .then(orderId => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          setRedirect(true);
        }}
        style={{
          layout: 'horizontal',
          color: 'black',
          label: 'subscribe',
          height: 39
        }}
      />
    );
  };

  return (
    <>
      <PayPalScriptProvider
        options={{
          'client-id':
            'AXJ4HaEwC7x-IEoVwM1z0_8Oh3AtG5EhS5h71ZXfDOypuuiw8h5LEwYIQYgrWpP1fD9W_rHBV6yQtBWq',
          components: 'buttons',
          intent: 'subscription',
          vault: true
        }}
      >
        <ButtonWrapper type="subscription" />
      </PayPalScriptProvider>
    </>
  );
}

export default React.memo(PaypalPay);
