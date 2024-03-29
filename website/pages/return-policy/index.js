import Heading from '~/components/elements/heading';
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
          title: 'Return Policy',
          description: null,
          image: null
        }}
        preview={null}
      >
        <Container>
          <div className="pb4  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Privacy Policy"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="rich-text  measure-wide  mla  mra  pb5">
            Return policy go here.
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig }
  };
}
