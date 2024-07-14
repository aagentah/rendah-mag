import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getSiteConfig, getPostWithSearch } from '~/lib/sanity/requests';

export default function Post({ siteConfig, allPosts, params }) {
  return (
    <Layout
      navOffset="top"
      navOnWhite
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Search',
        description: null,
        image: null,
      }}
      preview={null}
    >
      <Container>
        <div className="pl3 pb3">
          <Heading
            /* Options */
            htmlEntity="h2"
            text="Search"
            color="rendah-red"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        {allPosts.length === 0 && (
          <section className="pl3  pb3">
            <p className="t-primary  f5  lh-title  grey  tal  pb4">
              No Results for &quot;
              {params.slug}
              &quot;
            </p>
          </section>
        )}

        {allPosts.length > 0 && (
          <section className="pl3  pb3">
            <p className="t-primary  f5  lh-title  grey  tal  pb4">
              Results for &quot;
              {params.slug}
              &quot;
            </p>
          </section>
        )}

        {allPosts.length > 0 && (
          <section className="pb6">
            <div className="flex  flex-wrap">
              {allPosts.map((post, i) => (
                <div key={post.slug} className="col-24  col-6-md">
                  <div className="replaceph3pv2">
                    <CardBlog i={i} post={post} />
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

export async function getServerSideProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const allPosts = await getPostWithSearch(params.slug);

  return {
    props: {
      siteConfig,
      preview,
      allPosts,
      params,
    },
  };
}
