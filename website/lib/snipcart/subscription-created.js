import fetch from 'isomorphic-unfetch';
import generatePassword from 'password-generator';

import formatHttpError from '~/functions/formatHttpError';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import createUser from '~/lib/sanity/user/createUser';
import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';

export default async (order) => {
  try {
    const { content } = order;
    const { user, schedule } = content;
    const { billingAddress, shippingAddress } = user;
    const {
      address1,
      address2,
      city,
      country,
      postalCode,
      province,
    } = shippingAddress;
    const { email } = user;
    const fullName = billingAddress?.fullName || shippingAddress?.fullName;
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];
    const temporaryPassword = generatePassword(12, false);

    const userData = {
      username: email,
      password: temporaryPassword,
      name: fullName,
      isDominion: true,
      dominionSince: schedule.startsOn.split('T')[0],
      address: {
        line1: address1,
        line2: address2,
        city: city,
        postal_code: postalCode,
        state: province,
        country: country,
      },
    };

    const tags = [];

    tags.push({
      name: 'Dominion Subscription',
      status: 'active',
    });

    const addMembertags = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
        {
          body: JSON.stringify({ email, tags }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      console.log('yo 2:', response.status);

      // Error
      if (!response.ok) {
        throw new Error(await formatHttpError(response));
      }
    };

    // Here you check if the username has already been used
    const userExisted = await findUserByUsername(email);
    const isUserEmpty =
      Object.keys(userExisted).length === 0 &&
      userExisted.constructor === Object;

    if (!isUserEmpty) {
      throw new Error('The username has already been used.');
    }

    await createUser(userData);
    await welcomeDominionEmail(email, temporaryPassword);
    await addMembertags();

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in snipcart/subscription-created: ${
        error.message || error.toString()
      }`
    );

    return {
      error: `Error in snipcart/subscription-created: ${
        error.message || error.toString()
      }`,
    };
  }
};
