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
        navOnWhite
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
        <div className="pt6">
          <Container>
            {division.posts.length > 0 && (
              <section className="pb5  pb6-md">
                <div className="pl3 pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text={`${division.title}`}
                    color="rendah-red"
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {division.posts.map((post, i) => (
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
  const division = await getDivision(params.slug, [1, 100]);
  console.log('division', division);

  return {
    props: {
      siteConfig,
      division,
    },
  };
}
