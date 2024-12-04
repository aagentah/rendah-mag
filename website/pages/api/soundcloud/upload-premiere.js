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
    console.log('Getting new access token...');
    const response = await fetch('https://api.soundcloud.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SOUNDCLOUD_CLIENT_ID,
        client_secret: SOUNDCLOUD_CLIENT_SECRET,
      }).toString(),
    });

    const data = await response.json();
    console.log('Token response:', {
      access_token: data.access_token ? '[PRESENT]' : '[MISSING]',
      expires_in: data.expires_in,
      scope: data.scope,
    });

    if (!response.ok || !data.access_token) {
      console.error('Token error response:', data);
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

    if (!SOUNDCLOUD_CLIENT_ID || !SOUNDCLOUD_CLIENT_SECRET) {
      throw new Error('Missing SoundCloud credentials');
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

    // Get fresh access token for this request
    console.log('Requesting new access token...');
    const accessToken = await getAccessToken();
    console.log('Successfully obtained new access token');

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
    console.log('Upload headers:', {
      ...formData.getHeaders(),
      Authorization: 'Bearer [HIDDEN]',
      Accept: 'application/json',
    });

    const uploadResponse = await fetch('https://api.soundcloud.com/tracks', {
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        Authorization: `OAuth ${accessToken}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    let uploadData;
    try {
      const uploadResponseText = await uploadResponse.text();
      console.log('Upload response status:', uploadResponse.status);
      console.log('Raw upload response:', uploadResponseText);

      uploadData = JSON.parse(uploadResponseText);
    } catch (error) {
      console.error('Failed to parse upload response:', error);
      throw new Error('Invalid response from SoundCloud upload');
    }

    if (!uploadResponse.ok) {
      const errorDetail = uploadData.errors
        ? JSON.stringify(uploadData.errors)
        : uploadData.message || 'Unknown error';

      throw new Error(
        `Upload failed with status ${uploadResponse.status}: ${errorDetail}`
      );
    }

    console.log('Upload successful:', {
      id: uploadData.id,
      url: uploadData.permalink_url,
    });

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
