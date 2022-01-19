import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { Button } from 'next-pattern-library';

import { useApp } from '~/context-provider/app';

export default function CookieBanner() {
  const app = useApp();
  const [active, setActive] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleOnClick = () => {
    Cookies.set('rndh-cookie-set', true, { expires: 365 });
    setActive(false);
    setAccepted(true);
  };

  useEffect(() => {
    if (!Cookies.get('rndh-cookie-set')) {
      setActive(true);
    }
  }, []);

  return (
    <div
      className={`flex  flex-wrap  cookie-banner  ${
        active ? 'cookie-banner--active' : ''
      } ${accepted ? 'cookie-banner--accepted' : ''}`}
    >
      <div className="col-16  ph4  flex  align-center  justify-start">
        <div>
          <div className="cookie-banner__body">
            We use{' '}
            <a className="underline" href="/cookie-policy" target="_blank">
              cookies
            </a>{' '}
            to keep you logged in to the Dominion.
          </div>
        </div>
      </div>
      <div className="col-8  ph4  flex  align-center  justify-end">
        <div className="cookie-banner__button">
          <Button
            /* Options */
            type="primary"
            size="small"
            text="Accept"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={handleOnClick}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </div>
    </div>
  );
}
