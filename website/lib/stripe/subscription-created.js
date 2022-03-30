import generatePassword from 'password-generator';
import isEmpty from 'lodash/isEmpty';

import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import createUser from '~/lib/sanity/user/createUser';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';
import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';

export default async details => {
  try {
    const userData = {
      ...details,
      password: generatePassword(12, false),
      isDominion: true,
      dominionSince: new Date().toISOString().split('T')[0]
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

    await welcomeDominionEmail({ email, temporaryPassword });

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in stripe/subscription-created: ${error.message ||
        error.toString()}`
    );

    return {
      error: `Error in stripe/subscription-created: ${error.message ||
        error.toString()}`
    };
  }
};
