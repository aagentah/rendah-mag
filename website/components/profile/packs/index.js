import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Heading, Button, Icon } from 'next-pattern-library';

import CardPack from '~/components/card/pack';

import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { getAllPacks } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

export default function ProfilePacks() {
  const [user, { loading, mutate, error }] = useUser();
  const [samples, setSamples] = useState([]);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const [modalActive, setModalActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const buttonIconArrowLeft = <Icon icon={['fas', 'arrow-left']} />;

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
      if (data) setSamples(data);
    };

    action();
  }, [showAll]);

  const renderGhostCards = () => {
    const count = 9 - samples?.length;
    const ghostCards = [];
    const ghostItem = { title: '???' };

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        ghostCards.push(
          <div className="col-24  col-8-md  ph3  pv2  o-30">
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
          <div className="relative  ">
            <div
              className={`
              dominion-cards
              ${cardsShow && 'dominion-cards--active'}
          `}
            >
              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text="Samples"
                  color="black"
                  size="medium"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap  pb3">
                {samples.length
                  ? samples.map((item, i) => (
                      <div
                        className="col-24  col-8-md  ph3  pv2"
                        key={item.slug}
                      >
                        <CardPack i={i} post={item} handleClick={apply} />
                      </div>
                    ))
                  : ''}

                {renderGhostCards()}
              </div>

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
                  color="black"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted={false}
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
                        color="black"
                        fluid={false}
                        icon={buttonIconArrowLeft}
                        iconFloat="left"
                        inverted={false}
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

                      {modalActive === i && <CarouselItemSection pack={item} />}
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
            color="black"
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
            color="black"
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
