import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const blob = req.body.blob;

  client.assets
    .upload('image', blob, {
      contentType: 'image/png',
      filename: 'someText.png',
    })
    .then((document) => {
      res.json({ message: `The image was uploaded!, ${document}` });
    })
    .catch((error) => {
      res.json({ message: `Upload failed:, ${error.message}` });
    });
}
