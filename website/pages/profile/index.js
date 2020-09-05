import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { Tabs } from 'next-pattern-library';

import ProfileEdit from './profile-edit';
import ProfileCypher from './profile-cypher';
import ProfileOrders from './profile-orders';
import ProfileDominion from './profile-dominion';
import Layout from '../../components/layout';
import Container from '../../components/layout/container';

import { useUser } from '../../lib/hooks';
import setCharAt from '../../functions/setCharAt';

import {
  getSiteConfig,
  getCurrentAndPreviousCyphers,
  getDominionItemsSinceDate,
} from '../../lib/sanity/requests';

export default function Profile({ siteConfig }) {
  const { addToast } = useToasts();
  const [user, { loading, mutate, error }] = useUser();
  const [cyphers, setCyphers] = useState(null);
  const [customerOrders, setCustomerOrders] = useState(null);
  const [dominionItems, setDominionItems] = useState(null);

  const fetchCyphers = async () => {
    setCyphers(await getCurrentAndPreviousCyphers());
  };

  // Fetch Cyphers
  useEffect(() => {
    fetchCyphers();
  }, []);

  // Fetch orders
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      // Fetch orders
      const response = await fetch('/api/common/snipcart/get-customer', {
        body: JSON.stringify({ email: user.username }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (response.ok) {
        // Success
        setCustomerOrders(await response.json());
      } else {
        // Error
        addToast(await response.json().error, {
          appearance: 'error',
          autoDismiss: true,
        });
        setCustomerOrders([]);
      }
    };

    const fetchDominionItems = async () => {
      let sinceStartOfMonth = user?.dominionSince.split('T')[0];
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 8, '0');
      sinceStartOfMonth = setCharAt(sinceStartOfMonth, 9, '1');

      setDominionItems(await getDominionItemsSinceDate(sinceStartOfMonth));
    };

    if (user) fetchCustomerOrders();
    if (user?.isDominion) fetchDominionItems();
  }, [user, addToast]);

  // Fetch subscription items and check if is dominion subscription
  useEffect(() => {
    if (user?.isDominion) return;

    // Set the user to Dominion in CMS
    async function setUserIsDominion(dominionStartDate) {
      const body = {
        isDominion: true,
        dominionSince: dominionStartDate.split('T')[0],
      };

      // Put to user API
      const response = await fetch('../api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Success
        mutate(await response.json());
      } else {
        // Error
        addToast(
          'There was an issue adding you to the Dominion, please contact support right away.',
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );
      }
    }

    if (user && customerOrders?.length) {
      for (let i = 0; i < customerOrders.length; i += 1) {
        const order = customerOrders[i];
        const orderItems = order.items;

        if (orderItems.length) {
          for (let ii = 0; ii < orderItems.length; ii += 1) {
            const item = orderItems[ii];

            if (item.id === 'dominion-subscription') {
              const dominionStartDate = item.addedOn;
              setUserIsDominion(dominionStartDate);
            }
          }
        }
      }
    }
  }, [user, customerOrders, addToast, mutate]);

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  return (
    <div className="bg-white  bg-almost-white-md">
      <Layout
        navOffset="top"
        navOnWhite
        meta={{
          siteConfig,
          title: 'Profile',
          description: 'This is the Profile page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          {user && (
            <div className="tabs-wrapper--side-bar">
              <Tabs
                /* Options */
                content={[
                  {
                    id: '1',
                    tabTitle: 'Profile',
                    tabContent: <ProfileEdit customerOrders={customerOrders} />,
                  },
                  {
                    id: '2',
                    tabTitle: 'Cyphers',
                    tabContent: <ProfileCypher cyphers={cyphers} />,
                  },
                  {
                    id: '3',
                    tabTitle: 'Dominion',
                    tabContent: (
                      <ProfileDominion
                        dominionItems={dominionItems}
                        user={user}
                      />
                    ),
                  },
                  {
                    id: '4',
                    tabTitle: 'Orders',
                    tabContent: (
                      <ProfileOrders customerOrders={customerOrders} />
                    ),
                  },
                ]}
                defaultSelected="1"
              />
            </div>
          )}
        </Container>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
