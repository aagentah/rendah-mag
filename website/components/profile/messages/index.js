import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import { FaCog, FaBook } from 'react-icons/fa';
import zenscroll from 'zenscroll';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useRouter } from 'next/router';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardMessage from '~/components/card/message';
import CardResource from '~/components/card/resource'; // Assuming you have a CardResource component

import { useUser } from '~/lib/hooks';

import {
  getDominionItemsSince,
  getDominionResourcesSince,
} from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));
const Resource = dynamic(() => import('./resource'));

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
  const [resources, setResources] = useState([]);
  const [articleActive, setArticleActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalPrintsActive, setModalPrintsActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [filter, setFilter] = useState('messages'); // 'messages', 'resources'
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const router = useRouter();

  zenscroll.setup(300, 15);

  // const filteredMessages = messages.filter((message) => {
  //   if (filter === 'messages') return message.type === 'message';
  //   return false;
  // });

  const filteredResources = resources.filter((resource) => {
    if (filter === 'resources') {
      if (fileTypeFilter === 'all') return true;
      return resource.type === fileTypeFilter;
    }
    return false;
  });

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const articleId = urlParams.get('articleId');

      if (articleId) {
        setArticleActive(articleId);
        setCardsShow(false);
      } else {
        setArticleActive(null);
        setCardsShow(true);
      }
    };

    // Listen to popstate event
    window.addEventListener('popstate', handlePopState);

    // Call handlePopState once on mount to sync state with URL
    handlePopState();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Example apply function
  const apply = (id) => {
    setArticleActive(id);
    setCardsShow(false);

    // Use pushState to update the URL without reloading the page
    window.history.pushState(
      null,
      '', // Title (can be ignored)
      `${router.pathname}?articleId=${id}`
    );

    setTimeout(() => {
      zenscroll.toY(0);
    }, 100);
  };

  // Example backButton function
  const backButton = () => {
    setArticleActive(null);
    setCardsShow(true);

    // Update the URL to remove the query parameter
    window.history.pushState(null, '', router.pathname);

    setTimeout(() => {
      zenscroll.toY(0);
    }, 100);
  };

  if (user?.isDominion) {
    // Fetch messages and resources
    useEffect(() => {
      const fetchItems = async () => {
        const dataMessages = await getDominionItemsSince(user);
        const dataResources = await getDominionResourcesSince(user);

        console.log('dataResources', dataResources);

        if (dataMessages) {
          setMessages(dataMessages);
        }

        if (dataResources) {
          setResources(dataResources);
        }
      };

      fetchItems();
    }, [user]);

    console.log('resources', resources);

    return (
      <>
        <section>
          <div className="relative page--profile">
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
                        Newsletters
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
                    </div>
                  )}
                </div>

                {messages.length ? (
                  <div className="flex flex-wrap pb5 pt2">
                    {messages.map((item, i) => (
                      <div key={item._id} className="col-24 col-8-md pa2">
                        <CardMessage
                          i={i}
                          post={item}
                          handleClick={() => apply(item._id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                {filteredResources.length ? (
                  <div className="flex flex-wrap pb5 pt2">
                    {filteredResources.map((item, i) => (
                      <div key={item._id} className="col-24 pa2">
                        <CardResource
                          i={i}
                          post={item}
                          handleClick={() => apply(item._id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
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

            <section className="">
              {resources.length
                ? resources.map((item) => (
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
                          <Resource message={item} backButton={backButton} />
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
