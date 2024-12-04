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
    console.log('Client ID length:', SOUNDCLOUD_CLIENT_ID?.length || 'missing');
    console.log(
      'Client Secret length:',
      SOUNDCLOUD_CLIENT_SECRET?.length || 'missing'
    );

    if (!SOUNDCLOUD_CLIENT_ID || !SOUNDCLOUD_CLIENT_SECRET) {
      throw new Error('Missing SoundCloud credentials');
    }

    // Method 1: Using URLSearchParams
    const response = await fetch('https://api.soundcloud.com/oauth2/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: SOUNDCLOUD_CLIENT_ID,
        client_secret: SOUNDCLOUD_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }).toString(),
    });

    // If Method 1 fails, try Method 2
    if (!response.ok) {
      console.log('First method failed, trying alternative...');

      const credentials = Buffer.from(
        `${SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`
      ).toString('base64');

      const altResponse = await fetch(
        'https://api.soundcloud.com/oauth2/token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${credentials}`,
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }).toString(),
        }
      );

      if (!altResponse.ok) {
        const altText = await altResponse.text();
        console.log('Alternative method failed. Response:', altText);
        throw new Error(
          `Auth failed with both methods. Status: ${altResponse.status}`
        );
      }

      const altData = await altResponse.json();
      return altData.access_token;
    }

    const data = await response.json();
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

    const accessToken = await getAccessToken();
    console.log('Access token received successfully');

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

    // Prepare multipart form data as per SoundCloud docs
    const formData = new FormData();
    formData.append('track[title]', trackTitle);
    formData.append('track[description]', trackDescription || '');
    formData.append('track[sharing]', 'private');
    formData.append('track[downloadable]', 'false');
    formData.append('track[asset_data]', audioBuffer, {
      filename: `${trackTitle}.${assetExtension}`,
      contentType: `audio/${assetExtension}`,
    });

    console.log('Starting SoundCloud upload...');
    const uploadResponse = await fetch('https://api.soundcloud.com/tracks', {
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json; charset=utf-8',
      },
      body: formData,
    });

    console.log('Upload response status:', uploadResponse.status);

    const uploadResponseText = await uploadResponse.text();
    console.log('Raw upload response:', uploadResponseText);

    let uploadData;
    try {
      uploadData = JSON.parse(uploadResponseText);
    } catch (e) {
      throw new Error('Invalid response from SoundCloud upload');
    }

    if (!uploadResponse.ok) {
      throw new Error(
        uploadData.error_description ||
          uploadData.message ||
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
