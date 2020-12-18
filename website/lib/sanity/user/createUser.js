import crypto from 'crypto';

import client from '../config-write';
import subscribe from '~/pages/api/mailchimp/subscribe';

const createUser = async (user) => {
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, 'sha512')
      .toString('hex');

    // Adds user to Mailchimp
    if (user.addMailchimp) {
      try {
        subscribe({
          body: {
            email: user.username,
          },
        });
      } catch (error) {
        console.error(
          'Error adding user to Mailchimp:',
          error.message || error.toString()
        );
      }
    }

    const doc = {
      _type: 'user',
      username: user.username,
      name: user.name,
      publicProfile: true,
      salt,
      hash,
    };

    const data = await client.create(doc).then((res) => {
      console.log(`User was created, document ID is ${res._id}`);
      return { username: res.username, name: res.name };
    });

    return data;
  } catch (error) {
    console.error(
      `Error in createUser(): ${error.message || error.toString()}`
    );
    return false;
  }
};

export default createUser;
