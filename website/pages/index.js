// import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// import Observer from '@researchgate/react-intersection-observer';
import Link from 'next/link';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';

import Layout from '~/components/layout';
import Hero from '~/components/hero/home';
import SubscriptionBanner from '~/components/subscription-banner';
import LatestPrint from '~/components/latest-print';
import Container from '~/components/layout/container';
import Map from '~/components/map';

import { getHomePage, getFeatured } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const Modal = dynamic(() => import('~/components/modal'));
const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));
const Blueprints = dynamic(() => import('~/components/blueprints'));
const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);
const CardBlog = dynamic(() => import('~/components/card/blog'));
const Timeline = dynamic(() => import('~/components/timeline'));

export default function Home() {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const [homePage, setHomePage] = useState(null);
  const [music, setMusic] = useState(null);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const musicLength = app.deviceSize === 'md' ? 6 : 12;

  useEffect(() => {
    const action = async () => {
      const homePageData = await getHomePage();
      setHomePage(homePageData);
      const musicRes = await getFeatured([1, app.deviceSize === 'md' ? 6 : 12]);
      setMusic(musicRes);
    };
    action();
  }, []);

  const handleIntersect = (event) => {
    if (
      event.isIntersecting &&
      !user &&
      !hasShownModal &&
      !Cookies.get('rndh-newsletter-set')
    ) {
      setHasShownModal(true);
      setModalActive(true);
      Cookies.set('rndh-newsletter-set', true, { expires: 5 });
    }
  };

  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  // Use Parallax if not on medium device; otherwise just a div.
  // const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  const categories = [
    { title: 'Music', slug: 'music' },
    { title: 'Art', slug: 'art' },
    { title: 'Technology', slug: 'technology' },
  ];

  return (
    <Layout
      navOffset=""
      navOnWhite={false}
      hasNav
      hasFooter
      meta={{
        siteConfig: null,
        title: 'Home',
        description: null,
        image: null,
      }}
      preview={null}
    >
      {/* Hero Section */}
      {/* <div className="container grid grid-cols-2">
        <div className="">
          <Hero
            imageObject={homePage?.imageObject}
            title={homePage?.heroTitle || 'Loading...'}
            description={homePage?.heroDescription || 'Loading...'}
            heroButtonText={homePage?.heroLabel || 'Loading...'}
            link={null}
            marginTop={0}
            marginBottom={0}
            modifier="home"
            skeleton={!homePage}
          />
        </div>
      </div> */}

      {/* Subscription Banner */}
      <SubscriptionBanner showDominionButton={false} />

      {/* Optional Parallax Graphic */}
      {/* <div className="absolute top-0 left-0 hidden md:block -ml-6">
        <ParallaxDiv translateY={[750, 880]}>
          <img
            className="w-20 opacity-50"
            src="/images/vector-red.png"
            alt="Vector"
          />
        </ParallaxDiv>
      </div> */}

      <div className="container">
        <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
      </div>

      {/* Latest Print Section */}
      <LazyLoad once offset={800} height={800}>
        <LatestPrint showDominionButton={true} />
      </LazyLoad>

      <div className="container">
        <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
      </div>

      {/* <div className="container">
        <div className="mb-12 flex justify-between items-center">
          <h3 className="text-neutral-400 mb-2">Blueprints</h3>
          <p className="text-neutral-500 text-sm">Member-only resource</p>
        </div>
      </div>

      <Blueprints />

      <div className="container">
        <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
      </div> */}

      {/* Recent Features Section */}
      <div className="container my-12 md:my-16">
        <h2 className="text-neutral-300 mb-12">Recent features</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 mb-12">
          {[...Array(musicLength)].map((_, i) => (
            <div key={i}>
              <CardBlog i={i} post={music && music[i]} columnCount={4} />
            </div>
          ))}
        </div>

        <div className="flex justify-start">
          <h3 className="text-neutral-300">Explore more</h3>
        </div>

        <div className="flex space-x-3 mt-3 text-sm">
          {categories.map((category) => (
            <div className="underline text-neutral-400" key={category.slug}>
              <Link href={`/division/${category.slug}`} legacyBehavior>
                <a>/{category.slug}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Intersection Observer to trigger subscribe modal */}
      {/* <Observer {...observer}>
        <div />
      </Observer> */}

      <div className="container">
        <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
      </div>

      <div className="container my-12 md:my-16">
        <Timeline />
      </div>

      <div className="container">
        <hr className="my-12 md:my-16 border border-neutral-700 opacity-25 md:opacity-50" />
      </div>

      <div className="container my-12 md:my-16">
        <Map />
      </div>

      {/* Subscribe Modal */}
      <Modal size="small" active={modalActive}>
        <div className="mb-2 pb-2">
          <h3 className="text-neutral-300">Join our Newsletter?</h3>
        </div>
        <div className="mb-2 pb-2">
          <p className="text-neutral-400">
            We usually only send a few emails each month, and keep the content
            relevant as ever.
          </p>
        </div>
        <div className="mb-2 pb-3">
          <SubscribeForm type="modal" onSuccess={() => setModalActive(false)} />
        </div>
        <div className="flex justify-center items-center">
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
            onClick={() => setModalActive(false)}
            withLinkProps={null}
          />
        </div>
      </Modal>
    </Layout>
  );
}
