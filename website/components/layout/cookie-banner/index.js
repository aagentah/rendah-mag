import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { Button } from 'next-pattern-library';

import { useApp } from '~/context-provider/app';

export default function CookieBanner() {
  const app = useApp();
  const [active, setActive] = useState(false);
  let buttonSize = app.deviceSize === 'md' ? 'small' : 'medium';

  const handleOnClick = () => {
    Cookies.set('rndh-cookie-set', true, { expires: 365 });
    setActive(false);
  };

  useEffect(() => {
    if (!Cookies.get('rndh-cookie-set')) {
      setActive(true);
    }
  }, []);

  console.log('active', active);

  return (
    <div
      className={`flex  flex-wrap  cookie-banner  ${
        active ? 'cookie-banner--active' : ''
      }`}
    >
      <div className="col-16  ph4  flex  align-center  justify-start">
        <div>
          <div className="cookie-banner__body">
            We may use{' '}
            <Link href="/cookie-policy">
              <a target="_blank">cookies</a>
            </Link>{' '}
            to offer a better browsing experience.
          </div>
        </div>
      </div>
      <div className="col-8  ph4  flex  align-center  justify-end">
        <div className="cookie-banner__button">
          <Button
            /* Options */
            type={'primary'}
            size={buttonSize}
            text={'Accept'}
            color={'black'}
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={false}
            loading={false}
            disabled={false}
            onClick={handleOnClick}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </div>
    </div>
  );
}
