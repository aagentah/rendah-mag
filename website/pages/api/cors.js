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
  try {
    // Run cors
    await cors(req, res);

    tinify.key = process.env.TINIFY_KEY;

    const { imageUrl, size, ref } = req.body;
    const source = tinify.fromUrl(imageUrl);
    const resized = source.resize({ method: 'scale', width: size });

    // Compress image
    resized.toFile(`tmp/optimized-${ref}.png`);

    // Get compressed image
    const buffer = fs.readFileSync(`tmp/optimized-${ref}.png`);

    // Delete temp image
    try {
      fs.unlinkSync(`tmp/optimized-${ref}.png`);
    } catch (error) {
      console.log('unlinkSync error:', error.message);
    }

    // Send image
    res.send(buffer);
  } catch (error) {
    console.log('handler error:', error.message);
    return res.status(400).send('Error updating user', error.msg);
  }
}
