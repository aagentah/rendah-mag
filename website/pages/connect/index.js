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
import ImageNew from '~/components/elements/image-new';
import SubscriptionBanner from '~/components/subscription-banner';

import { useApp } from '~/context-provider/app';

import { getSiteConfig, getAllPosts } from '~/lib/sanity/requests';

const Modal = dynamic(() => import('~/components/modal'));

const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));

const IconHeart = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconHeart)
);

const Timeline = dynamic(() => import('~/components/timeline'));

export default function Connect({ siteConfig, posts, preview }) {
  const app = useApp();
  const router = useRouter();
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const renderItemType = (i, post) => {
    return (
      <Link key={i} href={`/article/${post.slug}`}>
        <div className="flex items-center  text-neutral-300">
          <div className="w-[50px] h-[50px] flex-shrink-0">
            <ImageNew
              imageObject={post?.imageObject}
              height={50}
              width={50}
              className="object-cover brightness-75 w-[50px] h-[50px]"
              type="blog"
            />
          </div>
          <p className="flex-1 ml-4">{post?.title}</p>
        </div>
      </Link>
    );
  };

  if (!router.isFallback) {
    return (
      <Layout
        navOnWhite
        hasNav={true}
        hasFooter={true}
        meta={{
          siteConfig,
          title: 'Link In Bio',
          description: null,
          image: null,
        }}
        preview={preview}
      >
        {/* <Modal size="small" active={modalActive}>
          <div className="pb-2 mb-2">
            <Heading
              htmlEntity="h3"
              text="Join our mailout"
              color="black"
              size="medium"
              truncate={0}
              onClick={null}
              withLinkProps={null}
            />
          </div>
          <div className="pb-2">
            <Copy
              text="We usually only send a few emails each month, and keep the content relevant as ever."
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb-3 mb-2">
            <SubscribeForm onSuccess={() => setModalActive(false)} />
          </div>
          <div className="flex flex-wrap pb-2">
            <div className="w-full flex justify-center items-center">
              <Button
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
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal> */}

        <SubscriptionBanner showDominionButton={true} />

        <div className="container">
          <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
        </div>

        <div className="container">
          <div className="py-4 mb-4">
            <Heading
              htmlEntity="h3"
              text="Quick Links"
              color="neutral-400"
              size="small"
              truncate={null}
              withLinkProps={null}
            />
          </div>

          <div className="w-full">
            <div className="flex flex-wrap mb-3 cursor-pointer">
              <Link href="/login" legacyBehavior>
                <div className=" text-neutral-300">
                  <p className="">Login</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap mb-3 cursor-pointer">
              <Link href="/store" legacyBehavior>
                <div className=" text-neutral-300">
                  <p className="">Store</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap mb-3 cursor-pointer">
              <Link href="https://soundcloud.com/rendahmag" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-neutral-300"
                >
                  <p className="">Soundcloud</p>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
        </div>

        <div className="container">
          <div className="py-4 mb-4">
            <Heading
              htmlEntity="h3"
              text="Latest Posts"
              color="neutral-400"
              size="small"
              truncate={null}
              withLinkProps={null}
            />
          </div>

          <div className="block w-full">
            <div className="grid gap-y-4">
              {posts?.length && posts.map((post, i) => renderItemType(i, post))}
            </div>
          </div>
          {/* 
          <div className="flex justify-center pt-3">
            <p
              className="text-neutral-300 text-base text-black  cursor-pointer underline"
              onClick={() => {
                setModalActive(true);
              }}
            >
              Join our mailout
              <span className="inline-block pl-2">
                <IconHeart color="text-neutral-300" size={12} />
              </span>
            </p>
          </div> */}
        </div>

        <div className="container my-12 md:my-16">
          <Timeline />
        </div>
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
