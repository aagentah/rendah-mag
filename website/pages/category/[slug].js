import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getSiteConfig, getCategory } from '~/lib/sanity/requests';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Category({ siteConfig, category, queryParamValue }) {
  const buttonIcon = <IconArrowRight color="white" size={30} />;

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
            {category.posts.length > 0 && (
              <section className="pb5  pb6-md">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text={`${category.title} ${
                      queryParamValue
                        ? ` [${queryParamValue.toUpperCase()}]`
                        : ''
                    }`}
                    color="black"
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {category.posts.map((post, i) => (
                    <div key={post.slug} className="col-24  col-6-md">
                      <div className="replaceph3pv2">
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

export async function getServerSideProps(context) {
  const { req, params, query, preview = false } = context;
  const queryParamValue = query.division || null;

  const siteConfig = await getSiteConfig();
  const category = await getCategory(params.slug, [1, 100], queryParamValue);

  return {
    props: {
      siteConfig,
      category,
      queryParamValue,
    },
  };
}
