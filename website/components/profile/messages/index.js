import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardMessage from '~/components/card/message';

import { useUser } from '~/lib/hooks';

import { getLastThreeDominionItems } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

export default function ProfileDominion() {
  const [user, { loading, mutate, error }] = useUser();
  const [messages, setMessages] = useState([]);
  const [messagesLength, setMessagesLength] = useState(9);
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

  // Fetch messages
  useEffect(() => {
    const action = async () => {
      const data = await getLastThreeDominionItems();

      if (data) {
        setMessages(data);
        setMessagesLength(data?.length);
      }
    };

    action();
  }, [showAll]);

  const renderGhostCards = () => {
    const count = 6 - messages?.length;
    const ghostCards = [];
    const ghostItem = { title: 'Expired' };

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        ghostCards.push(
          <div className="col-24  col-8-md  ph3  pv2  o-30">
            <CardMessage i={i} post={ghostItem} handleClick={null} />
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
              <div className="ph3">
                <div className="profile_heading">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text="Messages"
                    color="white"
                    size="medium"
                    truncate={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="pb4  mb2">
                  <p className="white  f6  lh-copy  measure-wide">
                    Our latest 3 newsletters on the Dominion.
                  </p>
                </div>
              </div>

              <div className="flex  flex-wrap  pb3">
                {[...Array(messagesLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-8-md  ph3  pv2">
                    <CardMessage
                      i={i}
                      post={messages?.length && messages[i]}
                      handleClick={apply}
                    />
                  </div>
                ))}

                {renderGhostCards()}
              </div>

              {messages?.length > 9 && (
                <div
                  className="flex  justify-center"
                  onClick={() => {
                    if (showAll || messages?.length <= 12) return;
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
                    disabled={showAll || messages?.length <= 12}
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
              {messages.length
                ? messages.map((item, i) => (
                    <div
                      key={i}
                      className={`
                    dominion-modal-wrapper
                    dominion-modal-wrapper--messages
                    ${modalActive === i ? 'dominion-modal-wrapper--active' : ''}
                  `}
                    >
                      <div className="absolute  top  left  ml3  ml4-md  nt3  bg-creations-black">
                        <Button
                          /* Options */
                          type="primary"
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
                      </div>

                      {modalActive === i && (
                        <>
                          {startProgress()}
                          <CarouselItemSection message={item} />
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
