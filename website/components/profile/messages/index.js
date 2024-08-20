import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import { FaCog, FaBook } from 'react-icons/fa';
import zenscroll from 'zenscroll';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardMessage from '~/components/card/message';
import CardResource from '~/components/card/resource'; // Assuming you have a CardResource component

import { useUser } from '~/lib/hooks';

import { getDominionItemsSince } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

const Modal = dynamic(() => import('~/components/modal'));

const ProfileEdit = dynamic(() => import('~/components/profile/edit'));

const ProfileBilling = dynamic(() => import('~/components/profile/billing'));

const ProfilePrints = dynamic(() => import('~/components/profile/prints'));

export default function ProfileDominion() {
  const [user] = useUser();
  const [messages, setMessages] = useState([]);
  const [messagesLength, setMessagesLength] = useState(9);
  const [articleActive, setArticleActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalPrintsActive, setModalPrintsActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [filter, setFilter] = useState('messages'); // 'messages', 'resources'
  const [fileTypeFilter, setFileTypeFilter] = useState('all');

  zenscroll.setup(300, 15);

  // Define file type categories
  const fileTypeCategories = {
    audio: ['wav', 'mp3', 'flac', 'aac'],
    images: ['jpg', 'png', 'gif', 'svg'],
    videos: ['mp4', 'mkv', 'webm', 'avi'],
    // documents: ['pdf', 'docx', 'xlsx', 'pptx'],
    all: [],
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === 'messages') return message.type === 'message';

    if (filter === 'resources') {
      // Extract the mime types from the attachments array
      const mimeTypes = message.attachments?.map(
        (attachment) => attachment.mimeType.split('/')[1]
      );

      if (fileTypeFilter === 'all') return message.type === 'resource';

      // Check if any of the mime types match the selected fileTypeFilter
      return (
        message.type === 'resource' &&
        mimeTypes?.some((mimeType) =>
          fileTypeCategories[fileTypeFilter]?.includes(mimeType)
        )
      );
    }
  });

  const apply = (i) => {
    setArticleActive(i);
    setCardsShow(false);

    NProgress.start();
    setTimeout(() => NProgress.done(), 300);

    setTimeout(() => {
      zenscroll.toY(0);
    }, 100);
  };

  const backButton = () => {
    setArticleActive(null);
    setCardsShow(true);

    setTimeout(() => {
      zenscroll.toY(0);
    }, 100);
  };

  if (user?.isDominion) {
    // Fetch messages
    useEffect(() => {
      const action = async () => {
        const data = await getDominionItemsSince(user);

        console.log('data', data);

        if (data) {
          setMessages(data);
          setMessagesLength(data?.length);
        }
      };

      action();
    }, []);

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
                  <div className="pb3 pb4-md tac mla mra">
                    <div className="pb4 mb4 bb bc-white tac mla mra">
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

                    <div className="pb4 mb4">
                      <p className="white  f6  lh-copy  measure-wide tac mla mra">
                        Welcome, {user?.name}. Here you can access all exclusive
                        content available on your Dominion subscription. We add
                        content here frequently, month-to-month, make sure to
                        keep an eye here for cool stuff.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="col-12 flex align-center justify-start white pb3">
                      <button
                        onClick={() => setFilter('messages')}
                        className={`pv2 ph3 ba bc-white cp mr2 f7 ${
                          filter === 'messages'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        Messages
                      </button>
                      <button
                        onClick={() => setFilter('resources')}
                        className={`pv2 ph3 ba bc-white cp mr2 f7 ${
                          filter === 'resources'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        Resources
                      </button>
                    </div>
                    <div className="col-12 flex align-center justify-end white pb4">
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Prints"
                        onClick={() => setModalPrintsActive(true)}
                        className="cp mr2 pr1"
                      >
                        <FaBook />
                      </div>

                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Profile & Settings"
                        onClick={() => setModalActive(true)}
                        className="cp"
                      >
                        <FaCog />
                      </div>

                      <Tooltip id="my-tooltip" />
                    </div>
                  </div>

                  {filter === 'resources' && (
                    <div className="col-12 flex align-center justify-start white pb3">
                      <button
                        onClick={() => setFileTypeFilter('all')}
                        className={`br-pill pv2 ph3 ba bc-white cp mr2 f7 ${
                          fileTypeFilter === 'all'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFileTypeFilter('audio')}
                        className={`br-pill pv2 ph3 ba bc-white cp mr2 f7 ${
                          fileTypeFilter === 'audio'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        Audio
                      </button>
                      <button
                        onClick={() => setFileTypeFilter('images')}
                        className={`br-pill pv2 ph3 ba bc-white cp mr2 f7 ${
                          fileTypeFilter === 'images'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        Images
                      </button>
                      <button
                        onClick={() => setFileTypeFilter('videos')}
                        className={`br-pill pv2 ph3 ba bc-white cp mr2 f7 ${
                          fileTypeFilter === 'videos'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        Videos
                      </button>
                      {/* <button
                        onClick={() => setFileTypeFilter('documents')}
                        className={`br-pill pv2 ph3 ba bc-white cp mr2 f7 ${
                          fileTypeFilter === 'documents'
                            ? 'bg-white almost-black'
                            : 'white'
                        }`}
                      >
                        Documents
                      </button> */}
                    </div>
                  )}
                </div>

                {filteredMessages.length && (
                  <div className="flex flex-wrap pb5 pt2">
                    {[...Array(filteredMessages.length)].map((_, i) => (
                      <>
                        {filter === 'messages' ? (
                          <div
                            key={filteredMessages[i]._id}
                            className="col-24 col-8-md pa2"
                          >
                            <CardMessage
                              i={i}
                              post={filteredMessages[i]}
                              handleClick={() => apply(filteredMessages[i]._id)}
                            />
                          </div>
                        ) : (
                          <div
                            key={filteredMessages[i]._id}
                            className="col-24 pa2"
                          >
                            <CardResource
                              i={i}
                              post={filteredMessages[i]}
                              handleClick={() => apply(filteredMessages[i]._id)}
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <section className="">
              {messages.length
                ? messages.map((item) => (
                    <div
                      key={item._id}
                      className={`
            dominion-modal-wrapper
            ${
              articleActive === item._id ? 'dominion-modal-wrapper--active' : ''
            }
          `}
                    >
                      {articleActive === item._id && (
                        <>
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
          <div className="z9 relative">
            <ProfileEdit />
          </div>
          <div className="z9 relative">
            <ProfileBilling />
          </div>
        </Modal>

        <Modal
          /* Options */
          size="large"
          active={modalPrintsActive}
          closeIcon={setModalPrintsActive}
        >
          <div className="pb4 z9 relative">
            <ProfilePrints />
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
