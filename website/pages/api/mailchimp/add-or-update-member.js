import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  try {
    const { email, data } = req.body;
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    // Add or update member
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    );

    // Error
    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }

    // Success
    if (res) return res.status(200).json({ error: '' });
    return true;
  } catch (error) {
    // Handle catch
    console.error('Error in api/mailchimp/add-or-update-member:', error);
    return res.status(500).json({ error: error });
  }
};
