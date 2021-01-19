import { useEffect, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Parallax } from 'react-scroll-parallax';

import {
  Heading,
  Image,
  Button,
  Copy,
  Icon,
  Input,
} from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardMix from '~/components/card/mix';

import { getSiteConfig, getMixes } from '~/lib/sanity/requests';

export default function Mixes({ siteConfig }) {
  const [mixes, setMixes] = useState(null);
  const [mixesLength, setMixesLength] = useState(24);

  useEffect(() => {
    const action = async () => {
      const mixesData = await getMixes();
      setMixesLength(mixesData.length);
      setMixes(mixesData);
    };

    action();
  }, []);

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Mixes',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <>
          {
            // cyphers.current && <HeroCypher cypher={cyphers.current} />
          }

          <div className="pt5  mt4  ph3  ph4-md">
            <Container>
              <section className="pb5">
                <div className="pb4">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text="Mixes."
                    color="black"
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="flex  flex-wrap">
                  {[...Array(mixesLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-6-md">
                      <div className="ph3  pv2">
                        <CardMix mix={mixes && mixes[i]} />
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

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
