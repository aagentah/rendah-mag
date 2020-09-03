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
    const source = tinify.fromUrl(imageUrl);
    const resized = source.resize({ method: 'scale', width: size });
    const random500 = Math.floor(Math.random() * 501);
    const filePath = `tmp/optimized-${random500}-${size}.png`;

    // Compress image
    resized.toFile(filePath);

    // Get compressed image
    const buffer = fs.readFileSync(filePath);

    // Delete temp image
    fs.unlinkSync(filePath);

    // Send image
    res.send(buffer);
  } catch (error) {
    console.log('error', error.message);
    return res.status(400).send('Error updating user', error.msg);
  }
}
