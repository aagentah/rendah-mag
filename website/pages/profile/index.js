import { useState, useEffect } from 'react';
import Router from 'next/router';

import { Tabs } from 'next-pattern-library';

import ProfileEdit from './profile-edit';
import ProfileCypher from './profile-cypher';
import ProfileOrders from './profile-orders';
import Layout from '../../components/layout';
import Container from '../../components/layout/container';

import { useUser } from '../../lib/hooks';
import { getSiteConfig } from '../../lib/sanity/requests';

import { getCurrentAndPreviousCyphers } from '../../lib/sanity/requests';

export default function Profile({ siteConfig }) {
  const [user, { loading, error }] = useUser();
  const [cyphers, setCyphers] = useState(null);
  const [customerOrders, setCustomerOrders] = useState(null);

  const fetchCyphers = async () => {
    setCyphers(await getCurrentAndPreviousCyphers());
  };

  const getCustomerOrders = async () => {
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

  useEffect(() => {
    fetchCyphers();
  }, []);

  useEffect(() => {
    if (user) getCustomerOrders();
  }, [user]);

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  return (
    <div className="bg-white  bg-almost-white-md">
      <Layout
        navOffset="top"
        navOnWhite={true}
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
                  { id: '3', tabTitle: 'Dominion', tabContent: '' },
                  {
                    id: '4',
                    tabTitle: 'Orders',
                    tabContent: (
                      <ProfileOrders customerOrders={customerOrders} />
                    ),
                  },
                ]}
                defaultSelected={0}
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
