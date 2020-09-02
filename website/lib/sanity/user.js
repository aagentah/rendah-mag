import fs from 'fs';
import crypto from 'crypto';
import tinify from 'tinify';
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

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

export async function updateUserByUsername(req, user, fields) {
  try {
    // Handle password change
    if (fields?.password) {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto
        .pbkdf2Sync(fields.password, salt, 1000, 64, 'sha512')
        .toString('hex');

      fields.salt = salt;
      fields.hash = hash;
      delete fields.password;
    }

    const uploadAvatar = async () => {
      const image64 = fields.avatar.replace(/^data:image\/png;base64,/, '');

      await writeFile('tmp/image.png', image64, 'base64');

      const source = tinify.fromFile('tmp/image.png');

      const resized = source.resize({
        method: 'cover',
        width: 720,
        height: 720,
      });

      // Tinify image
      await resized.toFile('tmp/optimized.png');

      const uploadCompressed = async (imageAsset) => {
        return await client
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
      };

      // Upload compressed image to Sanity
      await client.assets
        .upload('image', fs.createReadStream('tmp/optimized.png'), {
          contentType: 'image/png',
          filename: `optimized.png`,
        })
        .then(async (imageAsset) => {
          await uploadCompressed(imageAsset);
        })
        .catch((error) => {
          console.error('Upload failed:', error.message);
        });

      delete fields.avatar;
      return;
    };

    // Handle image change
    if (fields?.avatar) {
      tinify.key = process.env.TINIFY_KEY;
      await uploadAvatar();
    }

    const data = await client
      .patch(user._id)
      .set(fields)
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
  } catch (error) {
    console.log(error.message);
    return res.status(400).send('Error updating user');
  }
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
