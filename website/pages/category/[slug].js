
import { Heading, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getSiteConfig, getCategory } from '~/lib/sanity/requests';

export default function Category({ siteConfig, category }) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: category.title,
          description: category.description,
          image: null,
        }}
        preview={null}
      >
        <div className="pt6">
          <Container>
            {category.articles.length > 0 && (
              <section className="pb5  pb6-md">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text={`${category.title}.`}
                    color="black"
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {category.articles.map((post, i) => (
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
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const category = await getCategory(params.slug, [1, 100]);

  return {
    props: {
      siteConfig,
      category,
    },
  };
}
