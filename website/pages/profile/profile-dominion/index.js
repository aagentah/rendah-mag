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
        <div className="measure-wide">
          <p className="f-secondary  taj  f5  pb4  lh-copy">
            With the addition to being a magazine subscription, we offer the
            following to you as part of the Dominion Subscription:
          </p>
          <ul className="pl4  pb3">
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Welcome package (Includes membership card & stickers).
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              A quarterly-printed issue of Rendah Mag.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Your own Dominion Profile on our Website.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Exclusive monthly updates on releases & insights within bass
              music.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              20% off all Rendah Mag Products.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Early access to Rendah Mag Cyphers.
            </li>
            <li className="f-secondary  tal  f5  pb2  lh-copy">
              Exclusive tracks, sample packs, and discounts from artists and
              labels.
            </li>
          </ul>
          <p className="f-secondary  taj  f5  pb4  lh-copy">
            We hope you can join us on this new journey ❤️
          </p>
        </div>
        <div className="pb3">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Join the Dominion"
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
