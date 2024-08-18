import Router, { useRouter } from 'next/router';

import Heading from '~/components/elements/heading';
import Copy from '~/components/elements/copy';
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import {
  getSiteConfig,
  getTeamMemberAndPosts,
  getTeamMembers,
  imageBuilder,
} from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';

export default function Post({ siteConfig, member }) {
  const router = useRouter();
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;

  if (!router.isFallback && !member?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && member?.slug) {
    return (
      <Layout
        navOffset="top"
        navOnWhite
        hasNav
        hasFooter
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
            <div className="col-24  col-8-md  pb4  pb3-md">
              <Image
                /* Options */
                src={imageBuilder
                  .image(member.image)
                  .width(300 * scale)
                  .height(300 * scale)
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
                customClass={null}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="measure-wide  ph3-md">
              <div className="dib  ph2  pb3">
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
              {member?.alias && (
                <div className="dib">
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
              )}

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
              <div className="db  ph2  pb3">
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
            <section className="pb5  pb6-md">
              <div className="pl3  pb4">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text={`Latest from ${member.name}`}
                  color="rendah-red"
                  size="medium"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {member?.posts.map((post, i) => (
                  <div key={post.slug} className="col-24  col-6-md">
                    <div className="ph3 pv2">
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
  const member = await getTeamMemberAndPosts(params.slug);

  // if (!member?.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 10,
  //   };
  // }

  return {
    props: {
      siteConfig,
      member,
    },
    revalidate: 10,
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
    fallback: 'blocking',
  };
}
