import { useEffect, useState } from 'react';

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
          image: null
        }}
        preview={null}
      >
        <div className="creations">
          <Container>
            <section className="pb5  pb6-md">
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text="Gallery"
                  color="white"
                  size="white"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {[...Array(galleryLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardGallery
                        i={i}
                        post={gallery && gallery[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Container>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig }
  };
}
