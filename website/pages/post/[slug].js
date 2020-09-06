import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import Author from '~/components/article/author';

import Date from '~/components/date';
import CardBlog from '~/components/card/blog';
import useWindowDimensions from '~/functions/useWindowDimensions';

import {
  getSiteConfig,
  imageBuilder,
  getPostAndMore,
} from '~/lib/sanity/requests';

export default function Post({ siteConfig, post, morePosts, preview }) {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    if (!router.isFallback && !post?.slug) Router.push('/404');
  }, [router.isFallback, post.slug]);

  if (router.isFallback) return <p>Loading...</p>;

  if (!router.isFallback && post?.slug) {
    console.log('post', post);

    const heroImage = (
      <Image
        /* Options */
        src={imageBuilder.image(post.coverImage).height(1000).width(2000).url()}
        placeholder={imageBuilder
          .image(post.coverImage)
          .height(50)
          .width(108)
          .url()}
        alt="This is the alt text."
        figcaption={null}
        height={700}
        onClick={null}
        /* Children */
        withLinkProps={null}
      />
    );

    return (
      <Layout
        meta={{
          siteConfig,
          title: post.title,
          description: post.excerpt,
          image: post.coverImage,
        }}
        preview={preview}
      >
        <Parallax className="z1  nt4" y={['-50px', '50px']} tagOuter="figure">
          <div className="hero--darken-top">
            <Hero
              /* Options */
              height={700}
              /* Children */
              image={heroImage}
              title={null}
              description={null}
              button={null}
            />
          </div>
        </Parallax>
        <Container>
          <article className="pt5  mt3  ph3  ph4-md">
            <section className="measure-wide  mla  mra">
              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={post.title}
                  color="black"
                  size="large"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  almost-black  lh-copy  pb4">
                {post.author.name} | <Date dateString={post.publishedAt} />
              </p>

              <div className="post__body  pb4">
                <Sections body={post.body} />
              </div>

              <div className="post__body  pb4">
                <hr />
              </div>

              <Author author={post.author} />
            </section>
          </article>

          {morePosts.length > 0 && (
            <section className="pb3">
              <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                - More Posts
              </h2>

              <div className="flex  flex-wrap">
                {morePosts.map((p, i) => (
                  <div key={p.slug} className="col-24  col-6-md">
                    <div className="pa3">
                      <CardBlog i={i} post={p} />
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

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getPostAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data.post || null,
      morePosts: data.morePosts || null,
    },
  };
}
