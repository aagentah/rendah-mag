import Router, { useRouter } from 'next/router';

import { Heading, Copy, Label, Image } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import {
  getSiteConfig,
  getTagAndPosts,
  getTags,
  imageBuilder,
} from '~/lib/sanity/requests';

export default function Post({ siteConfig, tag }) {
  const router = useRouter();

  if (!router.isFallback && !tag?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && tag?.slug) {
    return (
      <Layout
        navOffset="top"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: tag.name,
        }}
        preview={null}
      >
        <Container>
          {tag?.posts.length > 0 && (
            <section className="pb5  pb6-md">
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text={`Latest #${tag.name}.`}
                  color="black"
                  size="medium"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {tag?.posts.map((post, i) => (
                  <div key={post.slug} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardBlog i={i} post={post} columnCount={4} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </Container>
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const tag = await getTagAndPosts(params.slug);

  // if (!tag?.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 1,
  //   };
  // }

  return {
    props: {
      siteConfig,
      tag,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const tags = await getTags();

  return {
    paths:
      tags.map((tag) => ({
        params: {
          slug: tag.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
