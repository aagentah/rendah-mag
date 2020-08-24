import Cors from 'cors';
import tinify from 'tinify';

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

  tinify.key = '2hFnFm74VZHK9P5bq0P4r8kMdNY3qlP0';

  const { imageUrl } = req.body;
  const source = tinify.fromUrl(imageUrl);

  source.toFile('optimized.jpg');
  console.log('source', source);

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' });
}
