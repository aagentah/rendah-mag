import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Observer from '@researchgate/react-intersection-observer';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Icon from '~/components/elements/icon';

import 'intersection-observer';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardCreations from '~/components/card/creations';
import Modal from '~/components/modal';
import SubscribeForm from '~/components/subscribe-form';

import {
  getFeaturedPost,
  getHomePage,
  getCategory,
  getAllCreationsTotal
} from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const RenderCards = dynamic(() => import('~/components/index/renderCards'));

export default function Home() {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const [featuredPost, setFeaturedPost] = useState(null);
  const [homePage, setHomePage] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [creations, setCreations] = useState(null);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const [interviewsLength, setInterviewsLength] = useState(4);
  const [creationsLength, setCreationsLength] = useState(4);

  useEffect(() => {
    const action = async () => {
      const featuredPostRes = await getFeaturedPost();
      const homePage = await getHomePage();
      const interviewsRes = await getCategory('interviews', [1, 4]);
      const creationsRes = await getAllCreationsTotal();

      setFeaturedPost(featuredPostRes);
      setHomePage(homePage);
      setInterviews(interviewsRes);
      setCreations(creationsRes);
    };

    action();
  }, []);

  const handleIntersect = event => {
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

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig: null,
          title: 'Home',
          description: null,
          image: null
        }}
        preview={null}
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
              text="Join our Mailing List?"
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

        <Hero
          image={homePage?.heroImage}
          title={homePage?.heroTitle || 'Loading...'}
          description={homePage?.heroDescription || 'Loading...'}
          heroButtonText={homePage?.heroLabel || 'Loading...'}
          link={homePage?.heroLink}
          marginTop={0}
          marginBottom={0}
          modifier="home"
          skeleton={!homePage}
        />

        <div className="pt5  mt4  mt5-md">
          <Container>
            <div className="relative">
              <ParallaxDiv speed={-3}>
                <span className="category-label  category-label--interviews">
                  Interviews
                </span>
              </ParallaxDiv>

              <section className="pb5">
                <div className="flex  flex-wrap  relative">
                  {[...Array(interviewsLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-12-md">
                      <div className="ph3  pv2">
                        <CardBlog
                          i={i}
                          post={interviews?.articles && interviews?.articles[i]}
                          columnCount={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex  justify-end  pr2">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="All Interviews"
                    color="black"
                    fluid={false}
                    icon={buttonIcon}
                    iconFloat={null}
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/category/[slug]',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/category/interviews`,
                        scroll: false
                      }
                    }}
                  />
                </div>
              </section>
            </div>
          </Container>

          <div className="creations  bg-black  mb6  mb5-md">
            <Container>
              <section className="pv5  creations  bg-black">
                <div className="flex  flex-wrap  pb4  ph3">
                  <div className="col-12-md  flex  justify-start">
                    <div className="bg-white  pa2  dib">
                      <Heading
                        /* Options */
                        htmlEntity="h2"
                        text="Creations"
                        color="black"
                        size="small"
                        truncate={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                  <div className="col-12-md  flex  justify-end">
                    <div className="pa2  dn  dib-md">
                      <Heading
                        /* Options */
                        htmlEntity="h2"
                        text="Exclusive to the Dominion Subscription"
                        color="white"
                        size="small"
                        truncate={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                    <div className="pa2  dib  dn-md">
                      <Heading
                        /* Options */
                        htmlEntity="h2"
                        text="Dominion Exclusives"
                        color="white"
                        size="small"
                        truncate={null}
                        /* Children */
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
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="All Creations"
                      color="black"
                      fluid={false}
                      icon={buttonIcon}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/profile?tab=creations',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: null
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex  justify-end  pr2">
                    <div className="underline">
                      <Button
                        /* Options */
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
                        /* Children */
                        withLinkProps={{
                          type: 'next',
                          href: '/login',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null
                        }}
                      />
                    </div>

                    <span className="pl1  pr2  white">or</span>

                    <div className="underline">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Sign up"
                        color="black"
                        fluid={false}
                        icon={buttonIcon}
                        iconFloat={null}
                        inverted={false}
                        loading={false}
                        disabled={false}
                        skeleton={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={{
                          type: 'next',
                          href: '/dominion',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null
                        }}
                      />
                    </div>
                  </div>
                )}
              </section>
            </Container>
          </div>

          <Observer {...observer}>
            <div className="" />
          </Observer>

          <LazyLoad once offset={800} height={800}>
            <RenderCards />
          </LazyLoad>
        </div>
      </Layout>
    </>
  );
}
