import fetch from 'node-fetch';
import Cors from 'cors';
import FormData from 'form-data';
import initMiddleware from '~/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS'],
  })
);

const SOUNDCLOUD_CLIENT_ID = 'LxAfZAJupWmW6RKjGCSHc9vJWBmPJ3ri';
const SOUNDCLOUD_CLIENT_SECRET = 'uWJviof4gBJQwQeY6q9IUyLnQcMspryl';

// Updated to use basic auth as per API docs
const getAccessToken = async () => {
  try {
    console.log('Starting auth request...');

    // Create base64 encoded credentials
    const credentials = Buffer.from(
      `${SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`
    ).toString('base64');

    const response = await fetch('https://secure.soundcloud.com/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    console.log('Auth response status:', response.status);
    const data = await response.json();

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

    if (!audioFileAssetId) {
      return res.status(400).json({ error: 'audioFileAssetId is required.' });
    }

    if (!trackTitle) {
      return res.status(400).json({ error: 'trackTitle is required.' });
    }

    const assetParts = audioFileAssetId.split('-');
    if (assetParts.length < 3 || !assetParts[1] || !assetParts[2]) {
      return res.status(400).json({
        error:
          'Invalid audioFileAssetId format. Expected format: file-{assetId}-{extension}',
      });
    }

    const assetId = assetParts[1];
    const assetExtension = assetParts[2];

    console.log('Getting access token...');
    const accessToken = await getAccessToken();
    console.log('Access token received');

    const audioUrl = `https://cdn.sanity.io/files/q8z2vf2k/production/${assetId}.${assetExtension}`;
    console.log('Fetching audio from:', audioUrl);

    const audioResponse = await fetch(audioUrl);

    if (!audioResponse.ok) {
      throw new Error(
        `Failed to download audio file from Sanity. Status: ${audioResponse.status}`
      );
    }

    const audioBuffer = await audioResponse.buffer();
    if (!Buffer.isBuffer(audioBuffer)) {
      throw new Error('Invalid audio buffer received from Sanity');
    }
    console.log('Audio file downloaded successfully');

    const formData = new FormData();
    formData.append('track[title]', trackTitle);
    formData.append('track[description]', trackDescription || '');
    formData.append('track[sharing]', 'private');
    formData.append('track[downloadable]', 'false');
    formData.append('track[asset_data]', audioBuffer, {
      filename: `${trackTitle}.${assetExtension}`,
      contentType: `audio/${assetExtension}`,
    });

    console.log('Uploading to SoundCloud...');

    const uploadResponse = await fetch('https://api.soundcloud.com/tracks', {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    console.log('SoundCloud Response Status:', uploadResponse.status);
    const uploadData = await uploadResponse.json();
    console.log('SoundCloud Response Data:', uploadData);

    if (!uploadResponse.ok) {
      console.error('SoundCloud upload error:', uploadData);
      throw new Error(
        uploadData.error_description ||
          uploadData.error ||
          uploadData.message ||
          'Upload failed.'
      );
    }

    return res.status(200).json({
      soundcloudId: uploadData.id,
      permalink_url: uploadData.permalink_url,
    });
  } catch (error) {
    console.error(`Error in api/uploadPremiere:`, error.message, error.stack);
    return res.status(500).json({
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default handler;
