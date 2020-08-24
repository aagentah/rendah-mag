import fs from 'fs';
import Cors from 'cors';
import tinify from 'tinify';

import { SITE_URL } from '../../constants';
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

  // Tinify image
  tinify.key = process.env.TINIFY_KEY;

  // const { imageUrl } = req.query;
  const { imageUrl } = req.body;
  console.log('imageUrl', imageUrl);

  const source = tinify.fromUrl(imageUrl);

  const resized = source.resize({
    method: 'scale',
    width: 10,
  });

  resized.toFile('public/temp/optimized.jpg');

  const blob = await fetch(`${SITE_URL}/public/temp/optimized.jpg`)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return blob;
    });

  console.log('blob', blob);

  // Rest of the API logic
  res.json({ blob });
}
