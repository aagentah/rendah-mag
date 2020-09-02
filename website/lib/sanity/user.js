import fs from 'fs';
import crypto from 'crypto';
import tinify from 'tinify';

import client from './config-write';
import { SITE_URL } from '../../constants';

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
  tinify.key = process.env.TINIFY_KEY;

  const updateFields = update;

  // Handle password change
  if (updateFields?.password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(updateFields.password, salt, 1000, 64, 'sha512')
      .toString('hex');

    updateFields.salt = salt;
    updateFields.hash = hash;
    delete updateFields.password;
  }

  // Handle image change
  if (updateFields?.avatar) {
    const base64Data = updateFields.avatar.replace(
      /^data:image\/png;base64,/,
      ''
    );

    await fs.writeFile('tmp/image.png', base64Data, 'base64', async function (
      err
    ) {
      const source = tinify.fromFile('tmp/image.png');

      const resized = source.resize({
        method: 'scale',
        width: 1080,
      });

      // Tinify image
      await resized.toFile('tmp/optimized.png');

      console.log('yo');

      // Upload compressed image to Sanity
      await client.assets
        .upload('image', fs.createReadStream('tmp/optimized.png'), {
          contentType: 'image/png',
          filename: `optimized.png`,
        })
        .then((imageAsset) => {
          client
            .patch(user._id)
            .set({
              avatar: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageAsset._id,
                },
              },
            })
            .commit()
            .then((res) => {
              console.log(`Image was updated, ${res._id}`);
              return res;
            })
            .catch((err) => {
              console.error('Oh no, the image update failed: ', err.message);
              return false;
            });
        })
        .catch((error) => {
          console.error('Upload failed:', error.message);
        });
    });
  }

  delete updateFields.avatar;

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
