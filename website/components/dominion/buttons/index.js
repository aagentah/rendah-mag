import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';

import Button from '~/components/elements/button';

import { useApp } from '~/context-provider/app';

const IconShoppingCart = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconShoppingCart)
);

const IconPlus = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconPlus)
);

function Buttons() {
  const [discount, setDiscount] = useState('');
  const buttonIconCart = <IconShoppingCart color="rendah-red" size={16} />;
  const buttonIconPlus = <IconPlus color="rendah-red" size={16} />;
  const app = useApp();

  const submit = async () => {
    const priceId =
      process.env.ENV_TYPE === 'development'
        ? 'price_1KOTLxKb3SeE1fXfnkcObl4Q'
        : 'price_1Lg5qXKb3SeE1fXf5mFEgyzs';

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
            discount,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
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
      <div className="col-24  col-12-md  flex  align-center  justify-center  pr3-md  pb3  pb0-md">
        <Button
          /* Options */
          type="primary"
          size="medium"
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

      <div className="col-24  col-12-md  flex  align-center  justify-center  pl3-md">
        <div className="flex  flex-wrap  bg-white  justify-center  pa2  ph3  br2  w-100  bg-white  shadow2  input__promo">
          <input
            className="input  w-100  tac"
            placeholder="PROMO CODE"
            type="text"
            value={discount}
            onChange={(e) => {
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
