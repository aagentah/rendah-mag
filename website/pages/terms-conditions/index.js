import { Heading, Copy } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import getSiteConfigCookies from '~/lib/get-site-config-cookies';
import { getSiteConfig } from '~/lib/sanity/requests';

export default function Error404({ siteConfig }) {
  return (
    <>
      <Layout
        navOffset="top"
        navOnWhite={true}
        meta={{
          siteConfig,
          title: 'Terms & Conditions',
          description: '',
          image: null,
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
          <div className="measure-wide  mla  mra  pb3  taj">tc's go here.</div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const cookies = req?.headers?.cookie;
  const siteConfig = getSiteConfigCookies(cookies) || (await getSiteConfig());

  return {
    props: { siteConfig },
  };
}
