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
    <div className="container my-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 max-w-md">
          <p className="text-xs md:text-sm text-neutral-500 leading-relaxed text-left">
            <strong>
              <span className="text-neutral-400">Rendah Mag</span> / Mission
              Statement
            </strong>
            <br />
            <br />
          </p>
          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed text-left">
            This project is crafted to be open and collaborative. Through this,
            we seek to explore core themes within a structured framework:
            <br />
            <br />
            <ul className="pl-3 list-disc">
              <li className="pb-2">
                <strong>Symbiosis</strong>: Can artists and communities have
                better relations?
              </li>
              <li className="pb-2">
                <strong>Meaning</strong>: What matters in pursuing and
                preserving artistic influences?
              </li>
              <li className="pb-2">
                <strong>Intersectivity</strong>: Are there chartable
                commonalities within art and technology?
              </li>
            </ul>
            <br />
            By asking questions, we hope to observe something new; and with
            that, offer our own perspective.
            <br />
            <br />
          </p>

          {/* {!user && (
            <Link href="/dominion" legacyBehavior>
              <a className="flex justify-start">
                <p className="flex flex-wrap items-center text-base text-red-600 leading-tight text-left cursor-pointer">
                  <span className="pr-2">
                    Explore{' '}
                    <span className="hidden md:inline">what we offer via</span>{' '}
                    our <span className="underline">Subscription</span>
                  </span>
                  <span>{buttonIconRed}</span>
                </p>
              </a>
            </Link>
          )} */}
        </div>

        <div className="md:col-span-1 flex flex-col justify-between gap-y-2">
          <div className="text-neutral-300 text-sm grid gap-y-2">
            <p className="flex justify-between border-b border-neutral-700 pb-1">
              <strong>Established</strong>
              <span>2018</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-1">
              <strong>Articles</strong>
              <span>320</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-1">
              <strong>Prints</strong>
              <span>11</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-1">
              <strong>Next Print</strong>
              <span>June/May 2024</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-1">
              <strong>Active Members</strong>
              <span>150</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-1">
              <strong>Advertisements (ever)</strong>
              <span>0</span>
            </p>
          </div>

          {!user && (
            <div className="text-neutral-300 text-sm grid gap-y-2">
              <Link href="/dominion" legacyBehavior>
                <a className="flex justify-between border-b border-rendah-red pb-1">
                  <span className="text-rendah-red">
                    Join Membership [includes latest print]
                  </span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
