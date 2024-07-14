import { useEffect, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';
import { usePlausible } from 'next-plausible';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Image from '~/components/elements/image';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/cypher';
import CardCypher from '~/components/card/cypher';

import {
  getSiteConfig,
  imageBuilder,
  getCurrentAndPreviousCyphers,
} from '~/lib/sanity/requests';

const IconInfoCircle = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconInfoCircle)
);

export default function Cyphers({ siteConfig }) {
  const [cyphers, setCyphers] = useState(null);
  const [cyphersLength, setCyphersLength] = useState(24);
  const plausible = usePlausible();

  console.log('cyphers', cyphers);

  useEffect(() => {
    const action = async () => {
      const cyphersData = await getCurrentAndPreviousCyphers();

      setCyphersLength(cyphersData.previous.length);
      setCyphers(cyphersData);
    };

    action();
  }, []);

  const log = () => {
    plausible('Cypher', {
      props: {
        action: 'download',
        label: cyphers?.current?.title,
      },
    });
  };

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Cyphers',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <>
          <Hero
            image="/images/cypher-youtube.jpg"
            title="Rendah Mag Cyphers"
            description={null}
            heroButtonText={null}
            link={null}
            marginTop={0}
            marginBottom={0}
            modifier="cypher"
            skeleton={false}
          />

          <div className="pt5  pt4-md  ph3  ph4-md">
            <Container>
              {cyphers && cyphers?.current && (
                <div className="flex  flex-wrap  mt5-md  pt3-md  mb5  pb4">
                  <div className="col-24  col-15-md  pr5-md  pt3  pb4  pb0-md">
                    <div className="pb3">
                      <Heading
                        /* Options */
                        htmlEntity="h1"
                        text="This month's Cypher."
                        color="black"
                        size="large"
                        truncate={null}
                        skeleton={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="rich-text  measure-wide  mb3">
                      <BlockContent blocks={cyphers.current.description} />
                    </div>

                    <div className="flex  flex-wrap">
                      <div className="pb3  pr3">
                        <Button
                          /* Options */
                          type="primary"
                          size="small"
                          text="Download Pack"
                          color="black"
                          fluid={false}
                          icon={null}
                          iconFloat={null}
                          inverted={false}
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={() => {
                            log();
                          }}
                          /* Children */
                          withLinkProps={{
                            type: 'external',
                            href: cyphers.current.packLink,
                            target: '_blank',
                            routerLink: null,
                            routerLinkProps: null,
                          }}
                        />
                      </div>
                      <div className="pb3  pr3">
                        <Button
                          /* Options */
                          type="primary"
                          size="small"
                          text="Submission Form"
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
                            type: 'external',
                            href: cyphers.current.submissionFormLink,
                            target: '_blank',
                            routerLink: null,
                            routerLinkProps: null,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-24  col-9-md">
                    <div className="shadow2">
                      <Image
                        /* Options */
                        src={imageBuilder
                          .image(cyphers.current.imageSquare)
                          .height(500)
                          .width(500)
                          .auto('format')
                          .url()}
                        placeholder={imageBuilder
                          .image(cyphers.current.imageSquare)
                          .height(25)
                          .width(25)
                          .auto('format')
                          .url()}
                        alt="This is the alt text."
                        figcaption={null}
                        height={null}
                        width={null}
                        customClass={null}
                        skeleton={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                </div>
              )}

              {!cyphers?.current && (
                <div className="flex  flex-wrap  measure-wide  mla  mra mb3  mb5-md  pb0  pb4-md">
                  <div className="col-24  pt4  mt0  mt3-md  pb5  pb0-md">
                    <div className="pb2  tac-md">
                      <Heading
                        /* Options */
                        htmlEntity="h1"
                        text="There aren't currenly any Cyphers happening."
                        color="black"
                        size="large"
                        truncate={null}
                        skeleton={!cyphers}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="tac-md">
                      <Copy
                        /* Options */
                        text={`
                      We host new Cyphers accross the year, keep an eye out for the next one!
                      `}
                        color="black"
                        size="medium"
                        truncate={null}
                        skeleton={!cyphers}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute  top  right  br-100  nt4  nr3  nr4-md  info-color  z2  bg-white  f4">
                  <IconInfoCircle color="#6697f4" size={100} />
                </div>

                <div className="bg-light-grey  br3  pa4  pa5-md  mb5  relative">
                  <div className="pb3  mw-80">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text="What is a Rendah Mag Cypher?"
                      color="black"
                      size="large"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <Copy
                    /* Options */
                    text={`
                    Frequently, Rendah Mag works with an artist to
                    curate a sample pack consisting of a variety of
                    instruments, loops, basses, and anything else that
                    could be used to make a track. We release this pack publicly
                    for people to make a track of their own from, using these samples
                    against a set of rules. The artists then submit their
                    tracks to us, and we pick our favourites to go into a
                    curated mix.
                    `}
                    color="black"
                    size="medium"
                    truncate={null}
                  />
                </div>
              </div>

              <section className="pb5  pb6-md">
                <div className="pb3  t-secondary  f5  tac-md">
                  Check out the Cypher history.
                </div>

                <div className="pb5  tac  flex  justify-center-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Previous Cyphers"
                    color="black"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={() => {
                      log();
                    }}
                    /* Children */
                    withLinkProps={{
                      type: 'external',
                      href: 'https://soundcloud.com/rendahmag/sets/rendah-cyphers',
                      target: '_blank',
                      routerLink: null,
                      routerLinkProps: null,
                    }}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {[...Array(cyphersLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-6-md">
                      <div className="replaceph3pv2">
                        <CardCypher
                          i={i}
                          post={cyphers?.previous && cyphers.previous[i]}
                          columnCount={4}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Container>
          </div>
        </>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
