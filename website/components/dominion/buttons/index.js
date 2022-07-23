import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import classNames from 'classnames';

import { Button, Icon } from 'next-pattern-library';

import PaypalPay from '~/components/dominion/paypalPay';
import PaypalFree from '~/components/dominion/paypalFree';

import { useApp } from '~/context-provider/app';

function Buttons() {
  const [discount, setDiscount] = useState('');
  const [redirect, setRedirect] = useState(false);
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
  const app = useApp();

  let payBtn = classNames({
    db: discount !== 'RND1MONTH',
    dn: discount === 'RND1MONTH'
  });

  let freeBtn = classNames({
    db: discount === 'RND1MONTH',
    dn: discount !== 'RND1MONTH'
  });

  useEffect(() => {
    if (redirect) Router.replace('/dominion-thank-you');
  }, [redirect]);

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

  return (
    <>
      <div className="col-7  flex  align-center  pb1">
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

      <div className="col-10  flex  align-center  ph3">
        <div className={payBtn}>
          <PaypalPay />
        </div>

        <div className={freeBtn}>
          <PaypalFree />
        </div>
      </div>

      <div className="col-7  flex  align-center  pb1">
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
