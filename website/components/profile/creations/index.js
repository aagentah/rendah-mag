import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import BlockContent from '@sanity/block-content-to-react';
import { Heading, Copy } from 'next-pattern-library';

import CardCreations from '~/components/card/creations';

import { useUser } from '~/lib/hooks';
import { getAllCreationsTotal } from '~/lib/sanity/requests';

export default function ProfileCreations() {
  const [user, { loading, mutate, error }] = useUser();
  const [posts, setPosts] = useState();

  // Fetch orders
  useEffect(() => {
    const action = async () => {
      const data = await getAllCreationsTotal();
      console.log('data', data);
      if (data) setPosts(data);
    };

    action();
  }, []);

  if (user?.isDominion && posts?.length) {
    return (
      <section>
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Creations."
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb4  mb2">
          <p className="black  f6  lh-copy">XXX</p>
        </div>

        <div className="flex  flex-wrap">
          {posts.map((post, i) => (
            <div key={post.slug} className="col-24  col-12-md">
              <div className="ph3  pv2">
                <CardCreations i={i} post={post} columnCount={2} />
              </div>
            </div>
          ))}
        </div>
      </section>
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
