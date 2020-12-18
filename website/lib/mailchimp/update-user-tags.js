import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

export default async (tags, email) => {
  try {
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

    const addMembertags = await fetch(
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

    if (!addMembertags.ok) {
      // Error
      throw new Error(await addMembertags.json());
    }

    return true;
  } catch (error) {
    // Handle catch
    console.error(
      `Error in update-user-tags: ${error.message || error.toString()}`
    );
    return false;
  }
};
