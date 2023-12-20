import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import Button from '~/components/elements/button';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Accordion from '~/components/accordion';

import {
  getSiteConfig,
  getDominionUsers,
  imageBuilder,
} from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';

const IconPlus = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconPlus)
);

export default function Dominion({ siteConfig }) {
  const [dominion, setDominion] = useState(null);
  const app = useApp();
  const buttonIconPlus = <IconPlus color="rendah-red" size={16} />;

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
      let dominion = await getDominionUsers();

      // Roun down to nearest multiple of 12
      const customFloor = (value, roundTo) =>
        Math.floor(value / roundTo) * roundTo;
      const roundDown = customFloor(dominion.length, 12);
      dominion.length = roundDown;

      setDominion(dominion);
    };

    action();
  }, []);

  return (
    <Layout
      navOffset="top"
      navOnWhite
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
      <div className="pt4  pt0-md  page--dominion">
        <Container>
          <div className="measure-wide  mla  mra  pb4  mb3-md">
            <img src="/images/dominion-logo.png" alt="Dominion" />
          </div>

          <div className="flex  flex-wrap  pb5  mb3  mb4-md  ph5-md">
            <div className="col-24  col-10-md  flex  flex-wrap  justify-center  align-center">
              <img
                className="mb3  mb0-md"
                src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617893807/dominion/welcome-pack.png"
                alt="Welcome Pack"
              />
            </div>
            <div className="col-24  col-14-md  flex  flex-wrap  justify-center  ph0  pl4-md  pr0-md">
              <div className="measure-wide  ph4  ph0-md  pb2">
                <p className="t-secondary  taj  f5  lh-copy  pb3">
                  <strong>
                    The Rendah Mag 'Dominion' is our hybrid
                    subscription-service.
                  </strong>
                </p>

                <p className="t-secondary  taj  f6  lh-copy  pb3">
                  With so much happening right now, we want to push our platform
                  into new territory, offering a new way for people to explore
                  the landscape of underground music, art, and technology.
                </p>

                <p className="t-secondary  taj  f6  pb3  lh-copy">
                  <strong>We offer the following:</strong>
                </p>

                <ul className="pl3">
                  <li className="t-secondary  tal  f6  pb2  lh-copy">
                    3 x Printed magazines per year (+ FREE SHIPPING)
                  </li>
                  <li className="t-secondary  tal  f6  pb2  lh-copy">
                    A Welcome package
                  </li>
                  <li className="t-secondary  tal  f6  pb2  lh-copy">
                    Access to subscriber-only articles
                  </li>
                  <li className="t-secondary  tal  f6  pb2  lh-copy">
                    Exclusive music & downloads from the labels we work with
                  </li>
                  <li className="t-secondary  tal  f6  pb2  lh-copy">
                    Digital access to ALL previous prints
                  </li>
                  <li className="t-secondary  tal  f6  pb2  lh-copy">
                    Discount on all upcoming merch
                  </li>
                </ul>
              </div>

              <div className="measure-wide  mb3  ph4  ph0-md">
                <p className="t-secondary  taj  f6  lh-copy  pb3-md">
                  Our mission with this project is to present something new and
                  exciting for the community in the hope that we can truly bring
                  something of value to artists and listeners alike. We hope you
                  can join us.
                </p>
              </div>

              <div className="flex  flex-wrap  w-100  pt4  pt0-md  ph3  ph0-md">
                <div className="col-24  col-12-md  flex  align-center  justify-center">
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Subscribe Now"
                    color="black"
                    fluid={true}
                    icon={buttonIconPlus}
                    iconFloat="left"
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'external',
                      href: 'https://buy.stripe.com/6oE2br5XDdj3144eUZ',
                      target: '_blank',
                      routerLink: null,
                      routerLinkProps: null,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container>
          <div className="pb4  flex  justify-center">
            <Heading
              /* Options */
              htmlEntity="h3"
              text="FAQ"
              color="black"
              size="medium"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="measure-wide  mla  mra  pb4">
            <Accordion data={accordionData} />
          </div>
        </Container>

        <div className="bg-almost-white  pt4  pb4">
          <Container>
            <div className="pb4  flex  justify-center">
              <Heading
                /* Options */
                htmlEntity="h3"
                text="Members"
                color="black"
                size="medium"
                truncate={null}
                skeleton={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="flex  flex-wrap  justify-center  pb5">
              {dominion?.length &&
                dominion.map((i, o) => {
                  // if (i.avatar) {
                  return (
                    <div className="col-6  col-2-md  flex  justify-center  pa2">
                      <Image
                        /* Options */
                        src={
                          i?.avatar
                            ? imageBuilder
                                .image(i?.avatar)
                                .width(70)
                                .height(70)
                                .auto('format')
                                .fit('clip')
                                .url()
                            : '/images/avatar-placeholder.png'
                        }
                        placeholder={null}
                        alt="User"
                        figcaption={null}
                        height={70}
                        width={70}
                        customClass="shadow2  br-100  bg-grey"
                        skeleton={false}
                        onClick={null}
                      />
                    </div>
                  );
                  // }
                })}
            </div>
          </Container>
        </div>
      </div>
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
