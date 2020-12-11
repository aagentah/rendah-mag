import { useState, useEffect } from 'react';
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

      setDominionItems(await getDominionItemsSinceDate(sinceStartOfMonth));
    };

    if (user?.isDominion) fetchDominionItems();
  }, [user]);

  if (dominionItems?.length) {
    return (
      <section>
        <div className="pb4">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Your Dominion."
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div>
          {refreshDominion && (
            <Carousel
              dominionItems={dominionItems}
              refreshDominion={refreshDominion}
            />
          )}
        </div>

        <p className="t-secondary  f6  grey">
          <span className="bold  pr1">Member since:</span>
          {new Date(user?.dominionSince).toDateString()}
        </p>
      </section>
    );
  }

  if (!user?.isDominion) {
    return (
      <Heading
        /* Options */
        htmlEntity="h1"
        text="You are not in the Dominion."
        color="black"
        size="medium"
        truncate={null}
        /* Children */
        withLinkProps={null}
      />
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
