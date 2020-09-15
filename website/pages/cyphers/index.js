import {
  Heading,
  Image,
  Button,
  Copy,
  Icon,
  Input,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';
import { Parallax } from 'react-scroll-parallax';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroCypher from '~/components/hero/cypher';
import CardCypher from '~/components/card/cypher';

import {
  getSiteConfig,
  imageBuilder,
  getCurrentAndPreviousCyphers,
} from '~/lib/sanity/requests';

export default function Cyphers({ siteConfig, cyphers }) {
  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        meta={{
          siteConfig,
          title: 'Cyphers',
          description: 'This is the Cyphers page.',
          image: null,
        }}
        preview={null}
      >
        <>
          <HeroCypher cypher={cyphers?.current} />

          <div className="pt5  mt4-md  ph3  ph4-md">
            <Container>
              {!cyphers?.current && (
                <div className="flex  flex-wrap  mb3  mb5-md  pb0  pb4-md">
                  <div className="col-24  pt3  pb5  pb0-md">
                    <div className="pb3  tac-md">
                      <Heading
                        /* Options */
                        htmlEntity="h1"
                        text="There aren't currenly any Cyphers happening."
                        color="black"
                        size="large"
                        truncate={null}
                        reveal={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="tac-md">
                      <Copy
                        /* Options */
                        text={`
                      We usually host a new Cypher each month, so keep an eye on our socials for the next one!
                      `}
                        color="black"
                        size="medium"
                        truncate={null}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-almost-white  br3  pa4  pa5-md  mb5  relative">
                <div className="absolute  top  right  shadow1  br-100  bg-almost-white  nt3  mr4  mr5-md  info-color">
                  <Icon icon={['fas', 'info-circle']} size="2x" />
                </div>

                <div className="pb3">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text="What is a Rendah Mag Cypher?"
                    color="black"
                    size="large"
                    truncate={null}
                    reveal={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <Copy
                  /* Options */
                  text={`
                    Each month, Rendah Mag works with an artist to
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

              {cyphers?.current && (
                <div className="flex  flex-wrap  mt5-md  pt3-md  mb5  pb0  pb3-md">
                  <div className="col-24  col-12-md  pr5-md  pt3  pb5  pb0-md">
                    <div className="pb3">
                      <Heading
                        /* Options */
                        htmlEntity="h1"
                        text="This month's Cypher."
                        color="black"
                        size="large"
                        truncate={null}
                        reveal={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="post__body  measure-wide">
                      <BlockContent
                        blocks={
                          cyphers.current.announcementFields
                            .announcementDescription
                        }
                      />
                    </div>
                  </div>

                  <div className="col-24  col-12-md">
                    <div className="shadow2">
                      <Image
                        /* Options */
                        src={imageBuilder
                          .image(cyphers.current.imageLandscape)
                          .height(300)
                          .width(300)
                          .url()}
                        placeholder={imageBuilder
                          .image(cyphers.current.imageLandscape)
                          .height(25)
                          .width(25)
                          .url()}
                        alt="This is the alt text."
                        figcaption={null}
                        height={300}
                        width={null}
                        customClass={null}
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                </div>
              )}

              {cyphers.previous.length > 0 && (
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text="Previous Cyphers."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {cyphers.previous.map((cypher, i) => (
                      <div key={cypher.slug} className="col-24  col-6-md">
                        <div className="ph3  pv2">
                          <CardCypher i={i} post={cypher} columnCount={4} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </Container>
          </div>
        </>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const cyphers = await getCurrentAndPreviousCyphers();

  return {
    props: { siteConfig, cyphers },
  };
}
