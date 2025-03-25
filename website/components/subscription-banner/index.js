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
            This project exists to research the topic of creative context within
            underground & experimental arts. Through the lens of
            creative-journalism, we explore the life-cycle of artists and their
            projects, in an otherwise undocumented space.
          </p>

          {/* {!user && (
            <Link href="/membership" legacyBehavior>
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
            <p className="flex justify-between border-b border-neutral-700 pb-2">
              <span>Established</span>
              <span>2018</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-2">
              <span>Artists featured</span>
              <span>~400</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-2">
              <span>Prints</span>
              <span>11</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-2">
              <span>Next Print</span>
              <span>June/May 2024</span>
            </p>
            <p className="flex justify-between border-b border-neutral-700 pb-2">
              <span>Advertisements (ever)</span>
              <span>0</span>
            </p>
            {!user && (
              <Link href="/membership" legacyBehavior>
                <a className="flex justify-between border-b border-neutral-700 text-rendah-red pb-2">
                  <span>Join Membership</span>
                  <span>[includes latest print]</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
