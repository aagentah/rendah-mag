import { Heading, Copy, Label, Image } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import getSiteConfigCookies from '~/lib/get-site-config-cookies';
import {
  getSiteConfig,
  getTeamMemberAndPosts,
  imageBuilder,
} from '~/lib/sanity/requests';

export default function Post({ siteConfig, teamMember }) {
  const { posts } = teamMember;

  return (
    <Layout
      navOffset="top"
      navOnWhite
      meta={{
        siteConfig,
        title: 'Search',
        description: 'This is the Search page.',
        image: null,
      }}
      preview={null}
    >
      <Container>
        <div className="flex  flex-wrap  pt4  pb5">
          <div className="col-24  col-8-md  ph2  pb4  pb3-md">
            <Image
              /* Options */
              src={imageBuilder
                .image(teamMember.image)
                .height(250)
                .width(250)
                .auto('format')
                .fit('clip')
                .url()}
              placeholder={imageBuilder
                .image(teamMember.image)
                .height(25)
                .width(25)
                .auto('format')
                .fit('clip')
                .blur('20')
                .url()}
              alt={teamMember.title}
              figcaption={null}
              height={250}
              width={null}
              customClass="shadow2"
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="measure-wide  ph3-md">
            <div className="db  ph2  pb2">
              <Heading
                /* Options */
                htmlEntity="h1"
                text={teamMember.name}
                color="black"
                size="small"
                truncate={null}
                reveal={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="db  ph2  pb3">
              <Label
                /* Options */
                customClass="ph2"
                text={teamMember.alias}
                color="white"
                backgroundColor="black"
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="db  ph2  pb3  taj">
              <Copy
                /* Options */
                text={teamMember.description}
                color="black"
                size="medium"
                truncate={null}
              />
            </div>
          </div>
        </div>
        {posts.length > 0 && (
          <section className="pb5">
            <div className="pb4">
              <Heading
                /* Options */
                htmlEntity="h2"
                text={`Latest from ${teamMember.name}.`}
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

export async function getServerSideProps({ req, params, preview = false }) {
  const cookies = req?.headers?.cookie;
  const siteConfig = getSiteConfigCookies(cookies) || (await getSiteConfig());
  const teamMember = await getTeamMemberAndPosts(params.slug);

  return {
    props: {
      siteConfig,
      teamMember,
    },
  };
}
