import React, { useRef } from 'react';
import fetch from 'isomorphic-unfetch';
import { useToasts } from 'react-toast-notifications';

import { Button, Icon } from 'next-pattern-library';

import { useApp, useDispatchApp } from '../../context-provider/app';

export default function SubscribeForm() {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { addToast } = useToasts();

  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_LOADING' });

    const res = await fetch('/api/common/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
      dispatch({ type: 'TOGGLE_LOADING' });
      return;
    }

    inputEl.current.value = '';
    addToast('Success! 🎉 You are now subscribed to the newsletter.', {
      appearance: 'success',
      autoDismiss: true,
    });
    dispatch({ type: 'TOGGLE_LOADING' });
  };

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <form className="w-100" onSubmit={subscribe}>
      <div className="flex  flex-wrap">
        <input
          className="subscribe-banner__input  di"
          id="email-input"
          name="email"
          placeholder="you@awesome.com"
          ref={inputEl}
          type="email"
        />

        <Button
          /* Options */
          type="primary"
          size="medium"
          text="Subscribe"
          color="black"
          fluid={false}
          icon={buttonIconArrowRight}
          iconFloat={null}
          inverted
          loading={null}
          disabled={app.isLoading}
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

      <p className="t-secondary  f6  almost-black  lh-copy  pv2  col-24">
        We&apos;ll only send emails when new content is posted. No spam.
      </p>
    </form>
  );
}
