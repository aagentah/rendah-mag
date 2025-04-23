import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getSiteConfig, getDominionItemsSince } from '~/lib/sanity/requests';
import { useUser } from '~/lib/hooks';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Heading from '~/components/elements/heading';
import ImageNew from '~/components/elements/image-new';
import Button from '~/components/elements/button';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import Sections from '~/components/article/body-sections';

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

function NewsletterArticle({ message }) {
  const buttonIconArrowLeft = <IconArrowLeft color="rendah-red" size={16} />;
  return (
    <article className="pt-4 pb-4">
      <div className="container">
        <div className="mb-6">
          <Button
            type="secondary"
            size="small"
            text="Back to newsletters"
            color="rendah-red"
            fluid={false}
            icon={buttonIconArrowLeft}
            iconFloat="left"
            inverted={true}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            withLinkProps={{
              type: 'next',
              href: '/profile?tab=newsletters',
              target: null,
              routerLink: Link,
              routerLinkProps: null,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 items-start">
          <div className="md:col-span-2">
            <div className="mb-4 pb-2 max-w-xl">
              <h1 className="text-neutral-300 text-2xl">{message.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="rich-text text-neutral-300 text-base ">
        <Sections body={message.description} />
      </div>
    </article>
  );
}

export default function NewsletterPage({ siteConfig }) {
  const router = useRouter();
  const { slug } = router.query;
  const [message, setMessage] = useState(null);
  const [user, { loading, error }] = useUser();

  useEffect(() => {
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
    <div className="newsletter">
      <Layout
        navOffset="top"
        navOnWhite={false}
        hasNav
        hasFooter
        darkMode
        meta={{
          siteConfig,
          title: message.title,
          description: null,
          image: message?.imageObject || null,
        }}
        preview={null}
      >
        <NewsletterArticle message={message} />
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
