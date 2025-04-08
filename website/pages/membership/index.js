import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { shuffle } from 'lodash';

import { FaUserPlus, FaTabletAlt, FaBook, FaEye } from 'react-icons/fa'; // Importing icons

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import ImageNew from '~/components/elements/image-new';
import Button from '~/components/elements/button';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Accordion from '~/components/accordion';
import LatestPrint from '~/components/latest-print';
import Table from '~/components/table';

import {
  getSiteConfig,
  getDominionUsersAllTime,
  getTeamMemberAndPosts,
  imageBuilder,
} from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';

const IconPlus = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconPlus)
);

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Dominion({ siteConfig }) {
  const [dominion, setDominion] = useState(null);
  const app = useApp();
  const [isTrial, setIsTrial] = useState(false);
  const router = useRouter();
  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;
  const Timeline = dynamic(() => import('~/components/timeline'));

  const isMobile = app.deviceSize === 'md';

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: true,
    slides: { perView: 1 },
  });

  const [teamMember, setTeamMember] = useState(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      const member = await getTeamMemberAndPosts('daniel-aagentah');
      setTeamMember(member);
    };
    fetchTeamMember();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.moveToIdx(instanceRef.current.track.details.abs + 1);
    }, 7500);

    return () => clearInterval(interval);
  }, [instanceRef]);

  const IconWelcome = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 511.999 511.999"
      fill="#525252"
    >
      <path d="M466.467 86.576h-13.699c0-77.128-107.328-77.208-107.328 0H166.56c0-77.128-107.328-77.208-107.328 0h-13.7C20.426 86.576 0 107.002 0 132.109v185.046c0 25.107 20.426 45.533 45.533 45.533h13.699v101.096c0 10.777 8.737 19.514 19.514 19.514h68.299c10.777 0 19.514-8.737 19.514-19.514V362.688h178.88v101.096c0 10.777 8.737 19.514 19.514 19.514h68.299c10.777 0 19.514-8.737 19.514-19.514V362.688h13.699c25.107 0 45.533-20.426 45.533-45.533V132.109c.002-25.107-20.425-45.533-45.531-45.533zm-52.728 0h-29.271c-.001-25.317 29.271-25.662 29.271 0zm-286.208 0H98.26c0-25.317 29.271-25.662 29.271 0zm0 357.694H98.26v-81.582h29.271v81.582zm286.208 0h-29.271v-81.582h29.271v81.582zm59.233-127.115a6.512 6.512 0 0 1-6.505 6.505H45.533a6.512 6.512 0 0 1-6.505-6.505V132.109a6.512 6.512 0 0 1 6.505-6.505h420.934a6.512 6.512 0 0 1 6.505 6.505v185.046z" />
      <path d="m120.652 192.517-12.528 42.282-6.511-27.858c-.997-4.49-11.365-4.493-12.363 0l-6.511 27.858-12.528-42.282c-1.445-5.052-13.979-1.291-12.281 3.791l16.402 50.276c1.838 5.854 15.54 5.569 16.813 0l4.287-19.534 4.285 19.534c1.255 5.491 14.779 5.935 16.815 0l16.401-50.276c1.679-5.101-10.842-8.831-12.281-3.791zM179.343 201.335c5.093 0 5.258-11.209 0-11.209h-29.341c-2.804 0-5.606 1.319-5.606 3.956v52.337c0 2.637 2.804 3.956 5.606 3.956h29.341c5.255 0 5.096-11.209 0-11.209h-22.089v-14.011h12.363c5.24 0 5.083-9.891 0-9.891h-12.363v-13.929h22.089zM227.064 239.166h-18.791V194c0-2.72-3.213-3.874-6.429-3.874-3.213 0-6.428 1.154-6.428 3.874v52.419c0 2.637 2.804 3.956 5.606 3.956h26.042c4.946 0 4.946-11.209 0-11.209zM261.275 201.336c7.006 0 7.251 5.274 7.336 7.417.164 2.967 2.967 3.874 6.429 3.874 4.367 0 6.428-1.154 6.428-6.099 0-20.607-40.468-24.734-40.468 3.049v21.842c0 27.724 40.468 24.001 40.468 2.226 0-4.945-2.061-6.099-6.511-6.099-3.297 0-6.1.825-6.347 3.874-.246 3.215-.66 8.241-7.253 8.241-4.78 0-7.5-2.637-7.5-8.241v-21.841c0-5.606 2.72-8.243 7.418-8.243zM314.111 190.126c-11.375 0-20.195 5.275-20.195 19.452v21.842c0 14.176 8.819 19.45 20.195 19.452 11.373 0 20.275-5.275 20.275-19.452v-21.842c0-14.177-8.902-19.452-20.275-19.452zm7.415 41.293c0 5.686-2.801 8.241-7.417 8.241s-7.336-2.555-7.336-8.241v-21.842c0-5.688 2.72-8.243 7.336-8.243s7.417 2.555 7.417 8.243v21.842zM392.577 190.127c-4.617 0-6.593.493-9.973 6.428l-8.489 14.836-8.49-14.836c-3.379-5.934-5.357-6.428-9.972-6.428-3.215 0-6.429 1.73-6.429 6.428v49.865c0 5.275 12.859 5.275 12.859 0v-31.733l7.829 14.342c1.73 3.32 6.483 3.116 8.323 0l7.911-13.517v30.908c0 5.275 12.859 5.275 12.859 0v-49.865c0-4.697-3.132-6.428-6.428-6.428zM449.452 201.335c5.094 0 5.256-11.209 0-11.209h-29.341c-2.804 0-5.606 1.319-5.606 3.956v52.337c0 2.637 2.804 3.956 5.606 3.956h29.341c5.255 0 5.096-11.209 0-11.209h-22.089v-14.011h12.363c5.24 0 5.083-9.891 0-9.891h-12.363v-13.929h22.089z" />
    </svg>
  );

  const IconMagazine = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      baseProfile="tiny"
      version="1.2"
      viewBox="0 0 256 256"
      fill="#525252"
    >
      <path d="M88.7 47.3c0-22 17.8-39.9 39.9-39.9 22 0 39.9 17.8 39.9 39.9 0 22-17.8 40-39.9 40-22.1-.1-39.9-18-39.9-40zM256 205.7c0 12.6-10.3 22.8-22.8 22.8-3 0-5.9-.6-8.4-1.7l-35.7-9.9V252H65v-35.1l-35 9.9c-2.5 1-5 1.6-8 1.6-12.6 0-22.7-10.2-22.7-22.8 0-4.7 1.4-9.1 4-12.7l58.9-80.7S69.9 98 88.1 97h79.3c18.2 1 25.9 15.2 25.9 15.2l58.9 80.8c2.4 3.7 3.8 8 3.8 12.7zm-67-81.4-62 20.1-62-20.1v47.4l4.7-1.5s-.1 0 0 0l-.7-.2v-6.5l54 17v6.5l-25.1-8c6.8 11 3.3 27.6-15.3 33.1l-1 .2 46.1 15.3 46-15.3-1-.2c-2.3-.7-4.3-1.5-6.1-2.5L132 220.7v-6.5l28.5-9.1c-1.3-1.3-2.5-2.7-3.3-4.2L132 209v-6.5l22.8-7.3c-.4-1.7-.7-3.4-.7-5.1l-22.2 7.1v-6.5l23.4-7.5c.8-2.3 1.9-4.4 3.4-6.4l-26.7 8.6V179l53-17v6.5l-3 .9c.9.2 1.9.4 2.8.7l4.1 1.5v-47.3zM69 146.5l54 17V157l-54-17v6.5zm0 11.7 54 17v-6.5l-54-17v6.5zm116-22-53 17v20.5l53-17v-20.5z" />
    </svg>
  );

  const IconWebsite = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 64 64"
      fill="#525252"
    >
      <path d="M62 5H2a2 2 0 0 0-2 2v50a2 2 0 0 0 2 2h60a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2 4v8H4V9h56zM4 55V21h56v34H4z" />
      <path d="M10 15c.52 0 1.04-.21 1.41-.59.38-.37.59-.89.59-1.41s-.21-1.04-.59-1.42c-.74-.74-2.08-.74-2.83.01a2.006 2.006 0 0 0 .01 2.83c.37.37.889.58 1.41.58zM16 15c.52 0 1.04-.21 1.42-.59.37-.37.58-.89.58-1.41s-.21-1.04-.59-1.42c-.74-.74-2.08-.74-2.83.01-.37.37-.58.89-.58 1.41s.21 1.04.59 1.42c.37.37.889.58 1.41.58zM22 15c.53 0 1.04-.21 1.41-.59.38-.37.59-.88.59-1.41 0-.52-.21-1.04-.59-1.42-.74-.74-2.08-.74-2.83.01-.37.37-.58.89-.58 1.41 0 .53.21 1.04.59 1.41.37.38.889.59 1.41.59zM31 25H10a2 2 0 0 0 0 4h21a2 2 0 0 0 0-4zM31 33H10a2 2 0 0 0 0 4h21a2 2 0 0 0 0-4zM31 41H10a2 2 0 0 0 0 4h21a2 2 0 0 0 0-4zM54 25H39a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2V27a2 2 0 0 0-2-2zm-2 16H41V29h11v12z" />
    </svg>
  );

  const steps = [
    {
      title: '1) Sign up',
      description: 'Join the membership and we’ll get you up and running.',
      icon: IconWelcome, // Sign-up icon
    },
    {
      title: '2) Receive our latest magazine',
      description:
        'We ship our latest print to you. Future issues are sent automatically as they’re released.',
      icon: IconMagazine, // Newspaper icon
    },
    {
      title: '3) Access the member dashboard',
      description:
        'In the meantime, explore our exclusive platform’s resources.',
      icon: IconWebsite,
    },
    {
      title: '4) Keep it locked',
      description:
        'Keep an eye out for new content & updates throughout each month.',
      icon: <FaEye size={38} color="#525252" />, // Notification icon
    },
  ];

  useEffect(() => {
    if (router.query.isTrial === 'true') {
      setIsTrial(true);
    }
  }, [router.query.isTrial]);

  const accordionData = [
    {
      question: 'When do I get my first printed mag?',
      answer:
        'Once you’ve subscribed, we’ll send out the very latest magazine happening at that point in time, regardless of anything else that may be happening in our schedule. From there, you can expect a new print in the mail every 3-4 months on average.',
    },
    {
      question: 'Free shipping?',
      answer: `On the subscription, shipping is totally free—forever—regardless of where you're based.`,
    },
    {
      question: `How do I access the digital content?`,
      answer: `A Dominion profile & login will be automatically created where you can access all of our digital content off-the-bat. In addition, we'll typically send a few emails each month to expand on what we're building as a team, and highlight the various things launching across the Dominion platform.`,
    },
    {
      question: `Who is the Dominion aimed at?`,
      answer: `We hope there's something for everyone here. Whether you're a DJ; artist; general listener; we aim to switch up what we offer to support plenty of avenues!`,
    },
    {
      question: 'Can I cancel whenever?',
      answer: 'Yes. You’re absolutely free to cancel at any time via email.',
    },
    {
      question: 'Why not Patreon?',
      answer: `We built this website and the Dominion dashboard completely bespoke to create a custom experience for those using the platform. Instead of going down the Patreon route, we've enjoyed the experiences that arise in creating something specifically for our vision. Technologies used are React.js, Next.js, and Sanity.io, with Stripe integrations to handle security & payments.`,
    },
  ];

  useEffect(() => {
    const action = async () => {
      let dominion = await getDominionUsersAllTime();

      // Roun down to nearest multiple of 12
      const customFloor = (value, roundTo) =>
        Math.floor(value / roundTo) * roundTo;
      const roundDown = customFloor(dominion.length, 12);
      dominion.length = roundDown;

      setDominion(dominion);
    };

    action();
  }, []);

  function Arrow({ left, onClick, disabled }) {
    return (
      <svg
        onClick={onClick}
        className={`arrow ${left ? 'arrow--left' : 'arrow--right'} ${
          disabled ? 'arrow--disabled' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {left ? (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        ) : (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  return (
    <Layout
      navOffset="top"
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'Something new & exciting.',
        image: '/images/dominion-logo.png',
      }}
      preview={null}
    >
      <div className="container my-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 mb-12">
          <div className="md:col-span-2 max-w-md mb-12">
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed text-left">
              <strong>
                <span className="text-neutral-400">Rendah Mag</span> /
                Membership
              </strong>
              <br />
              <br />
            </p>

            <div className="max-w-md">
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed text-left mb-4">
                The membership was created to push our platform into new
                territory, offering a way for people to explore the landscape of
                underground music, art, and technology; away from noise and
                distraction.
              </p>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed text-left">
                We invite you to explore this with us.
              </p>

              <Table
                className="text-xs md:text-sm py-8"
                rows={[
                  {
                    left: 'Price',
                    right: '£11/month',
                    rightClassName: 'text-right',
                  },
                  {
                    left: 'Magazine Delivery',
                    right: (
                      <span className="text-right">
                        3x prints yearly
                        <br />
                        Free Global Shipping
                        <br />
                        Member Card + Stickers
                      </span>
                    ),
                  },
                  {
                    left: 'Dashboard Access',
                    right: (
                      <span className="text-right">
                        Membership dashboard
                        <br />
                        Monthly exclusive insights
                        <br />
                        20% additional discount
                      </span>
                    ),
                  },
                  {
                    left: 'Digital Archive',
                    right: (
                      <span className="text-right">Print Archive Access</span>
                    ),
                  },
                ]}
              />

              <div className="">
                <Button
                  /* Options */
                  type="secondary"
                  size="small"
                  text="Join Membership"
                  color="rendah-red"
                  fluid={false}
                  icon={buttonIconRed}
                  iconFloat="right"
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'external',
                    href: isTrial
                      ? 'https://buy.stripe.com/00g6rH85LceZ3cc5kq'
                      : 'https://buy.stripe.com/cN29DT2Lr6UFcMM8wG',
                    target: '_blank',
                    routerLink: null,
                    routerLinkProps: null,
                  }}
                />

                <p className="text-xs text-neutral-500 pt-1.5">
                  [Includes latest print]
                </p>
              </div>
            </div>

            {/* {!user && (
            <Link href="/membership" legacyBehavior>
              <a className="flex justify-start">
                <p className="flex flex-wrap items-center text-base text-red-600 leading-tight text-left cursor-pointer">
                  <span className="pr-2">
                    Explore{' '}
                    <span className="hidden md:inline">what we offer via</span>{' '}
                    our <span className="underline">Subscription</span>
                  </span>
                  <span>{buttonIconRed}</span>
                </p>
              </a>
            </Link>
          )} */}
          </div>

          <div className="md:col-span-2">
            <img
              className="mt-4 brightness-75"
              src="https://i.ibb.co/whB1MgH0/Rendah-Cover-Full-1.png"
              // src="/images/_DSC4845.png"
              alt="Welcome Pack"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <hr className="my-12 border border-neutral-700 opacity-25 md:opacity-100" />
      </div>

      {/* How it Works Section */}
      <div className="py-6">
        <div className="container">
          <div className="pb-12">
            <h2 className="text-neutral-400">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col p-3 h-32 md:h-40">
                <div className="mb-3">{step.icon}</div>
                <div>
                  <h3 className="text-neutral-300 text-sm leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <hr className="my-12 border border-neutral-700 opacity-25 md:opacity-100" />
      </div>

      <div className="pt-4 md:pt-5 page--dominion">
        {/* Header Section */}

        {/* Latest Print Component */}
        <LatestPrint showDominionButton={false} />

        <div className="container">
          <hr className="my-12 border border-neutral-700 opacity-25 md:opacity-100" />
        </div>

        {/* Subscriber Dashboard Section */}
        <div className="text-white py-6">
          <div className="container">
            <div className="flex flex-wrap mb-4">
              <div className="max-w-prose">
                <div className="pb-8">
                  <h2 className="text-neutral-400">
                    Some words on our membership dashboard
                  </h2>
                </div>
                <div className="mb-8">
                  <p className="border-l-4 border-rendah-red pl-4 text-neutral-300 leading-relaxed text-sm pb-4 text-left relative">
                    In addition to our prints, the membership dashboard is where
                    we tell the stories of the many artists and creatives we
                    collaborate with daily.
                    <br />
                    <br />
                    As a super-small team, we'd like to curate a space to share
                    our favourite aspects of artistry, offering exclusive music,
                    high-resolution art, production samples, artist takeovers,
                    technical documents, and more.
                    <br />
                    <br />
                    In an age of distraction and oversaturation, we aim to
                    create something attuned to the intersections of music, art,
                    and technology. Here's to making that happen.
                  </p>
                </div>
                {teamMember && (
                  <div className="flex flex-wrap items-center">
                    <div
                      className="mb-3 md:mb-0 brightness-75"
                      style={{ width: '80px', height: '80px' }}
                    >
                      <ImageNew
                        imageObject={teamMember.imageObject}
                        height={80}
                        className=""
                      />
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-sm md:text-base pl-4">
                      <span className="text-neutral-400">
                        ~ Dan from the Rendah Mag team
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <hr className="my-12 border border-neutral-700 opacity-25 md:opacity-100" />
        </div>

        {/* Active Subscribers Section */}
        <div className="py-12">
          <div className="container">
            <div className="pb-8">
              <h2 className="text-neutral-400">
                Active members in {new Date().getFullYear()}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-4">
              {dominion?.map((i, o) => {
                const fade = 1 - (o / dominion.length) * 1.05; // goes from 1 to ~0
                const isPlaceholder = !i?.avatar;
                const shouldInvert = isPlaceholder && Math.random() < 0.5;

                return (
                  <div
                    key={o}
                    className={`w-10 h-10 ${shouldInvert ? 'invert' : ''}`}
                    style={{ opacity: fade }}
                  >
                    <Image
                      src={
                        isPlaceholder
                          ? '/images/avatar-placeholder.png'
                          : imageBuilder
                              .image(i?.avatar)
                              .width(36)
                              .height(36)
                              .auto('format')
                              .fit('clip')
                              .url()
                      }
                      alt="User"
                      width={36}
                      height={36}
                      customClass={`w-full brightness-75`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container">
          <hr className="my-12 border border-neutral-700 opacity-25 md:opacity-100" />
        </div>

        {/* FAQ Section */}
        <div className="py-12">
          <div className="container">
            <div className="pb-4">
              <h2 className="text-neutral-400">FAQ</h2>
            </div>

            <Accordion data={accordionData} />
          </div>
        </div>
      </div>

      <Timeline />
    </Layout>
  );
}

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
