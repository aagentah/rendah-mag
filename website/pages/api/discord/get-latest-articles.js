import Cors from 'cors';

import initMiddleware from '~/lib/init-middleware';
import { getAllPosts } from '~/lib/sanity/requests';
import client from '~/lib/sanity/config-write';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const handler = async (req, res) => {
  try {
    // Run cors
    await cors(req, res);

    const posts = await getAllPosts();
    const notPostedInDiscord = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      if (!post.hasPostedDiscord) {
        notPostedInDiscord.push(post);

        // Update post
        client
          .patch(post._id) // Document ID to patch
          .set({ hasPostedDiscord: true }) // Shallow merge
          .commit() // Perform the patch and return a promise
          .then((e) => {
            console.log('Updated!');
          })
          .catch((err) => {
            console.log('Error', err.message);
          });
      }
    }

    return res.send(notPostedInDiscord);
  } catch (error) {
    // Handle catch
    console.error(
      `Error in api/discord/get-latest-articles: ${
        error.message || error.toString()
      }`
    );

    return res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export default handler;
