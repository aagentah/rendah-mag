import fetch from 'node-fetch';
import Cors from 'cors';
import FormData from 'form-data';
import initMiddleware from '~/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS'],
  })
);

// SoundCloud API credentials
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;

// Updated to use new auth endpoint
const getAccessToken = async () => {
  //
  try {
    const response = await fetch('https://secure.soundcloud.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SOUNDCLOUD_CLIENT_ID,
        client_secret: SOUNDCLOUD_CLIENT_SECRET,
        scope: 'upload', // Add specific scope for upload permissions
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Auth Error Response:', data);
      throw new Error(
        data.error_description || data.error || 'Failed to get access token'
      );
    }

    const data = await response.json();
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

    // Add more detailed logging
    console.log('Received request with:', {
      postId,
      audioFileAssetId,
      trackTitle,
      trackDescription,
    });

    // Validate required fields
    if (!audioFileAssetId) {
      return res.status(400).json({ error: 'audioFileAssetId is required.' });
    }

    if (!trackTitle) {
      return res.status(400).json({ error: 'trackTitle is required.' });
    }

    // Validate audioFileAssetId format
    const assetParts = audioFileAssetId.split('-');
    if (assetParts.length < 3 || !assetParts[1] || !assetParts[2]) {
      return res.status(400).json({
        error:
          'Invalid audioFileAssetId format. Expected format: file-{assetId}-{extension}',
      });
    }

    const assetId = assetParts[1];
    const assetExtension = assetParts[2];

    // Get access token first
    console.log('Getting access token...');
    const accessToken = await getAccessToken();
    console.log('Access token received');

    // Download audio file from Sanity
    const audioUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${assetId}.${assetExtension}`;
    console.log('Fetching audio from:', audioUrl);

    const audioResponse = await fetch(audioUrl);

    if (!audioResponse.ok) {
      throw new Error(
        `Failed to download audio file from Sanity. Status: ${audioResponse.status}`
      );
    }

    // Ensure we have a valid buffer before proceeding
    const audioBuffer = await audioResponse.buffer();
    if (!Buffer.isBuffer(audioBuffer)) {
      throw new Error('Invalid audio buffer received from Sanity');
    }
    console.log('Audio file downloaded successfully');

    // Upload to SoundCloud
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
        Authorization: `Bearer ${accessToken}`, // Changed from OAuth to Bearer
      },
      body: formData,
    });

    // Log the full response for debugging
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

    // Return both the ID and the track URL
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
      sizeLimit: '250mb',
    },
  },
};

export default handler;
