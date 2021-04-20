import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import some from 'lodash/some';
import BlockContent from '@sanity/block-content-to-react';
import { Heading, Copy } from 'next-pattern-library';

import CardCreations from '~/components/card/creations';

import { useUser } from '~/lib/hooks';
import { getAllCreationsTotal } from '~/lib/sanity/requests';

export default function ProfileCreations() {
  const [user, { loading, mutate, error }] = useUser();
  const [posts, setPosts] = useState([]);
  const [recomendedPosts, setRecomendedPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);

  // Fetch orders
  useEffect(() => {
    const action = async () => {
      const data = await getAllCreationsTotal();
      if (data) setPosts(data);
    };

    action();

    if (user?.isDominion && posts?.length) {
      let rP = [];
      let oP = [];

      posts.map((post) => {
        const tagMatchUser = post?.tags?.some((r) => user?.tags?.includes(r));
        return tagMatchUser ? rP.push(post) : oP.push(post);
      });

      setRecomendedPosts(rP);
      setOtherPosts(oP);
    }
  }, [posts?.length]);

  if (user?.isDominion && posts?.length) {
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

        {recomendedPosts?.length ? (
          <>
            <div className="pb3">
              <Heading
                /* Options */
                htmlEntity="h2"
                text="Recomended for you"
                color="black"
                size="small"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="flex  flex-wrap">
              {recomendedPosts.map((post, i) => (
                <div key={post.slug} className="col-24  col-8-md">
                  <div className="ph3  pv2">
                    <CardCreations i={i} post={post} columnCount={3} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {otherPosts?.length ? (
          <>
            {recomendedPosts?.length ? (
              <div className="pb3">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text="More"
                  color="black"
                  size="small"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
            ) : null}

            <div className="flex  flex-wrap">
              {otherPosts.map((post, i) => (
                <div key={post.slug} className="col-24  col-6-md">
                  <div className="ph3  pv2">
                    <CardCreations i={i} post={post} columnCount={4} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
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
