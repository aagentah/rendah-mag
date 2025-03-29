import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getSiteConfig, getDivision } from '~/lib/sanity/requests';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Division({ siteConfig, division }) {
  const buttonIcon = <IconArrowRight color="white" size={30} />;
  return (
    <>
      <Layout
        navOffset={null}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: division.title,
          description: division.description,
          image: null,
        }}
        preview={null}
      >
        <div className="py-12">
          <Container>
            {division.posts.length > 0 && (
              <section>
                <div className="pb-8">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text={`${division.title}`}
                    color="rendah-red"
                    size="large"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 mb-12">
                  {division.posts.map((post, i) => (
                    <div key={i}>
                      <CardBlog i={i} post={post} columnCount={4} />
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
  const division = await getDivision(params.slug, [1, 100], null, [
    'premieres',
  ]);
  console.log('division', division);

  return {
    props: {
      siteConfig,
      division,
    },
  };
}
