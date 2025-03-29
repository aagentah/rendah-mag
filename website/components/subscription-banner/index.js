import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useUser } from '~/lib/hooks';
import { getAllPostsTotal, getAllProductsTotal } from '~/lib/sanity/requests';
import Table from '~/components/table';
import Button from '~/components/elements/button';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function SubscriptionBanner(props) {
  const [user] = useUser();
  const [postsCount, setPostsCount] = useState('~400');
  const [printsCount, setPrintsCount] = useState('11');
  const [loading, setLoading] = useState(true);
  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total posts count
        const posts = await getAllPostsTotal();
        if (posts && posts.length) {
          setPostsCount(posts.length.toString());
        }

        // Fetch products with "print" tag
        const products = await getAllProductsTotal();
        if (products && products.length) {
          const printProducts = products.filter(
            (product) =>
              product.category === 'Printed Issues' ||
              (product.tags && product.tags.includes('print'))
          );
          setPrintsCount(printProducts.length.toString());
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data for subscription banner:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-12 gap-y-12 mb-8">
        <div className="md:col-span-3 max-w-md">
          <p className="text-xs md:text-sm text-neutral-500 leading-relaxed text-left">
            <strong>
              <span className="text-neutral-400">Rendah Mag</span> / Mission
              Statement
            </strong>
            <br />
            <br />
          </p>
          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed text-left">
            This project exists to research the topic of creative context within
            underground & experimental arts. Through the lens of
            creative-journalism, we explore the life-cycle of artists and their
            projects, in an otherwise undocumented space.
          </p>

          {/* {!user && (
            <Link href="/membership" legacyBehavior>
              <a className="flex justify-start">
                <p className="flex flex-wrap items-center text-base text-red-600 leading-tight text-left cursor-pointer">
                  <span className="pr-2">
                    Explore{' '}
                    <span className="hidden md:inline">what we offer via</span>{' '}
                    our <span className="underline">Subscription</span>
                  </span>
                  <span>{buttonIconRed}</span>
                </p>
              </a>
            </Link>
          )} */}
        </div>

        <div className="md:col-span-1 flex flex-col justify-between gap-y-2">
          <Table
            rows={[
              {
                left: 'Established',
                right: '2018',
              },
              {
                left: 'Articles',
                right: loading ? 'N/A' : postsCount,
              },
              {
                left: 'Prints',
                right: loading ? 'N/A' : printsCount,
              },
              {
                left: 'Next Print',
                right: 'March/April 2025',
              },
              {
                left: 'Advertisements (ever)',
                right: '0',
              },
            ]}
          />
        </div>
      </div>

      {!user && (
        <div className="mb-12">
          <Button
            /* Options */
            type="secondary"
            size="small"
            text="Join Membership [includes latest print]"
            color="rendah-red"
            fluid={false}
            icon={buttonIconRed}
            iconFloat={null}
            inverted={true}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/membership',
              target: null,
              routerLink: null,
              routerLinkProps: null,
            }}
          />
        </div>
      )}
    </div>
  );
}
