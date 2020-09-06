import { Heading, Copy } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Error404({ siteConfig }) {
  return (
    <>
      <Layout
        meta={{
          siteConfig,
          title: '404',
          description: 'Page not found.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb3  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="404"
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
              text="Page not found."
              color="black"
              size="medium"
              truncate={2}
            />
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
