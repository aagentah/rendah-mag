import { useEffect, useState } from 'react';

import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardGallery from '~/components/card/gallery';

import { useApp } from '~/context-provider/app';

import { getSiteConfig, getAllGalleryTotal } from '~/lib/sanity/requests';

export default function Gallery({ siteConfig }) {
  const app = useApp();
  const [gallery, setGallery] = useState(null);
  const [galleryLength, setGalleryLength] = useState(24);

  useEffect(() => {
    const action = async () => {
      const galleryData = await getAllGalleryTotal();

      setGalleryLength(galleryData.length);
      setGallery(galleryData);
    };

    action();
  }, []);

  console.log('gallery', gallery);

  return (
    <>
      <Layout
        navOffset="top"
        navOnWhite={false}
        hasNav
        hasFooter
        darkMode
        meta={{
          siteConfig,
          title: 'Gallery',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <div className="creations">
          <section className="pb5  pb6-md">
            <Container>
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text="Gallery"
                  color="white"
                  size="x-large"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="pb5  measure-wide">
                <Copy
                  /* Options */
                  text={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                `}
                  color="white"
                  size="medium"
                  truncate={null}
                  skeleton={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {[...Array(galleryLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24">
                    <div className="pv2">
                      <CardGallery
                        i={i}
                        post={gallery && gallery[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </div>
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
