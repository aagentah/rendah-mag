import { Heading } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import CardBlog from '../../components/card/blog';

import {
  getSiteConfig,
  getTeamMemberAndPosts,
} from '../../lib/sanity/requests';

export default function Post({ siteConfig, teamMember }) {
  const posts = teamMember.posts;

  console.log('teamMember', teamMember);
  return (
    <Layout
      navOffset={'top'}
      navOnWhite={true}
      meta={{
        siteConfig,
        title: 'Search',
        description: 'This is the Search page.',
        image: null,
      }}
      preview={null}
    >
      <Container>
        <Heading
          /* Options */
          htmlEntity="h1"
          text={teamMember.name}
          color="black"
          size="medium"
          truncate={null}
          reveal={null}
          /* Children */
          withLinkProps={null}
        />

        {posts.length > 0 && (
          <section className="pb5">
            <div className="pb4">
              <Heading
                /* Options */
                htmlEntity="h2"
                text="Latest posts."
                color="black"
                size="medium"
                truncate={null}
                reveal={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="flex  flex-wrap">
              {posts.map((post, i) => (
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

export async function getServerSideProps({ params, preview = false }) {
  console.log('params', params);
  const siteConfig = await getSiteConfig();
  const teamMember = await getTeamMemberAndPosts(params.slug);

  return {
    props: {
      siteConfig,
      teamMember,
    },
  };
}
