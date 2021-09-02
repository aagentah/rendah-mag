import fetch from 'isomorphic-unfetch';
import generatePassword from 'password-generator';
import isEmpty from 'lodash/isEmpty';

import formatHttpError from '~/functions/formatHttpError';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import createUser from '~/lib/sanity/user/createUser';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';
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
      stripeCustomerId: user.gatewayId,
      address: {
        line1: address1,
        line2: address2,
        city,
        postal_code: postalCode,
        state: province,
        country,
      },
    };

    // Here you check if the username has already been used
    const userExist = await findUserByUsername(email);

    // const isUserEmpty =
    //   Object.keys(userExist).length === 0 && userExist.constructor === Object;

    const isUserEmpty = isEmpty(userExist);

    if (!isUserEmpty) {
      // already has account
      await updateUserByUsername(null, userExist, userData);
    } else {
      // does not have account
      await createUser(userData);
    }

    await welcomeDominionEmail(email, temporaryPassword);

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
