import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import classNames from 'classnames';

import { Button, Icon } from 'next-pattern-library';

import PaypalPay from '~/components/dominion/paypalPay';
import PaypalFree from '~/components/dominion/paypalFree';

import { useApp } from '~/context-provider/app';

function Buttons() {
  const [sdkReady, setSdkReady] = useState(false);
  const [discount, setDiscount] = useState('');
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
  const app = useApp();

  const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=AXJ4HaEwC7x-IEoVwM1z0_8Oh3AtG5EhS5h71ZXfDOypuuiw8h5LEwYIQYgrWpP1fD9W_rHBV6yQtBWq`;
    // script.setAttribute("data-namespace", "paypal_sdk");
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        setSdkReady(true);
      }, 10);
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setTimeout(() => {
        setSdkReady(true);
      }, 10);
    }
  }, []);

  let payBtn = classNames({
    db: discount !== 'RND1MONTH',
    dn: discount === 'RND1MONTH'
  });

  let freeBtn = classNames({
    db: discount === 'RND1MONTH',
    dn: discount !== 'RND1MONTH'
  });

  const submit = async () => {
    const priceId =
      process.env.ENV_TYPE === 'development'
        ? 'price_1KOTLxKb3SeE1fXfnkcObl4Q'
        : 'dominion-subscription_2ff0f5';

    const response = await fetch(
      `${process.env.SITE_URL}/api/stripe/checkout-sessions`,
      {
        body: JSON.stringify({
          data: {
            priceId,
            quantity: 1,
            mode: 'subscription',
            successUrl: '/dominion-thank-you',
            cancelUrl: '/dominion',
            discount
          }
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    if (response.ok) {
      // Success
      const data = await response.json();
      window.location.href = data.url;
    }
  };

  console.log('sdkReady', sdkReady);

  return (
    <>
      <div className="dominion__subscribe-col  col-24  col-7-md  flex  align-center  justify-center  pb3  pb1-md">
        <Button
          /* Options */
          type="primary"
          size="small"
          text="Subscribe"
          color="black"
          fluid={true}
          icon={buttonIconPlus}
          iconFloat="left"
          inverted={false}
          loading={false}
          disabled={false}
          skeleton={false}
          onClick={submit}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <div className="col-24  col-10-md  flex  align-center  justify-center  pb3  pb0-md  ph3">
        <div className={`w-100-md  ${payBtn}`}>
          {sdkReady ? (
            <PaypalPay />
          ) : (
            <Button
              /* Options */
              type="secondary"
              size="small"
              text=""
              color="black"
              fluid={true}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={true}
              disabled={true}
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          )}
        </div>

        <div className={`w-100-md  ${freeBtn}`}>
          {sdkReady ? (
            <PaypalFree />
          ) : (
            <Button
              /* Options */
              type="secondary"
              size="small"
              text="Loading"
              color="black"
              fluid={true}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={true}
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          )}
        </div>
      </div>

      <div className="col-24  col-7-md  flex  align-center  justify-center  pb3  pb0-md  pb1">
        <div className="mw4  shadow1">
          <input
            className="input"
            placeholder="PROMO CODE"
            type="text"
            value={discount}
            onChange={e => {
              const val = e.target.value;
              setDiscount(val.toUpperCase());
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Buttons;
