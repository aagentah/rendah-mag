import { useEffect, useState } from 'react';

import Container from '~/components/layout/container';
import CardBlog from '~/components/card/post';

import { getAllPosts } from '~/lib/sanity/requests';

export default function GridPosts({ padding, marginTop, marginBottom }) {
  const [posts, setPosts] = useState(null);
  const [postsLength, setPostsLength] = useState(12);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await getAllPosts();
      setPostsLength(postsData.length);
      setPosts(postsData);
    };

    getPosts();
  }, []);

  return (
    <>
      {postsLength > 0 && (
        <Container>
          <section
            className={`grid  grid--posts  pv${padding}  mt${marginTop}  mb${marginBottom}`}
          >
            <div className="flex  flex-wrap">
              {[...Array(postsLength)].map((iteration, i) => (
                <div key={iteration} className="col-24  col-6-md">
                  <div className="pa3">
                    <CardBlog i={i} post={posts && posts[i]} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
