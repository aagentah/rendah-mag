import crypto from 'crypto';

import client from './config-write';

export async function createUser(req, user) {
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
}

export async function findUserByUsername(req, username) {
  // Here you find the user based on id/username in the database
  const query = '*[_type == "user" && username == $username][0] {...,}';
  const params = { username };

  const data = await client.fetch(query, params).then((res) => {
    console.log(`User was fetched, document ID is ${res._id}`);
    return res;
  });

  return data;
}

export async function updateUserByUsername(req, user, update) {
  const updateFields = update;

  if (updateFields?.password && updateFields.password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(updateFields.password, salt, 1000, 64, 'sha512')
      .toString('hex');

    updateFields.salt = salt;
    updateFields.hash = hash;
    delete updateFields.password;
  }

  const data = await client
    .patch(user._id)
    .set(updateFields)
    .commit()
    .then((res) => {
      console.log(`User was updated, document ID is ${res._id}`);
      return res;
    })
    .catch((err) => {
      console.error('Oh no, the update failed: ', err.message);
      return false;
    });

  return data;
}

export async function deleteUser(req, user) {
  console.log('user', user);

  const data = await client
    .delete(user._id)
    .then((res) => {
      console.log('User was deleted');
      return res;
    })
    .catch((err) => {
      console.error('Oh no, the delete failed: ', err.message);
      return false;
    });

  return data;
}
