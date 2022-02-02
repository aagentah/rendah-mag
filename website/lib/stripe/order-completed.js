import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import formatHttpError from '~/functions/formatHttpError';
import orderEmail from '~/lib/emails/order-notification';

export default async ({ session }) => {
  try {
    const { customer_details, mode } = session;
    const { email } = customer_details;
    const { shipping } = session;
    const { name } = shipping;
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    const addUpdateMailchimpUser = async () => {
      const data = {
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      };

      const addOrUpdateMember = async () => {
        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/add-or-update-member`,
          {
            body: JSON.stringify({ email, data }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          }
        );

        // Error
        if (!response.ok) {
          throw new Error(await formatHttpError(response));
        }
      };

      const addMembertags = async () => {
        const tags = [{ name: 'Customer', status: 'active' }];

        // If user has bought subscription
        if (mode === 'subscription') {
          tags.push({ name: 'Dominion Subscription', status: 'active' });
        }

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

      await addOrUpdateMember();
      await addMembertags();
    };

    // Add or update mailchimp user
    await addUpdateMailchimpUser();
    await orderEmail({ email, name });

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in stripe/order-completed: ${error.message || error.toString()}`
    );

    return {
      error: `Error in stripe/order-completed: ${
        error.message || error.toString()
      }`,
    };
  }
};
