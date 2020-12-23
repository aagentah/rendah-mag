import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';

export default async (req, res) => {
  try {
    const { data } = req.body;
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    // Add member to list
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    // Error
    if (!response.ok) {
      if ((await response.json()).title === 'Member Exists') {
        return res.status(400).json({ error: '' });
      } else {
        throw new Error(await formatHttpError(response));
      }
    }

    // Success
    return res.status(200).json({ error: '' });
    return true;
  } catch (error) {
    // Handle catch
    console.error('Error in api/mailchimp/add-member:', error);
    return res.status(500).json({ error: error });
  }
};
