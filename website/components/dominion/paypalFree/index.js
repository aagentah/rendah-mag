import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

function PaypalFree() {
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
              plan_id: 'P-30777548T6657750KMJCXROI'
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

  return <ButtonWrapper type="subscription" />;
}

export default React.memo(PaypalFree);
