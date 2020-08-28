import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { Heading } from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function ProfileDominion({ subscriptionItems }) {
  console.log('subscriptionItems', subscriptionItems);

  if (subscriptionItems?.length) {
    return (
      <>
        <div className="pb3">
          <section className="pb5">
            <div className="pb4">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Your Dominion."
                color="black"
                size="medium"
                truncate={null}
                reveal={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="flex  flex-wrap">
              {subscriptionItems.map((item, i) => (
                <div className="bg-almost-white  pa2  shadow1">
                  <div className="bg-almost-white  pa3">
                    <p className="t-primary  f6  black  pb2">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pb3">
        <section className="pb5">
          <div className="pb4">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="You are not in the Dominion."
              color="black"
              size="medium"
              truncate={null}
              reveal={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </section>
      </div>
    </>
  );
}
