import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { useToasts } from 'react-toast-notifications';

import { Heading, Button, Icon } from 'next-pattern-library';

import { useApp, useDispatchApp } from '../../context-provider/app';

export default function SubscribeForm() {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { addToast } = useToasts();
  const [buttonLoading, setButtonLoading] = useState(false);

  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();

    if (!inputEl.current.value) {
      return addToast('You must enter a valid email.', {
        appearance: 'info',
        autoDismiss: true,
      });
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
      addToast('Welcome to the newsletter!', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      // Error
      addToast(json.error, {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    inputEl.current.value = '';
    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(false);
  };

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <form
      className="w-100  pv5  ph0  ph3-md  flex  flex-wrap  justify-center  align-center  bg-almost-white"
      onSubmit={subscribe}
    >
      <div className="col-24  flex  flex-wrap  justify-center  tac  pb3  mb0  mb2-md">
        <Heading
          /* Options */
          htmlEntity="h1"
          text="Join our newsletter!"
          color="black"
          size="medium"
          truncate={null}
          reveal={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

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
      </div>

      <p className="t-secondary  f6  almost-black  lh-copy  col-24  tac  pt4  ph5  ph0-md">
        We&apos;ll only send emails when new content is posted. No spam.
      </p>
    </form>
  );
}
