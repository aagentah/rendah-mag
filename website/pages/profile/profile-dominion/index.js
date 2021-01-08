import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import { useKeenSlider } from 'keen-slider/react';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
  Label,
} from 'next-pattern-library';

import Carousel from './carousel.js';

import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { imageBuilder, getDominionItemsSinceDate } from '~/lib/sanity/requests';

export default function ProfileDominion({ refreshDominion }) {
  const [user, { loading, mutate, error }] = useUser();
  const [modalActive, setModalActive] = useState(null);
  const [dominionItems, setDominionItems] = useState(null);

  // Fetch dominion items
  useEffect(() => {
    const fetchDominionItems = async () => {
      let sinceStartOfMonth = user?.dominionSince.split('T')[0];
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 8, '0');
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 9, '1');

      // If whitelisted, then show all items since 2021
      if (user?.isDominionWiteList) {
        sinceStartOfMonth = '2021-01-01';
      }

      setDominionItems(await getDominionItemsSinceDate(sinceStartOfMonth));
    };

    if (user?.isDominion || user?.isDominionWiteList) fetchDominionItems();
  }, [user]);

  if (user?.isDominion && dominionItems?.length) {
    return (
      <>
        <div>
          {refreshDominion && (
            <Carousel
              dominionItems={dominionItems}
              refreshDominion={refreshDominion}
            />
          )}
        </div>

        {user?.dominionSince && (
          <p className="t-secondary  f6  grey  mt4">
            <span className="bold  pr1">Member since:</span>
            {new Date(user.dominionSince).toDateString()}
          </p>
        )}
      </>
    );
  }

  if (!user?.isDominion && !user?.isDominionWiteList) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You are not currently in the Dominion."
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Click here to join"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            invert={false}
            loading={false}
            disabled={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/dominion',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                scroll: false,
              },
            }}
          />
        </div>
      </>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="No results."
      color="black"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
