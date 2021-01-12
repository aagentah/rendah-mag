import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';

export default async (order) => {
  try {
    const addUpdateMailchimpUser = async (email, firstName, lastName) => {
      const data = {
        email_address: email,
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
            body: JSON.stringify({ email: email, data: data }),
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

      await addOrUpdateMember();
      await addMembertags();
    };

    const { content } = order;
    const { user } = content;
    const { items } = content;
    const { billingAddress, shippingAddress } = user;
    const { email } = user;
    const fullName = billingAddress?.fullName || shippingAddress?.fullName;
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];

    // Add or update mailchimp user
    await addUpdateMailchimpUser(email, firstName, lastName);
  } catch (error) {
    // Handle catch
    console.error(
      `Error in snipcart/order-completed: ${error.message || error.toString()}`
    );
    return false;
  }
};
