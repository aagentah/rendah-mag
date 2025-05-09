import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardPack from '~/components/card/pack';

import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { getAllPacks } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

export default function ProfilePacks() {
  const [user, { loading, mutate, error }] = useUser();
  const [samples, setSamples] = useState([]);
  const [samplesLength, setSamplesLength] = useState(9);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const [modalActive, setModalActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const startProgress = () => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 750);
  };

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;

  const apply = (i) => {
    setModalActive(i);
    setCardsShow(false);
  };

  // Fetch samples
  useEffect(() => {
    const action = async () => {
      let sinceStartOfMonth = user?.dominionSince.split('T')[0];
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 8, '0');
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 9, '1');

      const data = await getAllPacks(sinceStartOfMonth, showAll);
      if (data) {
        setSamples(data);
        setSamplesLength(data?.length);
      }
    };

    action();
  }, [showAll]);

  const renderGhostCards = () => {
    const count = 9 - samples?.length;
    const ghostCards = [];
    const ghostItem = { title: 'TBA' };

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        ghostCards.push(
          <div className="col-24  col-8-md  ph3 pv2  o-30">
            <CardPack i={i} post={ghostItem} handleClick={null} />
          </div>
        );
      }

      return ghostCards;
    }

    return false;
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
                text="Samples"
                color="white"
                size="medium"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
            <div className="pb4  mb2">
              <p className="white  f6  lh-copy  measure-wide">
                Each month, we feature an exclusive sample pack from the various
                artists that we work with in the community, available to
                download on the Dominion.
              </p>
            </div>
          </div>

          <div className="relative  ">
            <div
              className={`
              dominion-cards
              ${cardsShow && 'dominion-cards--active'}
          `}
            >
              <div className="flex  flex-wrap  pb3">
                {[...Array(samplesLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md  ph3 pv2">
                    <CardPack
                      i={i}
                      post={samples?.length && samples[i]}
                      handleClick={apply}
                    />
                  </div>
                ))}

                {renderGhostCards()}
              </div>

              {samples?.length > 9 && (
                <div
                  className="flex  justify-center"
                  onClick={() => {
                    if (showAll || samples?.length <= 12) return;
                    setShowAll(true);
                  }}
                >
                  <Button
                    /* Options */
                    type="primary"
                    size="small"
                    text="Load more"
                    color="white"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={true}
                    loading={null}
                    disabled={showAll || samples?.length <= 12}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'form',
                      url: null,
                      target: null,
                      routerLink: null,
                    }}
                  />
                </div>
              )}
            </div>

            <section>
              {samples.length
                ? samples.map((item, i) => (
                    <div
                      key={i}
                      className={`
                    dominion-modal-wrapper
                    ${modalActive === i ? 'dominion-modal-wrapper--active' : ''}
                  `}
                    >
                      <Button
                        /* Options */
                        type="secondary"
                        size="small"
                        text="Back"
                        color="white"
                        fluid={false}
                        icon={buttonIconArrowLeft}
                        iconFloat="left"
                        inverted={true}
                        loading={false}
                        disabled={false}
                        skeleton={false}
                        onClick={() => {
                          setModalActive(null);
                          setCardsShow(true);
                        }}
                        /* Children */
                        withLinkProps={null}
                      />
                      {modalActive === i && (
                        <>
                          {startProgress()}
                          <CarouselItemSection pack={item} />
                        </>
                      )}
                    </div>
                  ))
                : ''}
            </section>
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
