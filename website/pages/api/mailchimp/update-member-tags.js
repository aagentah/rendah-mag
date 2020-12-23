import md5 from 'js-md5';

export default async (req, res) => {
  try {
    const { email, tags } = req.body;
    const emailHashed = md5(email.toLowerCase());
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    // Add tags
    const tagsData = {
      tags: [],
    };

    for (let i = 0; i < tags.length; i += 1) {
      const tag = tags[i];

      tagsData.tags.push({
        name: tag.label,
        status: tag.status ? 'active' : 'inactive',
      });
    }

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}/tags`,
      {
        body: JSON.stringify(tagsData),
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    const test = await response.json();
    console.log('test', test);

    if (!response.ok) {
      // Error
      //
      throw new Error(await response.json());
    }

    // Success
    if (res) return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error(
      'Error in api/mailchimp/update-member-tags:',
      JSON.stringify(error)
    );

    if (res) return res.status(500).json({ error: error.message });
    return false;
  }
};
