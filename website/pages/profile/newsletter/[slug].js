// pages/newsletter/[slug].js

import Router, { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { getSiteConfig, getDominionItemsSince } from '~/lib/sanity/requests';
import CarouselItemSection from '~/components/profile/messages/carousel-item-section';
import { useUser } from '~/lib/hooks';

import Layout from '~/components/layout';

export default function NewsletterPage({ siteConfig }) {
  const router = useRouter();
  const { slug } = router.query;
  const [message, setMessage] = useState(null);
  const [user, { loading, mutate, error }] = useUser();

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  useEffect(() => {
    if (user) {
      (async () => {
        const messages = await getDominionItemsSince(user);
        const foundMessage = messages.find((item) => item.slug === slug);
        setMessage(foundMessage);
      })();
    }
  }, [user, slug]);

  return message ? (
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
        <CarouselItemSection
          message={message}
          backButton={() => router.back()}
        />
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
