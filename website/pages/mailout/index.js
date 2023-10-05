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
        navOffset="center"
        navOnWhite
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
          <div className="measure-wide  mla  mra  ph3  ph0-md">
            <div className="pb2  mb2">
              <Heading
                /* Options */
                htmlEntity="h3"
                text="Join our mailout"
                color="black"
                size="medium"
                truncate={0}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="pb2">
              <Copy
                /* Options */
                text="We usually only send a few emails each month, and keep the content relevant as ever."
                color="black"
                size="medium"
                truncate={null}
              />
            </div>
            <div className="pb3  mb2">
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

// export async function getStaticProps({ req, params, preview = false }) {
//   const siteConfig = await getSiteConfig();
//   const data = await getSmartLink(params.slug, preview);
//
//   return {
//     props: {
//       siteConfig,
//       post: data || null,
//       preview,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const data = await getAllPostsTotal();
//
//   return {
//     paths:
//       data.map((article) => ({
//         params: {
//           slug: article.slug,
//         },
//       })) || [],
//     fallback: true,
//   };
// }
