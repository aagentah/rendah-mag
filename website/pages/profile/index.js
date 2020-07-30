import { useState, useEffect } from 'react';
import Router from 'next/router';

import { Tabs } from 'next-pattern-library';

import ProfileEdit from './profile-edit';
import ProfileCypher from './profile-cypher';
import Layout from '../../components/layout';
import Container from '../../components/layout/container';

import { useUser } from '../../lib/hooks';
import { getSiteConfig } from '../../lib/sanity/requests';

export default function Profile({ siteConfig }) {
  const [user, { loading, error }] = useUser();

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  return (
    <div className="bg-almost-white">
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
              {
                // <p>Your profile: {JSON.stringify(user)}</p>
              }
              <Tabs
                /* Options */
                content={[
                  { id: '1', tabTitle: 'Profile', tabContent: <ProfileEdit /> },
                  {
                    id: '2',
                    tabTitle: 'Cyphers',
                    tabContent: <ProfileCypher />,
                  },
                  { id: '3', tabTitle: 'Dominion', tabContent: '' },
                ]}
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
