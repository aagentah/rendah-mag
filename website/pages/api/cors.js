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

    const { imageUrl, size } = req.body;
    const source = await tinify.fromUrl(imageUrl);
    const resized = await source.resize({ method: 'scale', width: size });

    // Compress image
    await resized.toFile(`tmp/optimized.png`);

    fs.readFile('tmp/optimized.png', function (err, file) {
      // Send image
      res.send(file);

      // Delete temp image
      try {
        fs.unlinkSync(`tmp/optimized.png`);
      } catch (error) {
        console.log('unlinkSync error:', error.message);
      }
    });
  } catch (error) {
    // Handle catch
    // console.error(error.message || error.toString());
    return res.status(500).json({ error: 'Error compressing image.' });
  }
}
