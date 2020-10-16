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
import CardGuestMix from '~/components/card/guest-mix';

import { getSiteConfig, getGuestMixes } from '~/lib/sanity/requests';

export default function GuestMixes({ siteConfig }) {
  const [mixes, setMixes] = useState(null);
  const [mixesLength, setMixesLength] = useState(24);

  const handleAsyncTasks = async () => {
    const mixesData = await getGuestMixes();
    setMixesLength(mixesData.length);
    setMixes(mixesData);
  };

  useEffect(() => {
    handleAsyncTasks();
  }, []);

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite
        meta={{
          siteConfig,
          title: 'Guest Mixes',
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
                    text="Guest Mixes."
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
                        <CardGuestMix mix={mixes && mixes[i]} />
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
