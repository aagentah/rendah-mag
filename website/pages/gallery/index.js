import { useEffect, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Parallax } from 'react-scroll-parallax';

import { Heading, Copy, Image, Label } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/cypher';
import CardGallery from '~/components/card/gallery';
import GalleryInfo from '~/components/gallery/info';
import GalleryBanner from '~/components/gallery/banner';
import GalleryImageText from '~/components/gallery/image-text';

import { useApp } from '~/context-provider/app';

import {
  getSiteConfig,
  imageBuilder,
  getAllGalleryTotal,
} from '~/lib/sanity/requests';

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
          image: null,
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
    props: { siteConfig },
  };
}