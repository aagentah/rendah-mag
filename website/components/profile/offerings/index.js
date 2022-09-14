import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardOffering from '~/components/card/offering';

import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { getAllOfferings } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconArrowLeft)
);

export default function ProfileDominion() {
  const [user, { loading, mutate, error }] = useUser();
  const [offerings, setOfferings] = useState([]);
  const [offeringsLength, setOfferingsLength] = useState(9);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = playerRef => setCurrentAudioSelected(playerRef);
  const [modalActive, setModalActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const startProgress = () => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 750);
  };

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;

  const apply = i => {
    setModalActive(i);
    setCardsShow(false);
  };

  // Fetch offerings
  useEffect(() => {
    const action = async () => {
      let sinceStartOfMonth = user?.dominionSince.split('T')[0];
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 8, '0');
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 9, '1');
      const d = new Date(sinceStartOfMonth);
      d.setMonth(d.getMonth() - 1);

      const data = await getAllOfferings(
        d.toISOString().split('T')[0],
        showAll
      );
      if (data) {
        setOfferings(data);
        setOfferingsLength(data?.length);
      }
    };

    action();
  }, [showAll]);

  const renderGhostCards = () => {
    const count = 9 - offerings?.length;
    const ghostCards = [];
    const ghostItem = { title: 'TBA' };

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        ghostCards.push(
          <div className="col-24  col-8-md  ph3  pv2  o-30">
            <CardOffering i={i} post={ghostItem} handleClick={null} />
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
          <div className="profile_heading">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Dubplates"
              color="white"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="relative  ">
            <div
              className={`
              dominion-cards
              ${cardsShow && 'dominion-cards--active'}
          `}
            >
              <div className="pb4  mb2">
                <p className="white  f6  lh-copy">
                  A 'Dubplates' pack consists of exclusive music from the
                  artists & labels that we work with, available as part of the
                  Dominion. Each month we add an additional Offering to this tab
                  from the month in which you joined.
                </p>
              </div>

              <div className="flex  flex-wrap  pb3">
                {[...Array(offeringsLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-8-md  ph3  pv2">
                    <CardOffering
                      i={i}
                      post={offerings?.length && offerings[i]}
                      handleClick={apply}
                    />
                  </div>
                ))}

                {renderGhostCards()}
              </div>

              {offerings?.length > 9 && (
                <div
                  className="flex  justify-center"
                  onClick={() => {
                    if (showAll || offerings?.length <= 12) return;
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
                    disabled={showAll || offerings?.length <= 12}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'form',
                      url: null,
                      target: null,
                      routerLink: null
                    }}
                  />
                </div>
              )}
            </div>

            <section>
              {offerings.length
                ? offerings.map((item, i) => (
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
                          <CarouselItemSection offering={item} />
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
              href: '/dominion',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                scroll: false
              }
            }}
          />
        </div>
      </>
    );
  }

  return false;
}
