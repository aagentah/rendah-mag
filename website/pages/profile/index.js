import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '~/components/layout';

import Link from 'next/link';
import NProgress from 'nprogress';
import { FaCog, FaBook } from 'react-icons/fa';
import zenscroll from 'zenscroll';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardMessage from '~/components/card/message';
import CardResource from '~/components/card/resource'; // Assuming you have a CardResource component

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getDominionItemsSince,
  getDominionResourcesSince,
} from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() =>
  import('~/components/profile/messages/carousel-item-section')
);
const Resource = dynamic(() =>
  import('~/components/profile/messages/resource')
);

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

const Modal = dynamic(() => import('~/components/modal'));

const ProfileEdit = dynamic(() => import('~/components/profile/edit'));

const ProfileBilling = dynamic(() => import('~/components/profile/billing'));

const ProfilePrints = dynamic(() => import('~/components/profile/prints'));

import { getSiteConfig } from '~/lib/sanity/requests';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_live_51DvkhrKb3SeE1fXfAwS5aNbDhvI4t4cCbHvsVjk5bfmBvSF5tc2mEYHAVIMQCgcXBsKjo5AvaT48k39sbx3UKUu400TFSGqiL4'
);

const ProfileDashboard = dynamic(() =>
  import('~/components/profile/dashboard')
);

const ProfileOfferings = dynamic(() =>
  import('~/components/profile/offerings')
);

const ProfileCreations = dynamic(() =>
  import('~/components/profile/creations')
);

const ProfileMessages = dynamic(() => import('~/components/profile/messages'));

const ProfilePacks = dynamic(() => import('~/components/profile/packs'));

const ProfileGallery = dynamic(() => import('~/components/profile/gallery'));

const IconHouse = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconHouse)
);

const IconUser = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconUser)
);

const IconEnvelope = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconEnvelope)
);

const IconHeadphones = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconHeadphones)
);

const IconAudio = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconAudio)
);

const IconNewspaper = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconNewspaper)
);

const IconList = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconList)
);

const IconMoney = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconMoney)
);

const IconStore = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconStore)
);

export default function Profile({ siteConfig }) {
  const [user, { loading, mutate, error }] = useUser();
  const [messages, setMessages] = useState([]);
  const [resources, setResources] = useState([]);
  const [articleActive, setArticleActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalPrintsActive, setModalPrintsActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [filter, setFilter] = useState('messages'); // 'messages', 'resources'
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const router = useRouter();
  const app = useApp();

  useEffect(() => {
    const { tab } = router.query;

    if (tab === 'messages' || tab === 'newsletters') {
      setFilter('messages');
    } else if (tab === 'resources') {
      setFilter('resources');
    }
  }, [router.query]);

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  useEffect(() => {
    zenscroll.setup(300, 15);
  }, []);

  // Define file type categories
  const fileTypeCategories = {
    audio: ['wav', 'mp3', 'flac', 'aac'],
    images: ['jpg', 'png', 'gif', 'svg'],
    videos: ['mp4', 'mkv', 'webm', 'avi'],
    all: [],
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === 'messages') return message.type === 'message';
    return false;
  });

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

  const apply = (id, slug, type) => {
    router.push(
      type === 'message'
        ? `/profile/newsletter/${slug}`
        : `/profile/resource/${slug}`
    );
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
      <Elements stripe={stripePromise}>
        <div className={`creations`}>
          <Layout
            title="profile"
            navOffset="top"
            navOnWhite={false}
            hasNav
            hasFooter
            darkMode
            meta={{
              siteConfig,
              title: 'Profile',
              description: null,
              image: null,
            }}
            preview={null}
          >
            <div className="pt4  pt0-md  pb4  pb0-md">
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
                                Welcome, {user?.name}. Here you can access all
                                exclusive content available on your Dominion
                                subscription. We add content here frequently,
                                month-to-month, make sure to keep an eye here
                                for cool stuff.
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap">
                            <div className="col-12 flex align-center justify-start white pb3">
                              <button
                                onClick={() =>
                                  router.push({
                                    pathname: router.pathname,
                                    query: { tab: 'newsletters' },
                                  })
                                }
                                className={`pv2 ph3 ba bc-white cp mr2 f7 ${
                                  filter === 'messages'
                                    ? 'bg-white almost-black'
                                    : 'white'
                                }`}
                              >
                                Newsletters
                              </button>

                              <button
                                onClick={() =>
                                  router.push({
                                    pathname: router.pathname,
                                    query: { tab: 'resources' },
                                  })
                                }
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
                              {/* <button
                                onClick={() => setFileTypeFilter('videos')}
                                className={`br-pill pv2 ph3 ba bc-white cp mr2 f7 ${
                                  fileTypeFilter === 'videos'
                                    ? 'bg-white almost-black'
                                    : 'white'
                                }`}
                              >
                                Videos
                              </button> */}
                            </div>
                          )}
                        </div>

                        {filter === 'messages' && (
                          <>
                            {filteredMessages.length ? (
                              <div className="flex flex-wrap pb5 pt2">
                                {filteredMessages.map((item, i) => (
                                  <div
                                    key={item._id}
                                    className="col-24 col-8-md pa2"
                                  >
                                    <CardMessage i={i} post={item} />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-wrap pb5 pt2">
                                {[...Array(9)].map((_, i) => (
                                  <div key={i} className="col-24 col-8-md pa2">
                                    <div
                                      className={`skeletonNew`}
                                      style={{
                                        height:
                                          app.deviceSize === 'md' ? 258 : 260,
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}

                        {filter === 'resources' && (
                          <>
                            {filteredResources.length ? (
                              <div className="flex flex-wrap pb5 pt2">
                                {filteredResources.map((item, i) => (
                                  <div key={item._id} className="col-24 pa2">
                                    <CardResource i={i} post={item} />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-wrap pb5 pt2">
                                {[...Array(6)].map((_, i) => (
                                  <div key={i} className="col-24 pa2">
                                    <div
                                      className={`skeletonNew`}
                                      style={{
                                        height:
                                          app.deviceSize === 'md' ? 290 : 110,
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
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
                                  <Resource
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
            </div>
          </Layout>
        </div>
      </Elements>
    );
  }
}

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
