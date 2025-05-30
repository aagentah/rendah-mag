import { trackPageView } from '~/lib/meta/conversions-api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, userId } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // @why: Track server-side PageView for better data when browser tracking is blocked
    const result = await trackPageView({
      url,
      userAgent: req.headers['user-agent'],
      clientIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userId,
    });

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error('PageView tracking failed:', result.error);
      return res.status(500).json({ error: 'Tracking failed' });
    }
  } catch (error) {
    console.error('Error in /api/meta/track-pageview:', error);
    return res.status(500).json({ error: error.message });
  }
}
