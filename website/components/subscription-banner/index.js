import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useUser } from '~/lib/hooks';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);
export default function SubscriptionBanner(props) {
  const [user] = useUser();
  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;

  return (
    <div className="flex  justify-center  pv5  pv6-md">
      <div className="col-24 col-11-md  ph5  ph0-md">
        <p className="f6  f5-md  t-secondary  lh-copy  silver  tal">
          <strong>Mission Statement</strong>
          <br />
          <br />
        </p>
        <p className="f6  f5-md  t-secondary  lh-copy  almost-black  tal">
          This project is crafted to be open and collaborative. Through this, we
          seek to explore core themes within a structured framework:
          <br />
          <br />
          <ul className="pl3">
            <li className="pb2">
              <strong>Symbiosis</strong>: Can artists and communities have
              better relations?
            </li>
            <li className="pb2">
              <strong>Meaning</strong>: What matters in pursuing and preserving
              artistic influences?
            </li>
            <li className="pb2">
              <strong>Intersectivity</strong>: Are there chartable commonalities
              within art and technology?
            </li>
          </ul>
          <br />
          By asking questions, we hope to observe something new; and with that,
          offer our own perspective.
          <br />
          <br />
        </p>

        {!user && (
          <Link href="/dominion" legacyBehavior>
            <div className="flex  justify-start">
              <p className="flex-inline  flex-wrap  justify-start  f5  t-primary  lh-title  rendah-red  tal  align-center  cp">
                <span className="pr2">
                  Explore <span className="dn  dib-md">what we offer via</span>{' '}
                  our <span className="bb">Subscription</span>
                </span>
                <span>{buttonIconRed}</span>
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
