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
import CardResource from '~/components/card/resource';
import CardBlog from '~/components/card/blog';
import CardPrint from '~/components/card/print';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getDominionItemsSince,
  getDominionResourcesSince,
  getCategory,
  getAllPrints,
  getSiteConfig,
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

const ProfileEdit = dynamic(() => import('~/components/profile/edit'));
const ProfileBilling = dynamic(() => import('~/components/profile/billing'));
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

const stripePromise = loadStripe(
  'pk_live_51DvkhrKb3SeE1fXfAwS5aNbDhvI4t4cCbHvsVjk5bfmBvSF5tc2mEYHAVIMQCgcXBsKjo5AvaT48k39sbx3UKUu400TFSGqiL4'
);

export default function Profile({ siteConfig }) {
  const [user, { loading, error }] = useUser();
  const [messages, setMessages] = useState([]);
  const [resources, setResources] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prints, setPrints] = useState([]);
  const [articleActive, setArticleActive] = useState(null);
  const [cardsShow, setCardsShow] = useState(true);
  const [filter, setFilter] = useState('messages');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const router = useRouter();
  const app = useApp();

  useEffect(() => {
    const validTabs = [
      'messages',
      'resources',
      'articles',
      'profile',
      'prints',
    ];
    const { tab } = router.query;
    setFilter(validTabs.includes(tab) ? tab : 'messages');
  }, [router.query]);

  useEffect(() => {
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  useEffect(() => {
    zenscroll.setup(300, 15);
  }, []);

  const safeArticles = articles || [];
  const safeResources = resources || [];

  const filteredResources = safeResources.filter((resource) => {
    if (filter === 'resources') {
      if (fileTypeFilter === 'all') return true;
      return resource.type === fileTypeFilter;
    }
    return false;
  });

  const filteredArticles = filter === 'articles' ? safeArticles : [];

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
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const backButton = () => {
    setArticleActive(null);
    setCardsShow(true);
    window.history.pushState(null, '', router.pathname);
    setTimeout(() => {
      zenscroll.toY(0);
    }, 100);
  };

  useEffect(() => {
    if (user?.isDominion) {
      const fetchItems = async () => {
        const dataMessages = await getDominionItemsSince(user);
        const dataResources = await getDominionResourcesSince(user);
        if (dataMessages) {
          setMessages(dataMessages);
        }
        if (dataResources) {
          setResources(dataResources);
        }
      };
      fetchItems();
    }
  }, [user]);

  useEffect(() => {
    if (user?.isDominion) {
      const fetchArticles = async () => {
        const dataArticles = await getCategory('dominion-exclusive', [1, 10]);
        if (dataArticles?.posts) {
          setArticles(dataArticles.posts);
        }
      };
      fetchArticles();
    }
  }, [user]);

  useEffect(() => {
    if (user?.isDominion) {
      const fetchPrints = async () => {
        const data = await getAllPrints();
        if (data) {
          setPrints(data);
        }
      };
      fetchPrints();
    }
  }, [user]);

  const renderDetailOverlay = () => {
    const messageItem = messages.find((item) => item._id === articleActive);
    const resourceItem = resources.find((item) => item._id === articleActive);
    const articleItem = safeArticles.find((item) => item._id === articleActive);
    if (!articleActive) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50">
        {messageItem ? (
          <CarouselItemSection message={messageItem} backButton={backButton} />
        ) : resourceItem ? (
          <Resource message={resourceItem} backButton={backButton} />
        ) : articleItem ? (
          <CardBlog post={articleItem} target="_blank" />
        ) : null}
      </div>
    );
  };

  if (user?.isDominion) {
    return (
      <Elements stripe={stripePromise}>
        <div>
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
            <div className="grid grid-cols-12">
              <div className="col-span-9 pt-11 pb-4">
                <section className="container">
                  <div className="relative">
                    <div className="flex justify-between items-center pb-16">
                      <div className="flex">
                        <button
                          onClick={() =>
                            router.push({
                              pathname: router.pathname,
                              query: { tab: 'messages' },
                            })
                          }
                          className={`py-2 px-4 border-b border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                            filter === 'messages'
                              ? 'bg-neutral-300 text-neutral-800'
                              : 'text-neutral-300'
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
                          className={`py-2 px-4 border-b border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                            filter === 'resources'
                              ? 'bg-neutral-300 text-neutral-800'
                              : 'text-neutral-300'
                          }`}
                        >
                          Exclusive Resources
                        </button>
                        <button
                          onClick={() =>
                            router.push({
                              pathname: router.pathname,
                              query: { tab: 'articles' },
                            })
                          }
                          className={`py-2 px-4 border-b border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                            filter === 'articles'
                              ? 'bg-neutral-300 text-neutral-800'
                              : 'text-neutral-300'
                          }`}
                        >
                          Articles
                        </button>
                        <button
                          onClick={() =>
                            router.push({
                              pathname: router.pathname,
                              query: { tab: 'prints' },
                            })
                          }
                          className={`py-2 px-4 border-b border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                            filter === 'prints'
                              ? 'bg-neutral-300 text-neutral-800'
                              : 'text-neutral-300'
                          }`}
                        >
                          Prints
                        </button>
                        <button
                          onClick={() =>
                            router.push({
                              pathname: router.pathname,
                              query: { tab: 'profile' },
                            })
                          }
                          className={`py-2 px-4 border-b border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                            filter === 'profile'
                              ? 'bg-neutral-300 text-neutral-800'
                              : 'text-neutral-300'
                          }`}
                        >
                          Profile & Settings
                        </button>
                      </div>
                    </div>
                    {filter === 'messages' && (
                      <>
                        {messages.length ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {messages.map((item, i) => (
                              <div
                                key={item._id}
                                onClick={() => setArticleActive(item._id)}
                              >
                                <CardMessage i={i} post={item} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap pb-5 pt-2">
                            {[...Array(9)].map((_, i) => (
                              <div key={i} className="w-full md:w-1/3">
                                <div
                                  className="skeletonNew"
                                  style={{
                                    height: app.deviceSize === 'md' ? 258 : 260,
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
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filteredResources.map((item, i) => (
                              <div
                                key={item._id}
                                onClick={() => setArticleActive(item._id)}
                              >
                                <CardResource i={i} post={item} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap pb-5 pt-2">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="w-full p-2">
                                <div
                                  className="skeletonNew"
                                  style={{
                                    height: app.deviceSize === 'md' ? 290 : 110,
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {filter === 'articles' && (
                      <>
                        {filteredArticles.length ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filteredArticles.map((item, i) => (
                              <div
                                key={item._id}
                                onClick={() => setArticleActive(item._id)}
                                className="p-2"
                              >
                                <CardBlog post={item} target="_blank" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap pb-5 pt-2">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="w-full p-2">
                                <div
                                  className="skeletonNew"
                                  style={{ height: 290 }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {filter === 'prints' && (
                      <div className="p-4">
                        <Heading
                          htmlEntity="h2"
                          text="Prints"
                          color="neutral-800"
                          size="large"
                        />
                        {prints?.length ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {prints.map((item, i) => (
                              <div
                                key={item._id}
                                onClick={() => setArticleActive(item._id)}
                              >
                                <CardPrint
                                  i={i}
                                  post={item}
                                  handleClick={null}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap pb-5 pt-2">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="w-full p-2">
                                <div
                                  className="skeletonNew"
                                  style={{ height: 290 }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {filter === 'profile' && <ProfileEdit />}
                  </div>
                </section>
              </div>
              <div className="col-span-3 container py-12 text-sm border-l border-neutral-700">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-4 pb-6">
                    <div className="max-w-md">
                      <h1 className="mb-4 text-neutral-300">
                        Members dashboard
                      </h1>
                      <p className="text-neutral-400">
                        Here you can access all exclusive content available on
                        your Dominion subscription. We add content here
                        frequently—so keep an eye out for cool stuff.
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-4 grid gap-y-2 text-neutral-300">
                    <p className="flex justify-between border-b border-neutral-700 pb-1">
                      <strong>User</strong>
                      <span>{user?.name}</span>
                    </p>
                    <p className="flex justify-between border-b border-neutral-700 pb-1">
                      <strong>Email</strong>
                      <span className="break-all pl-6 text-right">
                        {user?.username}
                      </span>
                    </p>
                    <p className="flex justify-between border-b border-neutral-700 pb-1">
                      <strong>Discount 20%</strong>
                      <span>X1A25</span>
                    </p>
                    <p className="flex justify-between border-b border-neutral-700 pb-1">
                      <strong>Next Print</strong>
                      <span>June/May 2024</span>
                    </p>
                    <p className="flex justify-between border-b border-neutral-700 pb-1">
                      <strong>Dark Mode</strong>
                      <span>
                        <span>TRUE</span>/
                        <span className="opacity-50">FALSE</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {renderDetailOverlay()}
          </Layout>
        </div>
      </Elements>
    );
  }

  return null;
}

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();
  return {
    props: { siteConfig },
  };
}
