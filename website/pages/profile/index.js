// pages/profile.js
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

import Sections from '~/components/article/body-sections';
import BlockContent from '@sanity/block-content-to-react';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

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

const MapMembers = dynamic(() => import('~/components/map-members'));

import PaginationWrapper from '~/components/pagination';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Profile({ siteConfig }) {
  const [user, { loading, error }] = useUser();
  const [messages, setMessages] = useState([]);
  const [resources, setResources] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prints, setPrints] = useState([]);
  const [filter, setFilter] = useState('messages');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const router = useRouter();
  const app = useApp();

  useEffect(() => {
    const validTabs = [
      'messages',
      'resources',
      'articles',
      'profile',
      'prints',
      'map',
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

  useEffect(() => {
    if (user?.isDominion) {
      (async () => {
        const [msgs, res] = await Promise.all([
          getDominionItemsSince(user),
          getDominionResourcesSince(user),
        ]);
        if (msgs) setMessages(msgs);
        if (res) setResources(res);
      })();
    }
  }, [user]);

  useEffect(() => {
    if (user?.isDominion) {
      (async () => {
        const data = await getCategory('dominion-exclusive', [1, 10]);
        if (data?.posts) setArticles(data.posts);
      })();
    }
  }, [user]);

  useEffect(() => {
    if (user?.isDominion) {
      (async () => {
        const data = await getAllPrints();
        if (data) setPrints(data);
      })();
    }
  }, [user]);

  if (!user?.isDominion) return null;

  const safeArticles = articles || [];
  const filteredArticles = filter === 'articles' ? safeArticles : [];

  const openMessage = (index) => {
    setSelectedMessage(messages[index]);
  };

  const clearSelection = () => {
    setSelectedMessage(null);
  };

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
      <div className="grid grid-cols-12 pt-6">
        <div className="col-span-12">
          <section className="container">
            <div className="relative">
              <div className="flex justify-between items-center pb-12">
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
                    <span>Dashboard</span>
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
                    className={`text-left md:text-center col-span-12 py-2 px-4 border-l md:border-b md:border-t-0 md:border-r-0 md:border-l-0 border-neutral-300 cursor-not-allowed text-sm transition-colors duration-300 ${
                      filter === 'map'
                        ? 'bg-neutral-300 text-neutral-800'
                        : 'text-neutral-500'
                    }`}
                  >
                    <span>[Coming Soon]</span>
                  </button>
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
                <div className="flex flex-col lg:flex-row gap-x-12 gap-y-12">
                  <div className="flex flex-col gap-y-4 w-full lg:w-4/12 lg:border-r lg:border-neutral-700 lg:pr-12">
                    <h1 className="text-neutral-300">Member Dashboard</h1>
                    <p className="text-neutral-400 text-sm mb-4">
                      Here you can access all exclusive content available on
                      your membership.
                    </p>
                    <div className="md:col-span-4">
                      <Table
                        className="text-neutral-300"
                        rows={[
                          { left: 'User', right: user.name },
                          {
                            left: 'Email',
                            right: user.username,
                            rightClassName: 'break-all pl-6 text-right',
                          },
                          {
                            left: 'Discount 20%',
                            right: 'RNDH20',
                            rightClassName: 'bg-neutral-900 px-2',
                          },
                          { left: 'Next Print', right: 'March/April 2025' },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-8/12 flex flex-col gap-y-4">
                    {selectedMessage ? (
                      <div>
                        <div className="mb-6">
                          <Button
                            type="secondary"
                            size="small"
                            text="Back"
                            color="rendah-red"
                            fluid={false}
                            icon={<FontAwesomeIcon icon={faArrowLeft} />}
                            iconFloat="left"
                            inverted={true}
                            loading={false}
                            disabled={false}
                            skeleton={false}
                            onClick={clearSelection}
                            withLinkProps={null}
                          />
                        </div>
                        <h1 className="mb-4">{selectedMessage.title}</h1>

                        {selectedMessage?.subtitle && (
                          <h2>{selectedMessage.subtitle}</h2>
                        )}

                        <hr className="my-12 border border-neutral-700 opacity-25 md:opacity-50" />

                        <div className="rich-text rich-text-spacing text-sm">
                          <Sections
                            body={selectedMessage.description}
                            fullWidth={true}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-neutral-300">Latest newsletters</h2>

                        {messages.length ? (
                          <PaginationWrapper
                            limit={9}
                            containerClassName="grid grid-cols-1 md:grid-cols-3 gap-8"
                          >
                            {messages.map((msg, i) => (
                              <div key={msg._id}>
                                <CardMessage
                                  i={i}
                                  post={msg}
                                  handleClick={openMessage}
                                />
                              </div>
                            ))}
                          </PaginationWrapper>
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
                  </div>
                </div>
              )}

              {filter === 'resources' && <Blueprints />}
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
                <>
                  <div className="mb-12">
                    <Timeline />
                  </div>
                  <h2 className="text-lg mb-12 text-neutral-400">
                    Digital Print Downloads
                  </h2>
                  {prints?.length ? (
                    <PaginationWrapper
                      limit={9}
                      containerClassName="grid grid-cols-1 md:grid-cols-4 gap-8"
                    >
                      {prints.map((item, i) => (
                        <div key={item._id}>
                          <CardPrint i={i} post={item} handleClick={null} />
                        </div>
                      ))}
                    </PaginationWrapper>
                  ) : (
                    <div className="flex flex-wrap pb-5 pt-2">
                      {[...Array(9)].map((_, i) => (
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
              {filter === 'map' && <MapMembers />}
              {filter === 'profile' && <ProfileEdit />}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();
  return {
    props: { siteConfig },
  };
}
