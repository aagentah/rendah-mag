import { Heading, Copy } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Error404({ siteConfig }) {
  return (
    <>
      <Layout
        navOffset="top"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Terms & Conditions',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pb4  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Terms & Conditions"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="measure-wide  mla  mra  pb3  taj">
            tc&apos;s go here.
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
