import fs from 'fs';
import Cors from 'cors';
import tinify from 'tinify';

import { SITE_URL } from '../../constants';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  tinify.key = process.env.TINIFY_KEY;

  // const { imageUrl } = req.query;
  const { imageUrl } = req.body;
  const source = tinify.fromUrl(imageUrl);
  const resized = source.resize({
    method: 'scale',
    width: 10,
  });

  // Tinify image
  resized.toFile('/temp/optimized.jpg');

  const blob = await fetch(`${SITE_URL}/temp/optimized.jpg`)
    .then((response) => response.blob())
    .then((blob) => blob);

  console.log('imageUrl', imageUrl);
  console.log('blob', blob);

  res.json({ blob });
}