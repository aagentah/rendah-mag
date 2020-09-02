import fs from 'fs';
import crypto from 'crypto';
import tinify from 'tinify';
import { promisify } from 'util';
import cloneDeep from 'lodash/cloneDeep';

import client from '../config-write';
import { SITE_URL } from '../../../constants';

const handlePassword = (cloneFields) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(cloneFields.password, salt, 1000, 64, 'sha512')
    .toString('hex');

  cloneFields.salt = salt;
  cloneFields.hash = hash;

  delete cloneFields.password;
  return cloneFields;
};

const handleAvatar = async (cloneFields, user) => {
  tinify.key = process.env.TINIFY_KEY;

  const writeFile = promisify(fs.writeFile);
  const image64 = cloneFields.avatar.replace(/^data:image\/png;base64,/, '');
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
    const avatarProps = {
      avatar: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    };

    return await client
      .patch(user._id)
      .set(avatarProps)
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

  delete cloneFields.avatar;
  return cloneFields;
};

export async function updateUserByUsername(req, user, fields) {
  try {
    // Clone the fields object
    let cloneFields = cloneDeep(fields);

    // Handle password change
    if (cloneFields?.password) {
      cloneFields = handlePassword(cloneFields);
    }

    // Handle image change
    if (cloneFields?.avatar) {
      cloneFields = await handleAvatar(cloneFields, user);
    }

    console.log('cloneFields', cloneFields);

    // Update user
    const data = await client
      .patch(user._id)
      .set(cloneFields)
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
