import React, { useRef } from 'react';
import fetch from 'isomorphic-unfetch';
import { useToasts } from 'react-toast-notifications';
import LazyLoad from 'react-lazyload';

import { Button, Icon } from 'next-pattern-library';

import { useApp, useDispatchApp } from '~/context-provider/app';

export default function SubscribeBanner({ padding, marginTop, marginBottom }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { addToast } = useToasts();

  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_LOADING' });

    const response = await fetch(
      `${process.env.SITE_URL}/api/mailchimp/add-member`,
      {
        body: JSON.stringify({
          data: {
            email_address: inputEl.current.value,
            status: 'subscribed',
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    const { error } = await response.json();

    if (error) {
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
      return dispatch({ type: 'TOGGLE_LOADING' });
    }

    inputEl.current.value = '';
    addToast('Success! 🎉 You are now subscribed to the newsletter.', {
      appearance: 'success',
      autoDismiss: true,
    });
    dispatch({ type: 'TOGGLE_LOADING' });
    return true;
  };

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <LazyLoad once offset={150} height="150">
      <form
        className={`subscribe-banner  mt${marginTop}  mb${marginBottom}`}
        onSubmit={subscribe}
      >
        <div className="col-24  flex  flex-wrap  justify-center  mb3">
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

        <div className="col-24  flex  justify-center">
          <p className="t-secondary  f6  almost-black  lh-copy  tac">
            We&apos;ll only send emails when new content is posted. No spam.
          </p>
        </div>
      </form>
    </LazyLoad>
  );
}
