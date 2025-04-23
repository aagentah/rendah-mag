import fetch from 'isomorphic-unfetch';
import fs from 'fs';
import crypto from 'crypto';
import tinify from 'tinify';
import { promisify } from 'util';
import cloneDeep from 'lodash/cloneDeep';
import sharp from 'sharp';

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
  const image64 = f.avatar.replace(/^data:image\/[a-z]+;base64,/, '');
  const buffer = Buffer.from(image64, 'base64');
  if (buffer.length > 10 * 1024 * 1024) {
    throw new Error('File size exceeds maximum of 10MB');
  }
  // Remove dimension check as we're not enforcing dimensions here
  const writeFile = promisify(fs.writeFile);
  await writeFile('/tmp/avatar.png', buffer);
  const source = tinify.fromFile('/tmp/avatar.png');
  const resized = source.resize({
    method: 'cover',
    width: 1080,
    height: 1080,
  });
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
        console.log(`Image was updated, ${res?._id}`);
        return res;
      })
      .catch((err) => {
        console.error('Oh no, the image update failed: ', err.message);
        return false;
      });
    return patchUserWithImage;
  };
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
  const response = await fetch(
    `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
    {
      body: JSON.stringify({
        email: cloneFields.username.toLowerCase(),
        tags: cloneFields.tags,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }
  );
  if (!response.ok) {
    throw new Error(await formatHttpError(response));
  }
  const checkedTags = [];
  for (let i = 0; i < cloneFields?.tags?.length; i += 1) {
    const tag = cloneFields.tags[i];
    if (tag.status === 'active') checkedTags.push(tag.name);
  }
  delete cloneFields.tags;
  cloneFields.tags = checkedTags;
  return cloneFields;
};

const updateUserByUsername = async (req, user, fields) => {
  try {
    let cloneFields = cloneDeep(fields);
    if (cloneFields?.password) {
      cloneFields = handlePassword(cloneFields);
    }
    if (cloneFields?.avatar) {
      cloneFields = await handleAvatar(cloneFields, user);
    }
    if (cloneFields?.tags?.length > 0) {
      cloneFields = await handleTags(cloneFields);
    }
    const data = await client
      .patch(user._id)
      .set(cloneFields)
      .commit()
      .then((res) => {
        console.log(`User was updated, document ID is ${res?._id}`);
        return res;
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
        return false;
      });
    return data;
  } catch (error) {
    console.error('Error in updateUserByUsername():', error);
    return false;
  }
};

export default updateUserByUsername;
