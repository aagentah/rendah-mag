import { useState, useEffect } from 'react';
import Router from 'next/router';

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
  getSubscriptionItemsSinceDate,
} from '../../lib/sanity/requests';

export default function Profile({ siteConfig }) {
  const [user, { loading, mutate, error }] = useUser();
  const [cyphers, setCyphers] = useState(null);
  const [customerOrders, setCustomerOrders] = useState(null);
  const [subscriptionItems, setSubscriptionItems] = useState(null);

  const fetchCyphers = async () => {
    setCyphers(await getCurrentAndPreviousCyphers());
  };

  const fetchSubscriptionItems = async () => {
    let sinceStartOfMonth = user?.dominionSince.split('T')[0];
    sinceStartOfMonth = setCharAt(sinceStartOfMonth, 8, '0');
    sinceStartOfMonth = setCharAt(sinceStartOfMonth, 9, '1');

    setSubscriptionItems(
      await getSubscriptionItemsSinceDate(sinceStartOfMonth)
    );
  };

  const fetchCustomerOrders = async () => {
    const res = await fetch('/api/common/snipcart/get-customer', {
      body: JSON.stringify({
        email: user.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (res.status === 200) {
      setCustomerOrders(await res.json());
    } else {
      setCustomerOrders([]);
    }
  };

  async function setUserIsDominion(dominionStartDate) {
    const body = {
      isDominion: true,
      dominionSince: dominionStartDate.split('T')[0],
    };

    const res = await fetch('../api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const updatedUser = await res.json();
      mutate(updatedUser);
    }
  }

  // Fetch Cyphers
  useEffect(() => {
    fetchCyphers();
  }, []);

  // Fetch orders
  useEffect(() => {
    if (user) fetchCustomerOrders();
    if (user?.isDominion) fetchSubscriptionItems();
  }, [user]);

  // Fetch subscription items and check if is dominion subscription
  useEffect(() => {
    if (user?.isDominion) return;

    if (user && customerOrders?.length) {
      for (let i = 0; i < customerOrders.length; i++) {
        const order = customerOrders[i];
        const orderItems = order.items;

        if (!orderItems.length) continue;

        for (let ii = 0; ii < orderItems.length; ii++) {
          const item = orderItems[ii];

          if (item.id === 'dominion-subscription') {
            const dominionStartDate = item.addedOn;
            setUserIsDominion(dominionStartDate);
          }
        }
      }
    }
  }, [customerOrders]);

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
            <>
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
                      <ProfileDominion subscriptionItems={subscriptionItems} />
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
            </>
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
