import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';
import orderEmail from '~/lib/emails/order-notification';

export default async ({ session, products }) => {
  try {
    const { customer_details } = session;
    const { email } = customer_details;
    const phone = customer_details?.phone || '';
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

        if (!response.ok) {
          throw new Error(await formatHttpError(response));
        }
      };

      const addMembertags = async () => {
        const tags = [{ name: 'Customer', status: 'active' }];

        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
          {
            body: JSON.stringify({ email, tags }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          }
        );

        if (!response.ok) {
          throw new Error(await formatHttpError(response));
        }
      };

      await addOrUpdateMember();
      await addMembertags();
    };

    const [mailchimpResult, orderEmailResult] = await Promise.allSettled([
      addUpdateMailchimpUser(),
      orderEmail({ email, phone, name, products, session })
    ]);

    // Log but don't fail on Mailchimp errors (non-critical for user experience)
    if (mailchimpResult.status === 'rejected') {
      console.error('Mailchimp update failed for order:', mailchimpResult.reason);
      // Maybe send to error monitoring service
    }

    // Order email failure is critical for customer experience
    if (orderEmailResult.status === 'rejected') {
      console.error('Order email failed:', orderEmailResult.reason);
      throw new Error('Failed to send order confirmation email');
    }

    return { error: '' };
  } catch (error) {
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
