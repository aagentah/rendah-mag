import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
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
import Table from '~/components/table';

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

const Blueprints = dynamic(() => import('~/components/blueprints'));

const Timeline = dynamic(() => import('~/components/timeline'));

// const stripePromise = loadStripe(
//   'pk_live_51DvkhrKb3SeE1fXfAwS5aNbDhvI4t4cCbHvsVjk5bfmBvSF5tc2mEYHAVIMQCgcXBsKjo5AvaT48k39sbx3UKUu400TFSGqiL4'
// );

export default function Profile({ siteConfig }) {
  const [user, { loading, error }] = useUser();
  const [messages, setMessages] = useState([]);
  const [resources, setResources] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prints, setPrints] = useState([]);
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

  const filteredArticles = filter === 'articles' ? safeArticles : [];

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const articleId = urlParams.get('articleId');
    };
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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

  if (user?.isDominion) {
    return (
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
          <div className="col-span-12 md:col-span-9 order-2 md:order-1 pt-6 md:pt-11 pb-4">
            <section className="container">
              <div className="relative">
                <div className="flex justify-between items-center pb-16">
                  <div className="grid grid-cols-12 md:flex">
                    <button
                      onClick={() =>
                        router.push({
                          pathname: router.pathname,
                          query: { tab: 'messages' },
                        })
                      }
                      className={`text-left md:text-center col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                        filter === 'messages'
                          ? 'bg-neutral-300 text-neutral-800'
                          : 'text-neutral-300'
                      }`}
                    >
                      <span>Newsletters</span>
                    </button>
                    <button
                      onClick={() =>
                        router.push({
                          pathname: router.pathname,
                          query: { tab: 'articles' },
                        })
                      }
                      className={`text-left md:text-center col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                        filter === 'articles'
                          ? 'bg-neutral-300 text-neutral-800'
                          : 'text-neutral-300'
                      }`}
                    >
                      <span>Articles</span>
                    </button>
                    <button
                      onClick={() =>
                        router.push({
                          pathname: router.pathname,
                          query: { tab: 'prints' },
                        })
                      }
                      className={`text-left md:text-center col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                        filter === 'prints'
                          ? 'bg-neutral-300 text-neutral-800'
                          : 'text-neutral-300'
                      }`}
                    >
                      <span>Prints</span>
                    </button>
                    <button
                      disabled
                      // onClick={() =>
                      //   router.push({
                      //     pathname: router.pathname,
                      //     query: { tab: 'resources' },
                      //   })
                      // }
                      className={`text-left md:text-center col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-not-allowed text-sm transition-colors duration-300 ${
                        filter === 'resources'
                          ? 'bg-neutral-300 text-neutral-800'
                          : 'text-neutral-300'
                      }`}
                    >
                      <span className="opacity-30">Assembly [WIP]</span>
                    </button>
                    {/* <button
                          disabled
                          // onClick={() =>
                          //   router.push({
                          //     pathname: router.pathname,
                          //     query: { tab: 'resources' },
                          //   })
                          // }
                          className={`text-left md:text-center col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-not-allowed text-sm transition-colors duration-300 ${
                            filter === 'resources'
                              ? 'bg-neutral-300 text-neutral-800'
                              : 'text-neutral-300'
                          }`}
                        >
                          <span className="opacity-30">Members [WIP]</span>
                        </button> */}
                    <button
                      onClick={() =>
                        router.push({
                          pathname: router.pathname,
                          query: { tab: 'profile' },
                        })
                      }
                      className={`col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-pointer text-sm transition-colors duration-300 ${
                        filter === 'profile'
                          ? 'bg-neutral-300 text-neutral-800'
                          : 'text-neutral-300'
                      }`}
                    >
                      <span>Profile & Settings</span>
                    </button>
                  </div>
                </div>
                {filter === 'messages' && (
                  <>
                    {messages.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {messages.map((item, i) => (
                          <div key={item._id}>
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
                    <Blueprints />
                  </>
                )}
                {filter === 'articles' && (
                  <>
                    {filteredArticles.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredArticles.map((item, i) => (
                          <div key={item._id} className="p-2">
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
                  <div className="md:p-4">
                    <Heading
                      htmlEntity="h2"
                      text="Prints"
                      color="neutral-800"
                      size="large"
                    />
                    {prints?.length ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {prints.map((item, i) => (
                          <div key={item._id}>
                            <CardPrint i={i} post={item} handleClick={null} />
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
          <div className="col-span-12 md:col-span-3 order-1 md:order-2 container py-12 text-sm border-l border-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 items-start">
              <div className="md:col-span-4 pb-6">
                <div className="max-w-md">
                  <h1 className="mb-4 text-neutral-300">Member Dashboard</h1>
                  <p className="text-neutral-400">
                    Here you can access all exclusive content available on your
                    membership.
                  </p>
                </div>
              </div>
              <div className="md:col-span-4">
                <Table
                  className="text-neutral-300"
                  rows={[
                    {
                      left: 'User',
                      right: user?.name,
                    },
                    {
                      left: 'Email',
                      right: user?.username,
                      rightClassName: 'break-all pl-6 text-right',
                    },
                    {
                      left: 'Discount 20%',
                      right: 'RNDH20',
                      rightClassName: 'bg-neutral-900 px-2',
                    },
                    {
                      left: 'Next Print',
                      right: 'March/April 2025',
                    },
                    // {
                    //   left: 'Dark Mode',
                    //   right: (
                    //     <>
                    //       <span>TRUE</span>/
                    //       <span className="opacity-50">FALSE</span>
                    //     </>
                    //   ),
                    // },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <Timeline />
      </Layout>
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
