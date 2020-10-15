import Router, { useRouter } from 'next/router';

import { Heading, Copy, Label, Image } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';


import {
  getSiteConfig,
  getTeamMemberAndPosts,
  getTeamMembers,
  imageBuilder,
} from '~/lib/sanity/requests';

export default function Post({ siteConfig, member }) {
  const router = useRouter();

  if (!router.isFallback && !member?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && member?.slug) {
    return (
      <Layout
        navOffset="top"
        navOnWhite
        meta={{
          siteConfig,
          title: member.name,
          description: member.description,
          image: member.image,
        }}
        preview={null}
      >
        <Container>
          <div className="flex  flex-wrap  pt4  pb5">
            <div className="col-24  col-8-md  ph2  pb4  pb3-md">
              <Image
                /* Options */
                src={imageBuilder
                  .image(member.image)
                  .height(250)
                  .width(250)
                  .auto('format')
                  .fit('clip')
                  .url()}
                placeholder={imageBuilder
                  .image(member.image)
                  .height(25)
                  .width(25)
                  .auto('format')
                  .fit('clip')
                  .blur('20')
                  .url()}
                alt={member.name}
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
              <div className="dib  ph2  pb2">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={member.name}
                  color="black"
                  size="small"
                  truncate={null}
                  
                  /* Children */
                  withLinkProps={null}
                />
              </div>
              <div className="dib  pb3">
                <Label
                  /* Options */
                  customClass={null}
                  text={`(${member.alias})`}
                  color="black"
                  backgroundColor="white"
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
              <div className="db  ph2  pb3">
                <Label
                  /* Options */
                  customClass="ph2"
                  text={member.role}
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
                  text={member.description}
                  color="black"
                  size="medium"
                  truncate={null}
                />
              </div>
            </div>
          </div>

          {member?.posts.length > 0 && (
            <section className="pb5">
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text={`Latest from ${member.name}.`}
                  color="black"
                  size="medium"
                  truncate={null}
                  
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {member?.posts.map((post, i) => (
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
  const cookies = req?.headers?.cookie;
  const siteConfig = await getSiteConfig();
  const member = await getTeamMemberAndPosts(params.slug);

  return {
    props: {
      siteConfig,
      member,
    },
  };
}

export async function getStaticPaths() {
  const team = await getTeamMembers();

  return {
    paths:
      team.map((member) => ({
        params: {
          slug: member.slug,
        },
      })) || [],
    fallback: true,
  };
}
