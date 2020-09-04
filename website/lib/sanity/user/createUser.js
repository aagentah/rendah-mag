import crypto from 'crypto';

import client from '../config-write';

const createUser = async (req, user) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(user.password, salt, 1000, 64, 'sha512')
    .toString('hex');

  const doc = {
    _type: 'user',
    username: user.username,
    name: user.name,
    salt,
    hash,
  };

  const data = await client.create(doc).then((res) => {
    console.log(`User was created, document ID is ${res._id}`);
    return { username: res.username, createdAt: Date.now() };
  });

  return data;
};

export default createUser;
