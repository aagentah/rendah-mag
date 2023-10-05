import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Observer from '@researchgate/react-intersection-observer';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';

import 'intersection-observer';

import Layout from '~/components/layout';
import Hero from '~/components/hero/home';
import SubscriptionBanner from '~/components/subscription-banner';

import { getHomePage } from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const CardCreations = dynamic(() => import('~/components/card/creations'));
const RenderCards = dynamic(() => import('~/components/index/renderCards'));
const Modal = dynamic(() => import('~/components/modal'));
const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));
const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Home() {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  // const [featuredPosts, setFeaturedPosts] = useState(null);
  const [homePage, setHomePage] = useState(null);
  const [creations, setCreations] = useState(null);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [creationsLength, setCreationsLength] = useState(4);
  const [featuredPostsLength, setFeaturedPostsLength] = useState(3);

  useEffect(() => {
    const action = async () => {
      // const featuredPostsRes = await getFeaturedPosts();
      const homePage = await getHomePage();
      // const creationsRes = await getAllCreationsTotal();

      // setFeaturedPosts(featuredPostsRes);
      setHomePage(homePage);
      // setCreations(creationsRes);
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

  const buttonIcon = <IconArrowRight color="black" size={16} />;
  const buttonIconWhite = <IconArrowRight color="white" size={16} />;
  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;

  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  return (
    <>
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
        <div className="flex  flex-wrap  relative">
          <div className="col-24  hero--home__col-18">
            <Hero
              image={homePage?.heroImage}
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
        </div>

        {
          //    <ParallaxDiv speed={-3}>
          //    <div className="lines" />
          //  </ParallaxDiv>
        }
        <SubscriptionBanner />

        {
          //    <div className="pb5">
          //    <Container>
          //      <div className="bb  bc-rendah-red  pa2  ml3  dib  mb4">
          //        <Heading
          //          /* Options */
          //          htmlEntity="h2"
          //          text="Recent Featured"
          //          color="rendah-red"
          //          size="medium"
          //          truncate={null}
          //          /* Children */
          //          withLinkProps={null}
          //        />
          //      </div>
          //      <div className="flex  flex-wrap  justify-center  pt4  pt2-md">
          //        {[...Array(featuredPostsLength)].map((iteration, i) => (
          //          <div key={iteration} className="col-24  col-8-md">
          //            <div className="ph2  pb3">
          //              <CardBlog
          //                i={i}
          //                post={featuredPosts && featuredPosts[i]}
          //                columnCount={2}
          //              />
          //            </div>
          //          </div>
          //        ))}
          //      </div>
          //    </Container>
          //  </div>
        }

        <div className="absolute  top  left  nl6  dn  db-md">
          <ParallaxDiv translateY={[750, 880]}>
            <img className="w5  o-50" src="/images/vector-red.png" />
          </ParallaxDiv>
        </div>

        <LazyLoad once offset={800} height={800}>
          <RenderCards />
        </LazyLoad>

        <Observer {...observer}>
          <div className="" />
        </Observer>

        {/* <div className="creations  bg-black  relative">
<Container>
  <section className="pv5  creations  bg-black">
    <div className="flex  flex-wrap  pb4  ph3">
      <div className="col-12-md  flex  justify-start">
        <div className="bg-white  pa2  dib">
          <Heading
            htmlEntity="h2"
            text="Creations"
            color="black"
            size="small"
            truncate={null}
            withLinkProps={null}
          />
        </div>
      </div>
      <div className="col-12-md  flex  justify-end">
        <div className="pa2  dn  dib-md">
          <Heading
            htmlEntity="h2"
            text="(Exclusive to the Dominion Subscription)"
            color="white"
            size="small"
            truncate={null}
            withLinkProps={null}
          />
        </div>
        <div className="pa2  dib  dn-md">
          <Heading
            htmlEntity="h2"
            text="Dominion Exclusives"
            color="white"
            size="small"
            truncate={null}
            withLinkProps={null}
          />
        </div>
      </div>
    </div>

    <div className="flex  flex-wrap">
      {[...Array(creationsLength)].map((iteration, i) => (
        <div key={iteration} className="col-24  col-6-md">
          <div className="ph3  pv2">
            <CardCreations
              i={i}
              post={creations && creations[i]}
              columnCount={2}
            />
          </div>
        </div>
      ))}
    </div>

    {user ? (
      <div className="flex  justify-end  pr2">
        <Button
          type="secondary"
          size="medium"
          text="All Creations"
          color="black"
          fluid={false}
          icon={buttonIconWhite}
          iconFloat={null}
          inverted={false}
          loading={false}
          disabled={false}
          skeleton={false}
          onClick={null}
          withLinkProps={{
            type: 'next',
            href: '/profile?tab=creations',
            target: null,
            routerLink: Link,
            routerLinkProps: null,
          }}
        />
      </div>
    ) : (
      <div className="flex  justify-end  pr2">
        <div className="underline">
          <Button
            type="secondary"
            size="medium"
            text="Log in"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            withLinkProps={{
              type: 'next',
              href: '/login',
              target: null,
              routerLink: Link,
              routerLinkProps: null,
            }}
          />
        </div>

        <span className="pl1  pr2  white">or</span>

        <div className="underline">
          <Button
            type="secondary"
            size="medium"
            text="Sign up"
            color="black"
            fluid={false}
            icon={buttonIconWhite}
            iconFloat={null}
            inverted={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            withLinkProps={{
              type: 'next',
              href: '/dominion',
              target: null,
              routerLink: Link,
              routerLinkProps: null,
            }}
          />
        </div>
      </div>
    )}
  </section>
</Container>
</div> */}

        <Modal
          /* Options */
          size="small"
          active={modalActive}
        >
          <div className="pb2  mb2">
            <Heading
              /* Options */
              htmlEntity="h3"
              text="Join our Newsletter?"
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
            <SubscribeForm
              type="modal"
              onSuccess={() => setModalActive(false)}
            />
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
      </Layout>
    </>
  );
}
