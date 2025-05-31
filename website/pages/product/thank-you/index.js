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

export default function ProductThankYou({ siteConfig, session }) {
  const router = useRouter();
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // @why: Handle product purchase tracking with session data if available
    if (session && typeof window !== 'undefined' && window.fbq) {
      console.log('Meta Pixel: Purchase fired (product)');
      window.fbq('track', 'Purchase', {
        currency: session.currency?.toUpperCase() || 'GBP',
        value: session.amount_total / 100 || 0,
        content_type: 'product',
      });
    }
    // @why: Legacy tracking for old orders without session data
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

    // @why: Extract customer email from session data if available
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
          image:
            'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610196181/dominion/dominion-social-facebook-meta.png',
        }}
        preview={null}
      >
        <Container>
          <div className="max-w-lg py-16">
            <div className="pb-4 text-left">
              <Heading
                htmlEntity="h1"
                text="Thank you for your purchase!"
                color="neutral-300"
                size="large"
                truncate={null}
                onClick={null}
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
                <h3 className="text-neutral-300 text-sm mb-4">Order Details</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Order ID:</span>
                    <span className="text-neutral-400 font-mono">
                      {session.payment_intent || session.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Amount:</span>
                    <span className="text-neutral-400">
                      {session.currency?.toUpperCase()}{' '}
                      {(session.amount_total / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Region:</span>
                    <span className="text-neutral-400">
                      {session.metadata?.customer_region || 'Global'}
                    </span>
                  </div>
                  {session.metadata?.product_title && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Product:</span>
                      <span className="text-neutral-400">
                        {session.metadata.product_title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pb-4 text-left">
              <Heading
                htmlEntity="h2"
                text="What's next?"
                color="neutral-300"
                size="medium"
                truncate={null}
                onClick={null}
                withLinkProps={null}
              />
            </div>

            <div className="pb-4">
              <p className="text-sm text-neutral-500">
                We typically ship out new orders once each week. (it's a super
                small operation here, so thank you for the patience).
              </p>
            </div>

            <div className="pb-8 md:mb-4">
              <p className="text-sm text-neutral-500">
                If you have any questions, feel free to contact us at{' '}
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
      // @why: Retrieve Stripe session to show order details, similar to membership page
      session = await stripe.checkout.sessions.retrieve(query.session_id, {
        expand: ['payment_intent', 'customer'],
      });
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
