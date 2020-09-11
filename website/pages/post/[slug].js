import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';
import SubscribeForm from '~/components/subscribe-form';

import Date from '~/components/date';
import CardBlog from '~/components/card/blog';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
  imageBuilder,
  getPostAndMore,
} from '~/lib/sanity/requests';

export default function Post({ siteConfig, post, morePosts, preview }) {
  const router = useRouter();
  const [user] = useUser();
  const { height, width } = useWindowDimensions();
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const handleIntersection = (event) => {
    if (event.isIntersecting && !user && !hasShownModal) {
      setHasShownModal(true);
      setModalActive(true);
    }
  };

  const options = {
    onChange: handleIntersection,
    rootMargin: '0% 0% -30% 0%',
  };

  useEffect(() => {
    if (!router.isFallback && !post?.slug) Router.push('/404');
  }, [router.isFallback, post.slug]);

  if (router.isFallback) return <p>Loading...</p>;

  if (!router.isFallback && post?.slug) {
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
        width={null}
        customClass={null}
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
        <Modal
          /* Options */
          size="small"
          active={modalActive}
        >
          <div className="pb2">
            <Heading
              /* Options */
              htmlEntity="h3"
              text="Thanks for reading ❤️"
              color="black"
              size="medium"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb3">
            <Copy
              /* Options */
              text="Can we add you to our Newsletter? We strive to only send relevant content."
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb4">
            <SubscribeForm onSuccess={() => setModalActive(false)} />
          </div>
          <div className="flex  flex-wrap  pb2">
            <div className="col-24  flex  justify-center  align-center">
              <Button
                /* Options */
                type="secondary"
                size="medium"
                text="No thanks"
                color="black"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                onClick={() => {
                  setModalActive(false);
                }}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

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

        <Container>
          <article className="pt5  pb4  mt3  ph3  ph4-md">
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

              <div className="post__body">
                <Sections body={post.body} />
              </div>

              <Observer {...options}>
                <div className="pb4  mb2">
                  <SocialLinks article={post} />
                </div>
              </Observer>
            </section>

            <section className="measure-wide  mla  mra">
              <div className="pb4">
                <Author author={post.author} />
              </div>
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
