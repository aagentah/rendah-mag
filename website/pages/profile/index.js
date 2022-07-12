import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import zenscroll from 'zenscroll';
import { Icon } from 'next-pattern-library';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Tabs from '~/components/tabs';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import { getSiteConfig } from '~/lib/sanity/requests';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_live_51DvkhrKb3SeE1fXfAwS5aNbDhvI4t4cCbHvsVjk5bfmBvSF5tc2mEYHAVIMQCgcXBsKjo5AvaT48k39sbx3UKUu400TFSGqiL4'
);

const ProfileDashboard = dynamic(() =>
  import('~/components/profile/dashboard')
);

const ProfileEdit = dynamic(() => import('~/components/profile/edit'));

const ProfileOfferings = dynamic(() =>
  import('~/components/profile/offerings')
);

const ProfileCreations = dynamic(() =>
  import('~/components/profile/creations')
);

const ProfilePacks = dynamic(() => import('~/components/profile/packs'));

const ProfileBilling = dynamic(() => import('~/components/profile/billing'));

export default function Profile({ siteConfig }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const router = useRouter();

  const [refreshDominion, setRefreshDominion] = useState(false);
  const [refreshOffering, setRefreshOffering] = useState(false);
  const [refreshPack, setRefreshPack] = useState(false);
  const [tabQuery, setTabQuery] = useState(router.query?.tab);

  const iconHouse = <Icon className="grey" icon={['fas', 'house']} />;
  const iconUser = <Icon className="grey" icon={['fas', 'user']} />;
  const iconEnvelope = <Icon className="grey" icon={['fas', 'envelope']} />;
  const iconMusic = <Icon className="grey" icon={['fas', 'music']} />;
  const iconPack = <Icon className="grey" icon={['fas', 'file-audio']} />;
  const iconNewspaper = <Icon className="grey" icon={['fas', 'newspaper']} />;
  const iconList = <Icon className="grey" icon={['fas', 'list']} />;
  const iconMoney = <Icon className="grey" icon={['fas', 'money-check']} />;

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  const handleToggle = (visibleTab, current) => {
    // Handles tab scroll on mobile
    if (app.deviceSize === 'md') {
      zenscroll.setup(300, 15);
      if (visibleTab) {
        zenscroll.to(current, 400);
      } else {
        zenscroll.toY(0);
      }
    }
  };

  const handleSelected = () => {
    if (tabQuery) {
      return tabQuery;
    }

    return app.deviceSize === 'md' ? null : 'dashboard';
  };

  if (user) {
    return (
      <Elements stripe={stripePromise}>
        <div className="creations">
          <Layout
            title="profile"
            navOffset="top"
            navOnWhite={false}
            hasNav
            hasFooter
            meta={{
              siteConfig,
              title: 'Profile',
              description: null,
              image: null
            }}
            preview={null}
          >
            <div className="pt4  pt0-md  pb4  pb0-md">
              <Container>
                {user && app.deviceSize && (
                  <div className="tabs-wrapper--profile  tabs-wrapper--side-bar">
                    <Tabs
                      /* Options */
                      content={[
                        {
                          id: 'dashboard',
                          tabTitle: 'Dashboard',
                          tabIcon: iconHouse,
                          tabContent: ProfileDashboard
                        },
                        {
                          id: 'offerings',
                          tabTitle: 'Dubplates',
                          tabIcon: iconMusic,
                          tabContent: ProfileOfferings
                        },
                        {
                          id: 'packs',
                          tabTitle: 'Samples',
                          tabIcon: iconPack,
                          tabContent: ProfilePacks
                        },

                        {
                          id: 'creations',
                          tabTitle: 'Creations',
                          tabIcon: iconNewspaper,
                          tabContent: ProfileCreations
                        },
                        // {
                        //   id: 'pipeline',
                        //   tabTitle: 'Pipeline',
                        //   tabIcon: iconList,
                        //   tabContent: <ProfilePipeline />,
                        // },
                        {
                          id: 'profile',
                          tabTitle: 'Profile',
                          tabIcon: iconUser,
                          tabContent: ProfileEdit
                        },
                        {
                          id: 'billing',
                          tabTitle: 'Billing',
                          tabIcon: iconMoney,
                          tabContent: ProfileBilling
                        }
                      ]}
                      defaultSelected={handleSelected}
                      onToggle={handleToggle}
                    />
                  </div>
                )}
              </Container>
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
    props: { siteConfig }
  };
}
