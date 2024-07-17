import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import { FaPaperclip, FaCog } from 'react-icons/fa';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardMessage from '~/components/card/message';

import { useUser } from '~/lib/hooks';

import { getLastThreeDominionItems } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

const Modal = dynamic(() => import('~/components/modal'));

const ProfileEdit = dynamic(() => import('~/components/profile/edit'));

const ProfileBilling = dynamic(() => import('~/components/profile/billing'));

export default function ProfileDominion() {
  const [user, { loading, mutate, error }] = useUser();
  const [messages, setMessages] = useState([]);
  const [messagesLength, setMessagesLength] = useState(9);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const [articleActive, setArticleActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const [cardsShow, setCardsShow] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const startProgress = () => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 750);
  };

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;

  const apply = (i) => {
    setArticleActive(i);
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
    const count = 9 - messages?.length;
    const ghostCards = [];
    const ghostItem = { title: 'Expired' };

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        ghostCards.push(
          <div className="col-24  col-8-md  replaceph3pv2  o-30">
            <CardMessage i={i} post={ghostItem} handleClick={null} />
          </div>
        );
      }

      return ghostCards;
    }

    return false;
  };

  const backButton = () => {
    setArticleActive(null);
    setCardsShow(true);
  };

  if (user?.isDominion) {
    return (
      <>
        <section>
          <div className="relative">
            <div
              className={`
              dominion-cards
              ${cardsShow && 'dominion-cards--active'}
          `}
            >
              <div className="container mla mra">
                <div className="relative">
                  <div className="pb4 mb4 bb bc-white">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text="Dominion Dashboard"
                      color="white"
                      size="medium"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="pb4  mb2">
                    <p className="white  f6  lh-copy  measure-wide">
                      Hello {user?.name}, welcome. Here you can access all
                      exclusive content available on your subscription. We add
                      new content here frequently month-to-month, make sure to
                      keep an eye here for cool stuff.
                    </p>
                  </div>

                  <div
                    onClick={() => setModalActive(true)}
                    className="absolute top right white cp mr3"
                  >
                    <FaCog />
                  </div>
                </div>

                <div className="flex  flex-wrap  pb5">
                  {[...Array(messagesLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-8-md">
                      <CardMessage
                        i={i}
                        post={messages?.length && messages[i]}
                        handleClick={apply}
                      />
                    </div>
                  ))}

                  {renderGhostCards()}
                </div>
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

            <section className="">
              {messages.length
                ? messages.map((item, i) => (
                    <div
                      key={i}
                      className={`
                    dominion-modal-wrapper
                    ${
                      articleActive === i
                        ? 'dominion-modal-wrapper--active'
                        : ''
                    }
                  `}
                    >
                      {articleActive === i && (
                        <>
                          {startProgress()}
                          <CarouselItemSection
                            message={item}
                            backButton={backButton}
                          />
                        </>
                      )}
                    </div>
                  ))
                : ''}
            </section>
          </div>
        </section>

        <Modal
          /* Options */
          size="large"
          active={modalActive}
          closeIcon={setModalActive}
        >
          <div className="pb4 z9 relative">
            <ProfileEdit />
          </div>
          <div className="z9 relative">
            <ProfileBilling />
          </div>
        </Modal>
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
