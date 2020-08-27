import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

import welcomeDominionEmail from '../../../../lib/emails/welcome-dominion-subscription';

export default async (req, res) => {
  const order = req.body;

  try {
    const addUpdateMailchimpUser = async (
      email,
      firstName,
      lastName,
      isSubscription
    ) => {
      const emailHashed = md5(email.toLowerCase());
      const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

      const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      };

      // Add or update member
      const addOrUpdateMember = await fetch(
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

      if (addOrUpdateMember.status >= 400) {
        throw await addOrUpdateMember.json();
      }

      // Add tags
      const tagsData = {
        tags: [
          {
            name: 'Customer',
            status: 'active',
          },
        ],
      };

      if (isSubscription) {
        tagsData.tags.push({
          name: 'Dominion Subscription',
          status: 'active',
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

      if (addMembertags.status >= 400) {
        throw await addMembertags.json();
      }
    };

    if (order?.eventName === 'order.completed') {
      const orderContent = order.content;

      const items = orderContent.items;
      const email = orderContent.user.email;
      const fullname =
        orderContent.user.billingAddress.fullName ||
        orderContent.user.shippingAddress.fullName;
      const firstName = fullname.split(' ')[0];
      const lastName = fullname.split(' ')[1];
      let isSubscription = false;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Send subscription email
        if (item.id === 'dominion-subscription') {
          isSubscription = true;
          welcomeDominionEmail(email);
          break;
        }
      }

      // Add or update mailchimp user
      await addUpdateMailchimpUser(email, firstName, lastName, isSubscription);

      return res.status(200).json({ error: '' });
    }
  } catch (error) {
    console.error('error.message', error.message);
    return res.status(200).json({ error: error.message });
  }
};
