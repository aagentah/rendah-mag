import fetch from 'node-fetch';
import Cors from 'cors';
import FormData from 'form-data';
import initMiddleware from '~/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS'],
  })
);

// Add your personal token here
const SOUNDCLOUD_ACCESS_TOKEN = process.env.SOUNDCLOUD_ACCESS_TOKEN;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;

const streamToBuffer = async (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

const handler = async (req, res) => {
  await cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { postId, audioFileAssetId, trackTitle, trackDescription } = req.body;

    console.log('Received request with:', {
      postId,
      audioFileAssetId,
      trackTitle,
      trackDescription,
    });

    if (!SOUNDCLOUD_ACCESS_TOKEN) {
      throw new Error('Missing SoundCloud access token');
    }

    if (!audioFileAssetId || !trackTitle) {
      return res.status(400).json({
        error: 'audioFileAssetId and trackTitle are required.',
      });
    }

    const assetParts = audioFileAssetId.split('-');
    if (assetParts.length < 3) {
      return res.status(400).json({
        error: 'Invalid audioFileAssetId format.',
      });
    }

    const assetId = assetParts[1];
    const assetExtension = assetParts[2];

    // First verify the token works by checking user profile
    console.log('Verifying SoundCloud token...');
    const verifyResponse = await fetch('https://api.soundcloud.com/me', {
      headers: {
        Authorization: `OAuth ${SOUNDCLOUD_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!verifyResponse.ok) {
      throw new Error('Invalid or expired SoundCloud token');
    }

    // Download audio from Sanity
    const audioUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${assetId}.${assetExtension}`;
    console.log('Fetching audio from:', audioUrl);

    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error(
        `Failed to fetch audio file. Status: ${audioResponse.status}`
      );
    }

    const audioBuffer = await streamToBuffer(audioResponse.body);
    console.log('Audio file downloaded successfully');

    // Prepare upload to SoundCloud
    const formData = new FormData();
    formData.append('track[title]', trackTitle);
    formData.append('track[description]', trackDescription || '');
    formData.append('track[sharing]', 'private');
    formData.append('track[downloadable]', 'false');
    formData.append('track[asset_data]', audioBuffer, {
      filename: `${trackTitle}.${assetExtension}`,
      contentType: `audio/${assetExtension}`,
    });

    // Upload to SoundCloud
    console.log('Starting SoundCloud upload...');
    const uploadResponse = await fetch('https://api.soundcloud.com/tracks', {
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        Authorization: `OAuth ${SOUNDCLOUD_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    const uploadResponseText = await uploadResponse.text();
    console.log('Upload response status:', uploadResponse.status);
    console.log('Raw upload response:', uploadResponseText);

    if (!uploadResponse.ok) {
      throw new Error(
        `Upload failed with status ${uploadResponse.status}: ${uploadResponseText}`
      );
    }

    const uploadData = JSON.parse(uploadResponseText);
    console.log('Upload successful:', uploadData);

    return res.status(200).json({
      soundcloudId: uploadData.id,
      permalink_url: uploadData.permalink_url,
    });
  } catch (error) {
    console.error('Error in upload-premiere:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default handler;
