import { useState, useEffect } from 'react';
import Link from 'next/link';

import filter from 'lodash/filter';
import cloneDeep from 'lodash/cloneDeep';
import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';

import CardCreations from '~/components/card/creations';

import { useUser } from '~/lib/hooks';
import { getAllCreationsTotal } from '~/lib/sanity/requests';

export default function ProfileCreations() {
  const [user, { loading, mutate, error }] = useUser();
  const [originalPosts, setOriginalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [postsLength, setPostsLength] = useState(9);

  // Fetch posts
  useEffect(async () => {
    const action = async () => {
      const data = await getAllCreationsTotal();
      if (data) {
        setPosts(data);
        setOriginalPosts(data);
        setPostsLength(data?.length);
      }
    };

    await action();
  }, []);

  // Fetch posts
  useEffect(() => {
    if (!filters?.length) {
      setPosts(originalPosts);
      setPostsLength(originalPosts?.length);
      return;
    }

    let postsClone = filter(originalPosts, obj => {
      for (let i = 0; i < filters.length; i++) {
        if (obj?.categories?.length && obj.categories.includes(filters[i])) {
          return true;
        }
      }
    });

    setPosts(postsClone);
    setPostsLength(postsClone?.length);
  }, [filters?.length]);

  const toggleFilter = filterString => {
    if (filters.includes(filterString)) {
      const cloneFilters = cloneDeep(filters);
      cloneFilters.splice(cloneFilters.indexOf(filterString), 1);
      setFilters(cloneFilters);
    } else {
      const cloneFilters = cloneDeep(filters);
      cloneFilters.push(filterString);
      setFilters(cloneFilters);
    }
  };

  if (user?.isDominion) {
    return (
      <section>
        <div className="profile_heading">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Creations"
            color="white"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb4  mb2">
          <p className="white  f6  lh-copy">
            'Creations' serves as our internal medium for additional exclusive
            content on the Dominion. The idea behind this is to share insights
            not only on music, but as a wider-appeal to the industry as a whole,
            including tutorials, technical interviews, branding tips, creative
            features, and much more!
          </p>
        </div>

        <div className="flex  flex-wrap  justify-center  justify-start-md  pb4  mb2">
          <span
            className={`filter-tag  ${
              filters.includes('tutorials') ? 'is-active' : ''
            }`}
            onClick={() => toggleFilter('tutorials')}
          >
            Tutorials
          </span>
          <span
            className={`filter-tag  ${
              filters.includes('interviews') ? 'is-active' : ''
            }`}
            onClick={() => toggleFilter('interviews')}
          >
            Interviews
          </span>
          <span
            className={`filter-tag  ${
              filters.includes('insights') ? 'is-active' : ''
            }`}
            onClick={() => toggleFilter('insights')}
          >
            Insights
          </span>
        </div>

        <div className="flex  flex-wrap  pb3">
          {[...Array(postsLength)].map((iteration, i) => (
            <div key={iteration} className="col-24  col-8-md">
              <div className="ph3  pv2">
                <CardCreations
                  i={i}
                  post={posts?.length && posts[i]}
                  columnCount={3}
                />
              </div>
            </div>
          ))}
        </div>
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
            color="white"
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
            color="white"
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={true}
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
                scroll: false
              }
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
      color="white"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
