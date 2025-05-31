import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Head from 'next/head';
import { generateEventId } from '~/lib/utils/event-id';

import { getSiteConfig } from '~/lib/sanity/requests';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default function DominionThankYou({ siteConfig, session }) {
  const router = useRouter();
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // Handle subscription purchase tracking
    if (session && typeof window !== 'undefined' && window.fbq) {
      console.log('Meta Pixel: Purchase fired (membership subscription)');
      window.fbq('track', 'Purchase', {
        currency: session.currency?.toUpperCase() || 'GBP',
        value: session.amount_total / 100 || 0,
        content_type: 'membership_subscription',
      });
    }
    // Legacy tracking for old orders
    else if (
      typeof router.query.order === 'string' &&
      router.query.success === '1' &&
      typeof window !== 'undefined' &&
      window.fbq
    ) {
      // @why: Use same timestamp estimation as server for event ID generation
      const estimatedTimestamp = Math.floor(Date.now() / 1000) - 30; // Approximate checkout completion time
      const eventId = generateEventId(
        'purchase',
        router.query.order,
        estimatedTimestamp
      );

      window.fbq(
        'track',
        'Purchase',
        {
          currency: 'GBP',
        },
        {
          eventID: eventId, // @why: Enables deduplication with server-side event
        }
      );
    }

    if (session?.customer_details?.email) {
      setCustomerEmail(session.customer_details.email);
    }
  }, [router.query, session]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Layout
        navOffset="top"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Thank you',
          description: null,
        }}
        preview={null}
      >
        <Container>
          <div className="max-w-lg py-16">
            <div className="pb-4 text-left">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Welcome to the Membership!"
                color="neutral-300"
                size="large"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            {customerEmail && (
              <div className="pb-4">
                <p className="text-sm text-neutral-500">
                  A confirmation email has been sent to{' '}
                  <strong className="text-neutral-300">{customerEmail}</strong>
                </p>
              </div>
            )}

            {session && (
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 my-8">
                <h3 className="text-neutral-300 text-sm mb-4">
                  Membership Details
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Membership ID:</span>
                    <span className="text-neutral-400 font-mono">
                      {session.subscription}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Amount:</span>
                    <span className="text-neutral-400">
                      {session.currency?.toUpperCase()}{' '}
                      {(session.amount_total / 100).toFixed(2)} / month
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Region:</span>
                    <span className="text-neutral-400">
                      {session.metadata?.customer_region || 'Global'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="pb-4 text-left">
              <Heading
                /* Options */
                htmlEntity="h2"
                text="What's next?"
                color="neutral-300"
                size="medium"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb-4">
              <p className="text-sm text-neutral-500">
                Check your email. We've created your account and have sent login
                details to access your Membership Dashboard.
              </p>
            </div>

            <div className="pb-4">
              <p className="text-sm text-neutral-500">
                In addition to the Membership Dashboard, we also send any
                updates via email, to keep you in the loop.
              </p>
            </div>

            <div className="pb-8 md:mb-4">
              <p className="text-sm text-neutral-500">
                If you have any questions at all, please don't hesitate to
                contact the team at{' '}
                <a className="underline" href="mailto:info@rendahmag.com">
                  info@rendahmag.com
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const siteConfig = await getSiteConfig();

  let session = null;

  if (query.session_id) {
    try {
      // @why: Retrieve Stripe session to show subscription details
      const stripeSession = await stripe.checkout.sessions.retrieve(
        query.session_id,
        {
          expand: ['subscription', 'customer'],
        }
      );

      // @why: Extract only serializable fields to prevent React hydration errors
      session = {
        id: stripeSession.id,
        subscription: stripeSession.subscription?.id || null,
        amount_total: stripeSession.amount_total,
        currency: stripeSession.currency,
        customer_details: {
          email: stripeSession.customer_details?.email || null,
        },
        metadata: stripeSession.metadata || {},
      };
    } catch (error) {
      console.error('Error retrieving Stripe session:', error);
      // @why: Continue without session data rather than breaking the page
    }
  }

  return {
    props: {
      siteConfig,
      session,
    },
  };
}
