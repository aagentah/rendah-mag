import { Heading, Button, Copy, Icon, Input } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import HeroCypher from '../../components/hero/cypher';
import CardCypher from '../../components/card/cypher';
import SubscribeForm from '../../components/subscribe-form';

import {
  getSiteConfig,
  getCurrentAndPreviousCyphers,
} from '../../lib/sanity/requests';

export default function Cyphers({ siteConfig, cyphers }) {
  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        meta={{
          siteConfig,
          title: 'Home',
          description: 'This is the Home page.',
          image: null,
        }}
        preview={null}
      >
        <div>
          {cyphers.current && <HeroCypher cypher={cyphers.current} />}

          <div className="pt6  ph3  ph4-md">
            <Container>
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

              <div className="pb5  measure-wide">
                <Copy
                  /* Options */
                  text={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit.'
                  }
                  color={'black'}
                  size={'medium'}
                  truncate={null}
                />
              </div>

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
                      <div key={cypher.slug} className="col-24  col-8-md">
                        <div className="ph3  pv2">
                          <CardCypher i={i} post={cypher} columnCount={4} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="pb3">
                <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                  - Subscribe Banner
                </h2>

                <SubscribeForm />
              </section>
            </Container>
          </div>
        </div>
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
