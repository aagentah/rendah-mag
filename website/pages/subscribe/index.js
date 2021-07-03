import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import Cookies from 'js-cookie';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';
import HeroPost from '~/components/hero/post';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';
import SubscribeForm from '~/components/subscribe-form';

import Date from '~/components/date';
import CardBlog from '~/components/card/blog';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Subscribe({ siteConfig, preview }) {
  const app = useApp();
  const router = useRouter();

  if (!router.isFallback) {
    return (
      <Layout
        navOffset="center"
        navOnWhite
        hasNav={true}
        hasFooter={true}
        meta={{
          siteConfig,
          title: 'Subscribe',
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
              <SubscribeForm />
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
