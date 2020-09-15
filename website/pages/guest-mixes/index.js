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
import CardGuestMix from '~/components/card/guest-mix';

import {
  getSiteConfig,
  imageBuilder,
  getGuestMixes,
} from '~/lib/sanity/requests';

export default function GuestMixes({ siteConfig, guestMixes }) {
  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite
        meta={{
          siteConfig,
          title: 'Guest Mixes',
          description: 'This is the Gues Mixes page.',
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
              {guestMixes.length > 0 && (
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text="Guest Mixes."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {guestMixes.map((mix, i) => (
                      <div key={mix.slug} className="col-24  col-6-md">
                        <div className="ph3  pv2">
                          <CardGuestMix mix={mix} />
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
  const guestMixes = await getGuestMixes();

  return {
    props: { siteConfig, guestMixes },
  };
}
