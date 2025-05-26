import { useEffect } from 'react';
import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function ProductThankYou({ siteConfig }) {
  // Fire Meta Pixel 'Purchase' event on page load (if available)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        // value: 0, // Set to actual product value if known
        currency: 'GBP',
      });
    }
  }, []);

  return (
    <>
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

            <div className="pb-4">
              <p className="text-sm text-neutral-500">
                We can't thank you enough {'<3'}
              </p>
            </div>

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
                We typically ship out any new orders within 3-days of purchase
                (it's a small operation here, so please bear with us).
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

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
