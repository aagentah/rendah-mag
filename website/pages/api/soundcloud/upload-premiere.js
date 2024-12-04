import fetch from 'node-fetch';
import Cors from 'cors';
import FormData from 'form-data';
import initMiddleware from '~/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS'],
  })
);

const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;

const getAccessToken = async () => {
  try {
    console.log('Starting auth request...');

    const credentials = Buffer.from(
      `${SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`
    ).toString('base64');

    const response = await fetch('https://secure.soundcloud.com/oauth2/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'upload',
      }).toString(),
    });

    console.log('Auth response status:', response.status);
    const data = await response.json();
    console.log('Auth response data:', data);

    if (!response.ok) {
      console.error('Auth Error Response:', data);
      throw new Error(
        data.error_description || data.error || 'Failed to get access token'
      );
    }

    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

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

    // Get access token
    const accessToken = await getAccessToken();
    console.log('Access token received');

    // Fetch audio file as stream
    const audioUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${assetId}.${assetExtension}`;
    console.log('Fetching audio from:', audioUrl);

    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error(
        `Failed to fetch audio file. Status: ${audioResponse.status}`
      );
    }

    // Stream to buffer
    const audioBuffer = await streamToBuffer(audioResponse.body);
    console.log('Audio file downloaded successfully');

    // Prepare form data
    const formData = new FormData();
    formData.append('track[title]', trackTitle);
    formData.append('track[description]', trackDescription || '');
    formData.append('track[sharing]', 'private');
    formData.append('track[downloadable]', 'false');
    formData.append('track[asset_data]', audioBuffer, {
      filename: `${trackTitle}.${assetExtension}`,
      contentType: `audio/${assetExtension}`,
    });

    // Upload to SoundCloud with timeout
    const uploadResponse = await Promise.race([
      fetch('https://api.soundcloud.com/tracks', {
        method: 'POST',
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
        timeout: 55000, // 55 second timeout
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Upload timeout')), 55000)
      ),
    ]);

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(
        uploadData.error_description || uploadData.error || 'Upload failed'
      );
    }

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
