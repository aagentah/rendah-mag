import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  try {
    const { email } = req.body;
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    const data = {
      email_address: email,
      status: 'subscribed',
    };

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

    // Get response's JSON
    const json = await response.json();

    if (response.ok) {
      // Success
      return res.status(200).json(json);
    } else {
      // Error
      throw new Error('');
    }
  } catch (error) {
    // Handle catch
    // console.error(error.message || error.toString());
    return res.status(500).json({ error: 'There was an issue subscribing.' });
  }
};
