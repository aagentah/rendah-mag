import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';

import { Button, Icon } from 'next-pattern-library';

import { useApp, useDispatchApp } from '../../context-provider/app';

export default function SubscribeForm({ onSuccess }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [buttonLoading, setButtonLoading] = useState(false);

  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();

    if (!inputEl.current.value) {
      return toast.info('You must enter a valid email.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(true);

    const response = await fetch('/api/mailchimp/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const json = await response.json();

    if (response.ok) {
      // Success
      toast.success('Welcome to the newsletter');
      onSuccess && onSuccess();
    } else {
      // Error
      toast.error('Error');
    }

    inputEl.current.value = '';
    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(false);
  };

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <form
      noValidate
      className="w-100  flex  flex-wrap  justify-center  align-center"
      onSubmit={subscribe}
    >
      <div className="flex  flex-wrap  mt2  ph4  ph0-md">
        <input
          className="subscribe-banner__input  col-24  col-16-md  flex  justify-center  mb3  mb0-md"
          id="email-input"
          name="email"
          placeholder="Your email"
          ref={inputEl}
          type="email"
        />

        <div className="col-24  col-8-md  flex  justify-center  justify-start-md">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Subscribe"
            color="black"
            fluid={false}
            icon={buttonIconArrowRight}
            iconFloat={null}
            inverted={false}
            loading={buttonLoading}
            disabled={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'form',
              url: null,
              target: null,
              routerLink: null,
            }}
          />
        </div>
      </div>
    </form>
  );
}
