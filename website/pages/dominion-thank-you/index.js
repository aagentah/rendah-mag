import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Heading, Copy, Button } from 'next-pattern-library';

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
          <div className="measure-wide  mla  mra  pv3  pv0-md  ph3  ph4-md">
            <div className="pb3  tal">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Welcome to the Dominion!"
                color="black"
                size="large"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb3  taj">
              <Copy
                /* Options */
                text={`
                  We can't thank you enough, and we're happy to have you on
                  this journey with us.
                `}
                color="black"
                size="large"
                truncate={null}
              />
            </div>

            <div className="pb3  tal">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="So what's next?"
                color="black"
                size="medium"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb3  taj">
              <Copy
                /* Options */
                text={`
                  Check your email! We've created your account and have sent
                  login details to access your Dominion profile.
                `}
                color="black"
                size="large"
                truncate={null}
              />
            </div>

            <div className="pb3  tal">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="My Dominion Profile?"
                color="black"
                size="medium"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb3  taj">
              <Copy
                /* Options */
                text={`
                  Your Dominion Profile will allow you to keep on top of
                  everything related to your Subscription, including access to
                  Dominion content. We'll also send you Dominion updates via
                  email, just to keep you in the loop.
                `}
                color="black"
                size="large"
                truncate={null}
              />
            </div>

            <div className="pb4  taj">
              <Copy
                /* Options */
                text={`
                  If you have any questions at all, please don't hesitate to
                  contact the team at info@rendahmag.com.
                `}
                color="black"
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
