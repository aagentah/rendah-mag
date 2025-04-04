import { useRouter } from 'next/router';

import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function DominionThankYou({ siteConfig }) {
  const router = useRouter();

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
                /* Options */
                htmlEntity="h1"
                text="Welcome to the Membership!"
                color="neutral-400"
                size="large"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb-4">
              <Copy
                /* Options */
                text={`
                  We can't thank you enough, and we're happy to have you on
                  this journey with us.
                `}
                color="neutral-500"
                size="large"
                truncate={null}
              />
            </div>

            <div className="pb-4 text-left">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="What's next?"
                color="neutral-400"
                size="medium"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb-4">
              <Copy
                /* Options */
                text={`
                  Check your email. We've created your account and have sent
                  login details to access your Membership Dashboard.
                `}
                color="neutral-500"
                size="large"
                truncate={null}
              />
            </div>

            <div className="pb-4">
              <Copy
                /* Options */
                text={`
                  In addition to the Membership Dashboard, we also send any updates via
                  email, to keep you in the loop.
                `}
                color="neutral-500"
                size="large"
                truncate={null}
              />
            </div>

            <div className="pb-8 md:mb-4">
              <Copy
                /* Options */
                text={`
                  If you have any questions at all, please don't hesitate to
                  contact the team at info@rendahmag.com.
                `}
                color="neutral-500"
                size="large"
                truncate={null}
              />
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
