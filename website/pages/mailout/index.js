import { useRouter } from 'next/router';
import 'intersection-observer';

import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import SubscribeForm from '~/components/subscribe-form';

import { useApp } from '~/context-provider/app';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Mailout({ siteConfig, preview }) {
  const app = useApp();
  const router = useRouter();

  if (!router.isFallback) {
    return (
      <Layout
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Mailout',
          description: null,
          image: null,
        }}
        preview={preview}
      >
        <Container>
          <div className="max-w-2xl py-12">
            <div className="pb-2 mb-2">
              <Heading
                htmlEntity="h3"
                text="Join our mailout"
                color="neutral-300"
                size="medium"
                truncate={0}
                onClick={null}
                withLinkProps={null}
              />
            </div>
            <div className="pb-4">
              <p className="text-neutral-400">
                We usually only send a few emails each month, and keep the
                content relevant as ever.
              </p>
            </div>
            <div className="pb-3 mb-2">
              <SubscribeForm type="mailout" />
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return false;
}

export async function getServerSideProps({ req, preview = false }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
      preview,
    },
  };
}
