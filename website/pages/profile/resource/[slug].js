// pages/resource/[slug].js

import Router, { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import {
  getSiteConfig,
  getDominionResourcesSince,
} from '~/lib/sanity/requests';
import Resource from '~/components/profile/messages/resource';
import { useUser } from '~/lib/hooks';
import Layout from '~/components/layout';

export default function ResourcePage({ siteConfig }) {
  const router = useRouter();
  const { slug } = router.query;
  const [resource, setResource] = useState(null);
  const [user, { loading, mutate, error }] = useUser();

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  useEffect(() => {
    if (user) {
      (async () => {
        const resources = await getDominionResourcesSince(user);
        const foundResource = resources.find((item) => item.slug === slug);
        setResource(foundResource);
      })();
    }
  }, [user, slug]);

  return resource ? (
    <div className="creations">
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
        <Resource message={resource} backButton={() => router.back()} />
      </Layout>
    </div>
  ) : null;
}

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
