import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Heading, Copy, Button } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function DominionAlreadyMember({ siteConfig }) {
  const router = useRouter();
  const prefillEmail = router.query?.prefillEmail || null;

  return (
    <>
      <Layout
        navOffset="top"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Already in Dominon',
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
                text="You are already in the Dominion."
                color="black"
                size="large"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb4  taj">
              <Copy
                /* Options */
                text={`
                  The email you entered
                  ${prefillEmail ? `"${prefillEmail}"` : ''}
                  already has an active subscription.
                  If you want to start a new subscription, you'll have to cancel
                  your current one. If you have any questions at all, please
                  don't hesitate to contact the team at info@rendahmag.com.
                `}
                color="black"
                size="large"
                truncate={null}
              />
            </div>

            <div className="flex  justify-center  pb5">
              <Button
                /* Options */
                type="primary"
                size="medium"
                text="Log in"
                color="black"
                fluid={false}
                icon={null}
                iconFloat={null}
                invert={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/login',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: {
                    scroll: false,
                  },
                }}
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
