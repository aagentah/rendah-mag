import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import some from 'lodash/some';
import BlockContent from '@sanity/block-content-to-react';
import { Heading, Copy, Button } from 'next-pattern-library';

import CardCreations from '~/components/card/creations';

import { useUser } from '~/lib/hooks';
import { getAllCreationsTotal } from '~/lib/sanity/requests';

export default function ProfileCreations() {
  const [user, { loading, mutate, error }] = useUser();
  const [posts, setPosts] = useState([]);

  // Fetch posts
  useEffect(async () => {
    const action = async () => {
      const data = await getAllCreationsTotal();
      if (data) setPosts(data);
    };

    await action();
  }, [posts?.length]);

  if (user?.isDominion) {
    return (
      <section>
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Creations"
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb4  mb2">
          <p className="black  f6  lh-copy">
            Creations serves as our internal offering for additional exclusive
            content on the Dominion. The idea behind this is to share insights
            not only on music, but as a wider-appeal to the industry as a whole,
            including tutorials, technical interviews, branding tips, creative
            features, and much more!
          </p>
        </div>

        {posts?.length ? (
          <div className="flex  flex-wrap  pb3">
            {posts.map((post, i) => (
              <div key={post.slug} className="col-24  col-8-md">
                <div className="ph3  pv2">
                  <CardCreations i={i} post={post} columnCount={3} />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  if (!user?.isDominion) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You are not currently in the Dominion"
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Click here to join"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            invert={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/dominion',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                scroll: false,
              },
            }}
          />
        </div>
      </>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="No results."
      color="black"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
