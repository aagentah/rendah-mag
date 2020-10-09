import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import HeroPost from '~/components/hero/post';

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

import getSiteConfigCookies from '~/lib/get-site-config-cookies';
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

  const handleIntersect = (event) => {
    if (event.isIntersecting && !user && !hasShownModal) {
      setHasShownModal(true);
      setModalActive(true);
    }
  };

  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  useEffect(() => {
    if (!router.isFallback && !post?.slug) Router.push('/404');
  }, [router.isFallback, post.slug]);

  if (router.isFallback) return <p>Loading...</p>;

  if (!router.isFallback && post?.slug) {
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
          <div className="pb2  mb2">
            <Heading
              /* Options */
              htmlEntity="h3"
              text="You made it to the bottom"
              color="black"
              size="medium"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb2">
            <Copy
              /* Options */
              text="Can we add you to our Mailing List? We usually only send a few emails each month, and keep the content relevant as ever."
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb3  mb2">
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

        <HeroPost post={post} />

        <Container>
          <article className="pt5  pt6-md  pb4  ph3  ph4-md">
            <section className="measure-wide  mla  mra">
              <div className="pb3">
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

              <p className="t-secondary  f6  almost-black  lh-copy  pb4">
                <Link href={`/team/${post.author.slug.current}`}>
                  <span className="cp  black  fw7">{post.author.name}</span>
                </Link>{' '}
                | <Date dateString={post.publishedAt} />
              </p>

              <div className="rich-text">
                <Sections body={post.body} />
              </div>

              <Observer {...observer}>
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

export async function getServerSideProps({ req, params, preview = false }) {
  const cookies = req?.headers?.cookie;
  const siteConfig = getSiteConfigCookies(cookies) || (await getSiteConfig());
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
