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
    console.log(
      'Using client ID:',
      SOUNDCLOUD_CLIENT_ID ? 'Present' : 'Missing'
    );
    console.log(
      'Using client secret:',
      SOUNDCLOUD_CLIENT_SECRET ? 'Present' : 'Missing'
    );

    // Create form data for token request - removed scope parameter
    const formData = new URLSearchParams();
    formData.append('client_id', SOUNDCLOUD_CLIENT_ID);
    formData.append('client_secret', SOUNDCLOUD_CLIENT_SECRET);
    formData.append('grant_type', 'client_credentials');

    // Log the request body for debugging (excluding sensitive info)
    console.log(
      'Request body:',
      formData
        .toString()
        .replace(/(client_id|client_secret)=[^&]+/g, '$1=[HIDDEN]')
    );

    const response = await fetch('https://api.soundcloud.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formData.toString(),
    });

    console.log('Auth response status:', response.status);

    // Log the raw response for debugging
    const rawText = await response.text();
    console.log('Raw response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      throw new Error(
        `Invalid JSON response from SoundCloud: ${rawText.substring(0, 200)}`
      );
    }

    if (!response.ok) {
      const errorMessage =
        data.error_description ||
        data.message ||
        data.error ||
        `Authentication failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    if (!data.access_token) {
      throw new Error('No access token received from SoundCloud');
    }

    console.log('Successfully received access token');
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error(`Authentication failed: ${error.message}`);
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

    // Validate environment variables
    if (!SOUNDCLOUD_CLIENT_ID || !SOUNDCLOUD_CLIENT_SECRET) {
      throw new Error(
        'Missing SoundCloud credentials in environment variables'
      );
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

    // Get access token
    console.log('Requesting access token...');
    const accessToken = await getAccessToken();
    console.log('Access token received successfully');

    // Fetch audio file
    const audioUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${assetId}.${assetExtension}`;
    console.log('Fetching audio from:', audioUrl);

    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error(
        `Failed to fetch audio file. Status: ${audioResponse.status}`
      );
    }

    // Convert stream to buffer
    const audioBuffer = await streamToBuffer(audioResponse.body);
    console.log('Audio file downloaded successfully');

    // Prepare form data for upload
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
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    console.log('Upload response status:', uploadResponse.status);

    // Log raw upload response for debugging
    const uploadResponseText = await uploadResponse.text();
    console.log('Raw upload response:', uploadResponseText);

    let uploadData;
    try {
      uploadData = JSON.parse(uploadResponseText);
    } catch (e) {
      console.error('Failed to parse upload response:', e);
      throw new Error('Invalid response from SoundCloud upload');
    }

    if (!uploadResponse.ok) {
      throw new Error(
        uploadData.error_description ||
          uploadData.error ||
          `Upload failed with status ${uploadResponse.status}`
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
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
