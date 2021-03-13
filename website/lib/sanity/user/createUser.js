import crypto from 'crypto';

import client from '../config-write';

const createUser = async (user) => {
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, 'sha512')
      .toString('hex');

    const doc = {
      _type: 'user',
      username: user.username.toLowerCase(),
      name: user.name,
      publicProfile: true,
      isDominion: user.isDominion,
      dominionSince: user.dominionSince,
      address: { ...user.address },
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
