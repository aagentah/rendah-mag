import fetch from 'isomorphic-unfetch';
import fs from 'fs';
import crypto from 'crypto';
import tinify from 'tinify';
import { promisify } from 'util';
import cloneDeep from 'lodash/cloneDeep';

import formatHttpError from '~/functions/formatHttpError';
import client from '../config-write';

const handlePassword = (cloneFields) => {
  const f = cloneFields;

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(f.password, salt, 1000, 64, 'sha512')
    .toString('hex');

  f.salt = salt;
  f.hash = hash;

  delete f.password;
  return f;
};

const handleAvatar = async (cloneFields, user) => {
  tinify.key = process.env.TINIFY_KEY;

  const f = cloneFields;

  const writeFile = promisify(fs.writeFile);
  const image64 = f.avatar.replace(/^data:image\/[a-z]+;base64,/, '');
  await writeFile('/tmp/avatar.png', image64, 'base64');
  const source = tinify.fromFile('/tmp/avatar.png');
  const resized = source.resize({
    method: 'cover',
    width: 720,
    height: 720,
  });

  // Tinify image
  await resized.toFile('/tmp/optimized.png');

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

    const patchUserWithImage = await client
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

    return patchUserWithImage;
  };

  // Upload compressed image to Sanity
  await client.assets
    .upload('image', fs.createReadStream('/tmp/optimized.png'), {
      contentType: 'image/png',
      filename: `optimized.png`,
    })
    .then(async (imageAsset) => {
      await uploadCompressed(imageAsset);
    })
    .catch((error) => {
      console.error('Upload failed:', error.message || error.toString());
    });

  // Delete temp image
  try {
    fs.unlinkSync('/tmp/avatar.png');
    fs.unlinkSync('/tmp/optimized.png');
  } catch (error) {
    console.error('unlinkSync error:', error.message || error.toString());
  }

  delete f.avatar;
  return f;
};

const handleTags = async (cloneFields) => {
  // Update member tags (mailchimp)
  const response = await fetch(
    `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
    {
      body: JSON.stringify({
        email: cloneFields.username,
        tags: cloneFields.tags,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }
  );

  // Error
  if (!response.ok) {
    throw new Error(await formatHttpError(response));
  }

  // Create array with checked tags
  const checkedTags = [];

  for (let i = 0; i < cloneFields?.tags?.length; i += 1) {
    const tag = cloneFields.tags[i];
    if (tag.status === 'active') checkedTags.push(tag.name);
  }

  // Replace cloneFields tags with array
  delete cloneFields.tags;
  cloneFields.tags = checkedTags;

  return cloneFields;
};

const updateUserByUsername = async (req, user, fields) => {
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

    // Handle tags
    if (cloneFields?.tags?.length > 0) {
      cloneFields = await handleTags(cloneFields);
    }

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
    // Handle catch
    console.error('Error in updateUserByUsername():', error);
    return false;
  }
};

export default updateUserByUsername;
