import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';
import cancelledEmail from '~/lib/emails/cancel-dominion-subscription';

export default async ({ email }) => {
  try {
    const userData = await findUserByUsername(email);
    const updatefields = { isDominion: false };
    const tags = [];

    tags.push({ name: 'Dominion Subscription', status: 'inactive' });

    const addMembertags = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
        {
          body: JSON.stringify({ email, tags }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
        }
      );

      // Error
      if (!response.ok) {
        throw new Error(await formatHttpError(response));
      }
    };

    await updateUserByUsername(null, userData, updatefields);
    await addMembertags();
    await cancelledEmail({ email });

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in stripe/subscription-cancelled: ${error.message ||
        error.toString()}`
    );

    return {
      error: `Error in stripe/subscription-cancelled: ${error.message ||
        error.toString()}`
    };
  }
};
