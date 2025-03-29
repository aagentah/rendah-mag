import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
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
          title: '404',
          description: 'Page not found.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="py-8">
            <div className="pb-4">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="404"
                color="neutral-300"
                size="large"
                truncate={0}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="">
              <Copy
                /* Options */
                text="Page not found."
                color="neutral-400"
                size="medium"
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
