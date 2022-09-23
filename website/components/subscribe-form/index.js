import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

import Button from '~/components/elements/button';

import { useApp, useDispatchApp } from '../../context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconArrowRight)
);

export default function SubscribeForm({ onSuccess }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [buttonLoading, setButtonLoading] = useState(false);

  const inputEl = useRef(null);

  const subscribe = async e => {
    e.preventDefault();

    if (!inputEl.current.value) {
      return toast.info('You must enter a valid email.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(true);

    const response = await fetch(
      `${process.env.SITE_URL}/api/mailchimp/add-member`,
      {
        body: JSON.stringify({
          data: {
            email_address: inputEl.current.value,
            status: 'subscribed'
          }
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    if (response.ok) {
      // Success
      toast.success('Welcome to the newsletter');
      Cookies.set('rndh-newsletter-set', true, { expires: 365 });
      if (onSuccess) onSuccess();
    } else if (response.status === 400) {
      // Already subscribed
      toast.info('You are already added to our newsletter.');
    } else {
      // Error
      toast.error('There was an issue adding you.');
    }

    inputEl.current.value = '';
    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(false);
    return true;
  };

  const buttonIconArrowRight = <IconArrowRight color="white" size={16} />;

  return (
    <form
      noValidate
      className="subscribe-banner  w-100  flex  flex-wrap  justify-center  align-center"
      onSubmit={subscribe}
    >
      <div className="flex  flex-wrap  mt2  w-100">
        <input
          className="subscribe-banner__input  col-17  col-16-md  flex  justify-center"
          id="email-input"
          name="email"
          placeholder="Your email"
          ref={inputEl}
          type="email"
        />

        <div className="subscribe-banner__submit  col-7  col-8-md  flex  justify-center  justify-start-md  pr2  pr0-md">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Join"
            color="black"
            fluid={false}
            icon={buttonIconArrowRight}
            iconFloat={null}
            inverted={false}
            loading={buttonLoading}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'form',
              url: null,
              target: null,
              routerLink: null
            }}
          />
        </div>
      </div>
    </form>
  );
}
