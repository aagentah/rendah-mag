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

import Carousel from './carousel';

import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { imageBuilder, getAllOfferings } from '~/lib/sanity/requests';

export default function ProfileDominion({ refreshDominion }) {
  const [user, { loading, mutate, error }] = useUser();
  const [offerings, setOfferings] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);

  // Fetch offerings
  useEffect(() => {
    const action = async () => {
      let sinceStartOfMonth = user?.dominionSince.split('T')[0];
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 8, '0');
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 9, '1');

      const data = await getAllOfferings(sinceStartOfMonth);
      if (data) setOfferings(data);
    };

    action();
  }, [offerings?.length]);

  if (user?.isDominion && offerings?.length) {
    return (
      <>
        <section>
          {refreshDominion && (
            <Carousel
              offeringItems={offerings}
              refreshDominion={refreshDominion}
            />
          )}
        </section>
      </>
    );
  }

  if (!user?.isDominion) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You are not currently in the Dominion"
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
            skeleton={false}
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
      text="No results"
      color="black"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
