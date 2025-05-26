import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Head from 'next/head';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function DominionThankYou({ siteConfig }) {
  const router = useRouter();

  useEffect(() => {
    // Only fire Purchase event if order and success params are present and order is a string
    if (
      typeof router.query.order === 'string' &&
      router.query.success === '1' &&
      typeof window !== 'undefined' &&
      window.fbq
    ) {
      window.fbq('track', 'Purchase', {
        currency: 'GBP',
      });
    }
  }, [router.query]);

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

            <div className="pb-4">
              <p className="text-sm text-neutral-500">
                We can't thank you enough, and we're happy to have you on this
                journey with us.
              </p>
            </div>

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

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
