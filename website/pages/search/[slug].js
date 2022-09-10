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
        image: null
      }}
      preview={null}
    >
      <Container>
        <div className="pt4  pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Search"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        {allPosts.length === 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - No Results for &quot;
              {params.slug}
              &quot;
            </h2>
          </section>
        )}

        {allPosts.length > 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - Results for &quot;
              {params.slug}
              &quot;
            </h2>

            <div className="flex  flex-wrap">
              {allPosts.map((post, i) => (
                <div key={post.slug} className="col-24  col-6-md">
                  <div className="pa3">
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
      params
    }
  };
}
