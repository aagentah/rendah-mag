import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';

export default async (order) => {
  try {
    const { content } = order;
    const { user } = content;
    const { email } = user;

    const tags = [];

    tags.push({
      name: 'Dominion Subscription',
      status: 'inactive',
    });

    const addMembertags = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
        {
          body: JSON.stringify({ email: email, tags: tags }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      // Error
      if (!response.ok) {
        throw new Error(await formatHttpError(response));
      }
    };

    await addMembertags();
  } catch (error) {
    // Handle catch
    console.error(
      `Error in snipcart/subscription-cancelled: ${
        error.message || error.toString()
      }`
    );
    return false;
  }
};
