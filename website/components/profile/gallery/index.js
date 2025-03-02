import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import LazyLoad from 'react-lazyload';
import { usePlausible } from 'next-plausible';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Image from '~/components/elements/image';

import { useUser } from '~/lib/hooks';

import { getAllGalleryTotal, imageBuilder } from '~/lib/sanity/requests';

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

const IconDownload = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconDownload)
);

export default function ProfileGallery() {
  const [user, { loading, mutate, error }] = useUser();
  const [samples, setSamples] = useState([]);
  const [samplesLength, setSamplesLength] = useState(24);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const [modalActive, setModalActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const plausible = usePlausible();

  const startProgress = () => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 750);
  };

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;

  // const apply = (i) => {
  //   setModalActive(i);
  //   setCardsShow(false);
  // };

  // Fetch samples
  useEffect(() => {
    const action = async () => {
      const data = await getAllGalleryTotal();
      if (data) {
        let allFormattedData = [];

        data.forEach((gallery) => {
          gallery.galleryImages.forEach((image) => {
            allFormattedData.push({
              image: image.asset, // Or whatever field contains the image URL
              allowHighResDl: !!image?.allowHighResDl,
              artist: {
                ...gallery,
                // Add more artist info fields here as needed
              },
            });
          });
        });

        setSamples(allFormattedData);
        setSamplesLength(data?.length);
        console.log('data', data);
        console.log('allFormattedData', allFormattedData);
      }
    };

    action();
  }, [showAll]);

  const triggerOnDownloadEvt = ({ filename, res }) => {
    plausible('Image Download', {
      props: {
        action: 'download',
        label: `${filename} (${res})`,
      },
    });
  };

  if (user?.isDominion) {
    return (
      <>
        <section>
          <div className="ph3">
            <div className="profile_heading">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Gallery (Dominion Exclusives)"
                color="white"
                size="medium"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pb4  mb2">
              <p className="white  f6  lh-copy  measure-wide">
                Here is the curated catalogue of artworks available for high-res
                downloads—approved by the artist for the Dominion. To see the
                public gallery, check out the{' '}
                <Link legacyBehavior href="/gallery">
                  <a className="white  underline">Gallery page</a>
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-wrap  mb5  pb4">
            {samples?.length &&
              samples.map(
                ({ image, artist, allowHighResDl }, i) =>
                  allowHighResDl && (
                    <div
                      className="card__gallery  col-8  col-6-md  pa2  relative  flex  align-center  jsutify-center"
                      key={i}
                    >
                      <div className="card__gallery__image  w-100  h-100  z1">
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
                            customClass="z1"
                            skeleton={false}
                            onClick={false}
                            withLinkProps={null}
                          />
                        </LazyLoad>
                      </div>

                      <div className="card__gallery__title  card__gallery__title--profile  white  f5  lh-title  t-primary  absolute  left  right  mla  mra  tac  flex  flex-wrap  align-center  justify-center  z9">
                        <p className="ph5  pb4">Artwork by {artist?.title}</p>

                        <a
                          href={`${imageBuilder.image(image).url()}?dl=`}
                          target="_external"
                          className="w-100  z9"
                          onClick={() => {
                            triggerOnDownloadEvt({
                              filename: image?.fileName,
                              res: 'High-res',
                            });
                          }}
                        >
                          <Button
                            /* Options */
                            type="primary"
                            size="small"
                            text="Download High-res"
                            color="black"
                            fluid={false}
                            icon={<IconDownload color="white" size={16} />}
                            iconFloat="left"
                            inverted={false}
                            loading={false}
                            disabled={false}
                            skeleton={false}
                            onClick={null}
                            /* Children */
                            withLinkProps={null}
                          />
                        </a>
                      </div>
                    </div>
                  )
              )}
          </div>
        </section>
      </>
    );
  }

  if (!user?.isDominion) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You are not currently in the Dominion"
            color="white"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Click here to join"
            color="white"
            fluid={false}
            icon={null}
            iconFloat={null}
            invert={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/membership',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                scroll: false,
              },
            }}
          />
        </div>
      </>
    );
  }

  return false;
}
