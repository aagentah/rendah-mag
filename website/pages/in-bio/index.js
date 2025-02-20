import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import 'intersection-observer';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useApp } from '~/context-provider/app';

import { getSiteConfig, getAllPosts } from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));

const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));

const IconHeart = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconHeart)
);

export default function LinkInBio({ siteConfig, posts, preview }) {
  const app = useApp();
  const router = useRouter();
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const renderItemType = (post) => {
    return (
      <div className="flex  flex-wrap  mb3  cp">
        <a
          href={`/article/${post?.slug}`}
          rel="noopener noreferrer"
          target="_blank"
          className="w-100  w-70-md  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-white  black  shadow2  link"
        >
          <p className="t-secondary  f5  tac  lh-copy">{post?.title}</p>
        </a>
      </div>
    );
  };

  // if (!router.isFallback && !post?.slug) {
  //   Router.push('/404');
  // }

  if (!router.isFallback) {
    return (
      <Layout
        navOffset="center"
        navOnWhite
        hasNav={false}
        hasFooter={false}
        meta={{
          siteConfig,
          title: 'Link In Bio',
          description: null,
          image: null,
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
              text="Join our mailout"
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
              text="We usually only send a few emails each month, and keep the content relevant as ever."
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
                color="neutral-400"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={() => {
                  setModalActive(false);
                }}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

        <Container>
          <div className="measure-wide  mla  mra  ph4  ph5-md  pv5  black  br3  h-100">
            <div className="flex  justify-center  cp  mb4">
              <Link href="/" legacyBehavior>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 1080 1080"
                >
                  <g fill="#000000">
                    <path d="M358 12.7c-158.6.8-288.7 1.6-288.9 1.9-.2.2 7 15.6 16.1 34.1l16.6 33.8 94.8.8c52.2.5 95 1 95.2 1.1.1.2-20.3 34.6-45.3 76.6-25.1 42-45.4 76.7-45.3 77.1.2.4 13.4 22.9 29.3 49.8l29 49 177.1.3 177 .3-94.8 153.8C466.7 576 424 645.6 424 646.1s11.6 19.9 25.8 43l25.7 42.2 86.8-.6c47.7-.3 86.7-.4 86.7-.2s-19.2 31.7-42.7 70.1c-23.4 38.5-42.8 70.6-43 71.5-.3.9 7.8 20.6 17.9 43.8l18.3 42.1h56l56-.1 42-71.9c23.1-39.6 42.2-72 42.5-72 .3 0 19.1 32.4 41.9 72l41.3 72h48.9c26.9 0 48.9-.4 48.9-.8 0-.5-40-70.5-89-155.6-48.9-85.1-89-155-89-155.5 0-.4 40.1-70 89-154.7 49-84.6 88.9-154.7 88.8-155.7-.2-1-40.3-74.4-89.3-163.2L798.5 11l-76 .2c-41.8 0-205.8.7-364.5 1.5z" />
                    <path d="M69.2 117.5c.4 2 83.2 157.5 83.8 157.5.6-.1 83.3-155.7 83.8-157.7.3-1.1-14.9-1.3-83.8-1.3-74 0-84.1.2-83.8 1.5zM410.4 758.7c.8 1.9 81.8 150 84.6 154.7l1.8 3 52.6-79.3c28.9-43.5 52.6-79.4 52.6-79.7 0-.2-43.2-.4-96.1-.4-90.4 0-96.1.1-95.5 1.7zM335.2 849.1c.6 1.7 48.2 75.8 48.8 75.8.4 0 39.8-73.3 40.8-76 .2-.5-19.4-.9-44.8-.9-32.3 0-45.1.3-44.8 1.1zM741 969c-31.9 53.4-58.4 97.8-58.7 98.6-.4 1.2 14.5 1.4 113.7 1.4 93.7 0 114.1-.2 113.8-1.3-.3-1.5-108.6-193.7-109.8-195-.5-.5-27 42.8-59 96.3z" />
                  </g>
                </svg>
              </Link>
            </div>

            <div className="flex  justify-center  pb3">
              <Heading
                /* Options */
                htmlEntity="h3"
                text="Featured"
                color="black"
                size="small"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="flex  flex-wrap  justify-center">
              <div className="col-24">
                <div className="flex  flex-wrap  mb3  cp">
                  <a
                    href="https://rendahmag.com/dominion"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-100  w-70-md  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-white  black  shadow2  link"
                  >
                    <img
                      className="linkInBio__dominion-logo"
                      src="/images/dominion-logo.png"
                    />
                  </a>
                </div>
              </div>

              <div className="col-24">
                <div className="flex  flex-wrap  mb3  cp">
                  <a
                    href="/store"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-100  w-70-md  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-white  black  shadow2  link"
                  >
                    <p className="t-secondary  f5  tac  lh-copy">Store</p>
                  </a>
                </div>
              </div>

              <div className="col-24">
                <div className="flex  flex-wrap  mb3  cp">
                  <a
                    href="https://soundcloud.com/rendahmag"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-100  w-70-md  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-white  black  shadow2  link"
                  >
                    <p className="t-secondary  f5  tac  lh-copy">Soundcloud</p>
                  </a>
                </div>
              </div>

              {/* <div className="col-24">
                <div className="flex  flex-wrap  mb3  cp">
                  <a
                    href="/cyphers"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-100  w-70-md  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-white  black  shadow2  link"
                  >
                    <p className="t-secondary  f5  tac  lh-copy">Cyphers</p>
                  </a>
                </div>
              </div>

              <div className="col-24">
                <div className="flex  flex-wrap  mb3  cp">
                  <a
                    href="/gallery"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-100  w-70-md  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-white  black  shadow2  link"
                  >
                    <p className="t-secondary  f5  tac  lh-copy">Gallery</p>
                  </a>
                </div>
              </div> */}

              <div className="flex  justify-center  pv3">
                <Heading
                  /* Options */
                  htmlEntity="h3"
                  text="Latest Posts"
                  color="black"
                  size="small"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              {posts?.length &&
                posts.map((post, i) => (
                  <div key={i._key} className="col-24">
                    {renderItemType(post)}
                  </div>
                ))}
            </div>

            <div className="flex  justify-center  pt3">
              <p
                className="t-secondary  f5  black  lh-copy  cp  underline"
                onClick={() => {
                  setModalActive(true);
                }}
              >
                Join our mailout
                <span className="dib  pl2">
                  <IconHeart color="black" size={12} />
                </span>
              </p>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return false;
}

export async function getServerSideProps({ req, preview = false }) {
  const siteConfig = await getSiteConfig();

  const posts = await getAllPosts(preview);

  return {
    props: {
      siteConfig,
      posts,
      preview,
    },
  };
}

// export async function getStaticProps({ req, params, preview = false }) {
//   const siteConfig = await getSiteConfig();
//   const data = await getSmartLink(params.slug, preview);
//
//   return {
//     props: {
//       siteConfig,
//       post: data || null,
//       preview,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const data = await getAllPostsTotal();
//
//   return {
//     paths:
//       data.map((article) => ({
//         params: {
//           slug: article.slug,
//         },
//       })) || [],
//     fallback: true,
//   };
// }
