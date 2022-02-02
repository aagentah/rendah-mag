import fetch from 'isomorphic-unfetch';
import generatePassword from 'password-generator';
import isEmpty from 'lodash/isEmpty';

import formatHttpError from '~/functions/formatHttpError';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import createUser from '~/lib/sanity/user/createUser';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';
import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';

export default async ({ session }) => {
  try {
    const { customer_details } = session;
    const { email } = customer_details;
    const { shipping } = session;
    const { address } = shipping;
    const { name } = shipping;
    const { line1, line2, city, postal_code, state, country } = address;

    const temporaryPassword = generatePassword(12, false);

    const userData = {
      username: email,
      password: temporaryPassword,
      name,
      isDominion: true,
      dominionSince: schedule.startsOn.split('T')[0],
      stripeCustomerId: user.gatewayId,
      address: {
        line1,
        line2,
        city,
        postal_code,
        state,
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
