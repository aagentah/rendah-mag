import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';

export default async ({ session }) => {
  try {
    let email;

    const getEmail = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/stripe/get-customer`,
        {
          body: JSON.stringify({ stripeCustomerId: session.customer }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      // Error
      if (!response.ok) {
        throw new Error(await formatHttpError(response));
      }

      const customerRes = await response.json();
      const { customer } = customerRes;

      email = customer.email;
      return true;
    };

    const addMembertags = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
        {
          body: JSON.stringify({ email, tags }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      // Error
      if (!response.ok) {
        throw new Error(await formatHttpError(response));
      }
    };

    await getEmail();

    const userData = await findUserByUsername(email);
    const updatefields = { isDominion: false };
    const tags = [];

    tags.push({ name: 'Dominion Subscription', status: 'inactive' });

    await updateUserByUsername(null, userData, updatefields);
    await addMembertags();

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in snipcart/subscription-cancelled: ${
        error.message || error.toString()
      }`
    );

    return {
      error: `Error in snipcart/subscription-cancelled: ${
        error.message || error.toString()
      }`,
    };
  }
};
