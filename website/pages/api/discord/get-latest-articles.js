import Cors from 'cors';
import fetch from 'node-fetch';
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

const webhookURL =
  'https://discord.com/api/webhooks/1133720981471506442/6dt4oAAC-1I9B7_GF3kxx6LiJcFXniPqGbNZXxW9tNT2PgqNYi7DHmnksKH6aWXJTdib';

const getAuthorNames = (authors) => {
  let names = '';
  authors.forEach((e, i) => {
    console.log('author', e.author);
    names += e.author.name;
    if (i < authors.length - 1) {
      names += ' & ';
    }
  });
  return names;
};

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

        // Send post to Discord
        const content = `New post up from ${getAuthorNames(
          post.authors
        )}!\n\nhttps://rendahmag.com/article/${post.slug}`;

        await fetch(webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        })
          .then(async (response) => {
            if (response.ok) {
              // Update post only if the webhook request was successful
              await client
                .patch(post._id) // Document ID to patch
                .set({ hasPostedDiscord: true }) // Shallow merge
                .commit() // Perform the patch and return a promise
                .then((e) => {
                  console.log('Updated!');
                })
                .catch((err) => {
                  console.log('Error', err.message);
                });
            } else {
              console.log('Webhook request failed');
            }
          })
          .catch((error) => {
            console.log('Webhook request failed', error);
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
