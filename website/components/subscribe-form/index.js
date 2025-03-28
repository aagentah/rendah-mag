import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';

import Button from '~/components/elements/button';

import { useApp, useDispatchApp } from '../../context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function SubscribeForm({ type, onSuccess }) {
  const app = useApp();
  const router = useRouter();
  const dispatch = useDispatchApp();
  const plausible = usePlausible();
  const [buttonLoading, setButtonLoading] = useState(false);
  const fullPath = router.asPath;

  const inputEl = useRef(null);

  const log = () => {
    plausible('Newsletter', {
      props: {
        action: type || '',
        label: fullPath,
      },
    });
  };

  const subscribe = async (e) => {
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
            status: 'subscribed',
            merge_fields: {
              PAGE: fullPath,
              COMPONENT: type || '',
            },
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    if (response.ok) {
      log();
      toast.success('Welcome to the newsletter');
      Cookies.set('rndh-newsletter-set', true, { expires: 365 });
      if (onSuccess) onSuccess();
    } else if (response.status === 400) {
      toast.info('You are already added to our newsletter.');
    } else {
      toast.error('There was an issue adding you.');
    }

    inputEl.current.value = '';
    dispatch({ type: 'TOGGLE_LOADING' });
    setButtonLoading(false);
    return true;
  };

  const buttonIconArrowRight = <IconArrowRight color="white" size={16} />;

  return (
    <form noValidate onSubmit={subscribe} className="w-full">
      <div className="flex w-full max-w-md">
        <input
          id="email-input"
          name="email"
          placeholder="Your email"
          ref={inputEl}
          type="email"
          className="shadow-none outline-none rounded-none bg-transparent text-sm md:text-base p-2 border border-r-0 placeholder:opacity-100 w-2/3 text-neutral-400 border-neutral-400 placeholder:text-neutral-400"
        />
        <button
          type="submit"
          className="border border-neutral-400 text-neutral-400 bg-transparent px-3 py-2 cursor-pointer w-1/3"
        >
          Join
        </button>
      </div>
    </form>
  );
}
