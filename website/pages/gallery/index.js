import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Image from '~/components/elements/image';

import { useApp } from '~/context-provider/app';

import {
  getSiteConfig,
  imageBuilder,
  getAllGalleryTotal,
} from '~/lib/sanity/requests';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Gallery({ siteConfig }) {
  const app = useApp();
  const [gallery, setGallery] = useState(null);
  const [galleryLength, setGalleryLength] = useState(24);
  const [formattedData, setFormattedData] = useState([]);

  const arrowRight = <IconArrowRight color="white" size={12} />;

  useEffect(() => {
    const action = async () => {
      const galleryData = await getAllGalleryTotal();

      let allFormattedData = [];

      galleryData.forEach((gallery) => {
        gallery?.galleryImages?.length &&
          gallery.galleryImages.forEach((image) => {
            allFormattedData.push({
              image: image.asset, // Or whatever field contains the image URL
              artist: {
                ...gallery,
                // Add more artist info fields here as needed
              },
            });
          });
      });

      // Shuffle the allFormattedData array for randomness
      allFormattedData = allFormattedData.sort(() => Math.random() - 0.5);

      setFormattedData(allFormattedData);
      setGalleryLength(galleryData.length);
      setGallery(galleryData);
    };

    action();
  }, []);

  console.log('formattedData', formattedData);

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
        <div className="creations  pt5">
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
                  A showcase of diversity in art, AV, animation, graphic design, 3D rendering, VR, and concept art, featuring artists from Rendah Mag's print editions along with their extended portfolios.
                  
                  `}
                  color="white"
                  size="medium"
                  truncate={null}
                  skeleton={null}
                />
              </div>
            </Container>

            <div className="flex flex-wrap  mb5  pb4">
              {formattedData?.length &&
                formattedData.map(({ image, artist }, i) => (
                  <div
                    className="card__gallery  col-8  col-6-md  pa2  relative  flex  align-center  jsutify-center"
                    key={i}
                  >
                    <div className="card__gallery__image  w-100  h-100">
                      <LazyLoad once offset={250} height={300}>
                        <Image
                          src={imageBuilder
                            .image(image)
                            .height(800)
                            .width(800)
                            .auto('format')
                            .fit('clip')
                            .url()}
                          placeholder={imageBuilder
                            .image(image)
                            .height(25)
                            .width(25)
                            .auto('format')
                            .fit('clip')
                            .blur('20')
                            .url()}
                          alt={image.alt || ''}
                          figcaption={null}
                          height={null}
                          width={null}
                          customClass="cp"
                          skeleton={false}
                          onClick={false}
                          withLinkProps={
                            artist?.slug && {
                              type: 'external',
                              href: `/gallery/${artist?.slug}`,
                              target: null,
                              routerLink: null,
                              routerLinkProps: null,
                            }
                          }
                        />
                      </LazyLoad>
                    </div>

                    <div className="card__gallery__title  white  f4  lh-title  cp  t-primary  absolute  left  right  mla  mra  tac  flex  align-center  justify-center">
                      <p className="ph5">
                        Check out {artist?.title}
                        <span className="pl2  dib">{arrowRight}</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
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
