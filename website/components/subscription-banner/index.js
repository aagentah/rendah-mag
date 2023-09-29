import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useUser } from '~/lib/hooks';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function SubscriptionBanner(props) {
  const [user] = useUser();
  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;

  return (
    <div className="flex  flex-wrap  pv5  pv6-md">
      <div className="col-4  col-6-md" />

      <div className="col-16  col-12-md">
        <p className="f5  f3-md  t-primary  lh-title  light-silver  tac  mb4">
          Rendah Mag is a creative UK-based outlet, primarily focused on
          exploring the intersection of experimental music, art, and technology.
        </p>

        {!user && (
          <Link href="/dominion" legacyBehavior>
            <div className="flex  justify-center">
              <p className="flex-inline  flex-wrap  justify-center  mla  mra  f5  f4-md  t-secondary  lh-title  rendah-red  tac  align-center  cp">
                <span className="pr2">
                  Explore{' '}
                  <span className="dn  dib-md">what we offer through</span> our
                  Subscription
                </span>
                <span>{buttonIconRed}</span>
              </p>
            </div>
          </Link>
        )}
      </div>

      <div className="col-4  col-6-md" />
    </div>
  );
}
