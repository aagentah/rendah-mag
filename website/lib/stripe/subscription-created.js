import generatePassword from 'password-generator';
import isEmpty from 'lodash/isEmpty';

import formatHttpError from '~/functions/formatHttpError';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import createUser from '~/lib/sanity/user/createUser';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';
import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';

export default async details => {
  try {
    const temporaryPassword = generatePassword(12, false);
    const firstName = details.name.split(' ')[0];
    const lastName = details.name.split(' ')[1];
    const email = details.username;

    const userData = {
      ...details,
      password: temporaryPassword,
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

    const addUpdateMailchimpUser = async () => {
      const data = {
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      };

      const addOrUpdateMember = async () => {
        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/add-or-update-member`,
          {
            body: JSON.stringify({ email, data }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          }
        );

        // Error
        if (!response.ok) {
          throw new Error(await formatHttpError(response));
        }
      };

      const addMembertags = async () => {
        const tags = [
          { name: 'Customer', status: 'active' },
          { name: 'Dominion Subscription', status: 'active' },
          { name: 'Previously Dominion Subscription', status: 'inactive' }
        ];

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

      await addOrUpdateMember();
      await addMembertags();
    };

    // Add or update mailchimp user
    await addUpdateMailchimpUser();
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
