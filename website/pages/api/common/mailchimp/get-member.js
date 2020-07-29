import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailHashed = md5(email.toLowerCase());

  try {
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}`,
      {
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error:
          'There was an error subscribing to the newsletter. Try again later.',
      });
    }

    return res.status(200).json(await response.json());
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
