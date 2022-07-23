import React, { useState, useEffect } from 'react';
import Script from 'next/script';

import random from 'lodash/random';

import { Image, Heading } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Buttons from '~/components/dominion/buttons';

import {
  getSiteConfig,
  getDominionUsers,
  imageBuilder
} from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';

export default function Dominion({ siteConfig }) {
  const [renderButtons, setRenderButtons] = useState(false);
  const [dominion, setDominion] = useState(null);
  const app = useApp();

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

  useEffect(() => {
    if (renderButtons) {
      return;
    }

    setTimeout(() => {
      setRenderButtons(true);
    }, 100);
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
        image:
          'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610196181/dominion/dominion-social-facebook-meta.png'
      }}
      preview={null}
    >
      <div className="pt4  pt0-md">
        <Container>
          <div className="measure-wide  mla  mra  pb4  mb2-md">
            <Image
              /* Options */
              src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610317978/dominion/dominion-logo.png"
              placeholder={null}
              alt="Dominion"
              figcaption={null}
              height={null}
              width={null}
              customClass={null}
              skeleton={false}
              onClick={null}
            />
          </div>

          <div className="measure-wide  mla  mra  mb3  pb3  ph4  ph0-md">
            <p className="f-secondary  taj  f6  lh-copy">
              Right now, the Rendah Mag team embarks upon a new journey. With so
              much happening right now, we want to push our platform into new
              territory, offering a new way for you to explore the landscape of
              underground music culture. With an absolute pleasure, we bring you
              the DOMINION.
            </p>
          </div>

          <div className="flex  flex-wrap  pb5-md  mb3  ph5-md">
            <div className="col-24  col-11-md  flex  flex-wrap  justify-center  align-center">
              <img
                className="mb3  mb0-md"
                src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617893807/dominion/welcome-pack.png"
                alt="Welcome Pack"
              />
            </div>
            <div className="col-24  col-13-md  flex  flex-wrap  justify-center  ph0  pl4-md  pr0-md">
              <div className="measure-wide  ph4  ph0-md  pb2">
                <p className="f-secondary  taj  f6  pb3  lh-copy">
                  <strong>We offer the following:</strong>
                </p>

                <ul className="pl3">
                  <li className="f-secondary  tal  f6  pb2  lh-copy">
                    A Welcome package (+ membership card & stickers).
                  </li>
                  <li className="f-secondary  tal  f6  pb2  lh-copy">
                    A quarter-yearly printed issue of Rendah Mag.
                  </li>
                  <li className="f-secondary  tal  f6  pb2  lh-copy">
                    Monthly exclusive music, samples, tutorials, and 'behind the
                    scenes' insights of underground music.
                  </li>
                  <li className="f-secondary  tal  f6  pb2  lh-copy">
                    Your own Dominion Profile & login.
                  </li>
                </ul>
              </div>

              <div className="measure-wide  mb3  ph4  ph0-md">
                <p className="f-secondary  taj  f6  lh-copy">
                  Our mission with this project is to present something new and
                  exciting for the community in the hope that we can truly bring
                  something of value to artists and listeners alike. We want to
                  work not only with people of the industry, but also yourself
                  on a personal level to create something unique. I hope you can
                  join us.
                </p>
              </div>

              <div className="flex  flex-wrap  w-100">
                {renderButtons && <Buttons />}
                <div id="paypal-button-container" />
                <Script src="https://www.paypal.com/sdk/js?client-id=sb&disable-funding=card" />
              </div>
            </div>
          </div>
        </Container>

        <div className="bg-almost-white  pt5  pb4">
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
                    <div className="col-2  flex  justify-center  pa2">
                      <Image
                        /* Options */
                        src={
                          i?.avatar
                            ? imageBuilder
                                .image(i?.avatar)
                                .width(app?.deviceSize === 'md' ? 25 : 70)
                                .height(app?.deviceSize === 'md' ? 25 : 70)
                                .auto('format')
                                .fit('clip')
                                .url()
                            : `https://picsum.photos/20${random(
                                0,
                                9
                              )}/20${random(0, 9)}`
                        }
                        placeholder={null}
                        alt="User"
                        figcaption={null}
                        height={app?.deviceSize === 'md' ? 25 : 70}
                        width={app?.deviceSize === 'md' ? 25 : 70}
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
      siteConfig
    }
  };
}
