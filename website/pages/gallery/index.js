import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import Cookies from 'js-cookie';

import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Image from '~/components/elements/image';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
  imageBuilder,
  getAllGalleryTotal,
} from '~/lib/sanity/requests';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

const Modal = dynamic(() => import('~/components/modal'));

const SubscribeForm = dynamic(() => import('~/components/subscribe-form'));

export default function Gallery({ siteConfig }) {
  const app = useApp();
  const [gallery, setGallery] = useState(null);
  const [galleryLength, setGalleryLength] = useState(24);
  const [formattedData, setFormattedData] = useState([]);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [user] = useUser();

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

  const handleIntersect = (event) => {
    if (
      event.isIntersecting &&
      !user &&
      !hasShownModal &&
      !Cookies.get('rndh-newsletter-set')
    ) {
      setHasShownModal(true);
      setModalActive(true);
      Cookies.set('rndh-newsletter-set', true, { expires: 5 });
    }
  };

  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

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
        <Modal
          /* Options */
          size="small"
          active={modalActive}
        >
          <div className="pb2  mb2">
            <Heading
              /* Options */
              htmlEntity="p"
              text="You made it to the bottom"
              color="white"
              size="medium"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb2">
            <Copy
              /* Options */
              text="Can we add you to our Newsletter? We usually only send a few emails each month, and keep the content relevant as ever."
              color="white"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb3  mb2">
            <SubscribeForm
              type="modal"
              onSuccess={() => setModalActive(false)}
            />
          </div>
          <div className="flex  flex-wrap  pb2">
            <div className="col-24  flex  justify-center  align-center">
              <Button
                /* Options */
                type="secondary"
                size="medium"
                text="No thanks"
                color="black"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={() => {
                  setModalActive(false);
                }}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

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
                  text="A visual art showcase, featuring back-catalogues and extended portfolios from artists that we work with."
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

        <Observer {...observer}>
          <div>
            <br />
          </div>
        </Observer>
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
