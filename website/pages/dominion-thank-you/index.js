import Link from 'next/link';
import { Heading, Copy, Button } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Error404({ siteConfig }) {
  return (
    <>
      <Layout
        navOffset="center"
        navOnWhite={true}
        hasNav={true}
        hasFooter={true}
        meta={{
          siteConfig,
          title: 'Thank you',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="measure-wide  mla  mra  pv3  pv0-md  ph3  ph4-md">
            <div className="pb3  tac">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Welcome to the Dominion!"
                color="black"
                size="large"
                truncate={0}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb3  tac">
              <Copy
                /* Options */
                text={`
                  We can't thank you enough, and we're happy to have you on this
                  journey with us. You should be recieving an email with
                  instructions on what to do next to access the Dominion.
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
