import { Parallax } from 'react-scroll-parallax';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '../../components/layout';
import Container from '../../components/layout/container';
import CardCypher from '../../components/card/cypher';
import SubscribeForm from '../../components/subscribe-form';
// import RenderComponents from '../../helpers/render-components';

import {
  getSiteConfig,
  imageBuilder,
  getCurrentAndPreviousCyphers,
} from '../../lib/sanity/requests';

export default function Cyphers({ siteConfig, cyphers }) {
  let buttonIcon, heroImage, heroHeading, heroButton;

  if (cyphers.current) {
    buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

    heroImage = (
      <Image
        /* Options */
        src={imageBuilder
          .image(cyphers.current.image)
          .height(700)
          .width(1080)
          .url()}
        placeholder={imageBuilder
          .image(cyphers.current.image)
          .height(50)
          .width(108)
          .url()}
        alt="This is the alt text."
        figcaption={null}
        height={500}
        onClick={null}
        /* Children */
        withLinkProps={null}
      />
    );

    heroHeading = (
      <Heading
        /* Options */
        htmlEntity="h1"
        text={cyphers.current.title}
        color="black"
        size="x-large"
        truncate={null}
        reveal={null}
        /* Children */
        withLinkProps={null}
      />
    );

    heroButton = (
      <Button
        /* Options */
        type="primary"
        size="medium"
        text="Enter this month's Cypher"
        color="black"
        fluid={false}
        icon={buttonIcon}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        onClick={null}
        /* Children */
        withLinkProps={null}
      />
    );
  }

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
          {cyphers.current && (
            <Parallax
              className="z1  nt4"
              y={['-110px', '100px']}
              tagOuter="figure"
            >
              <div className="hero--article">
                <Hero
                  /* Options */
                  height={500}
                  /* Children */
                  image={heroImage}
                  title={heroHeading}
                  description={null}
                  button={heroButton}
                />
              </div>
            </Parallax>
          )}

          <div className="pt6  ph3  ph4-md">
            <Container>
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
