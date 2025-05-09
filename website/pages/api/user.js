import nextConnect from 'next-connect';
import isEmpty from 'lodash/isEmpty';

import auth from '../../middleware/auth';
import deleteUser from '~/lib/sanity/user/deleteUser';
import updateUserByUsername from '~/lib/sanity/user/updateUserByUsername';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    const requestUser = await req.user;

    if (isEmpty(requestUser)) {
      return res.json({ user: null });
    }

    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    const user = await findUserByUsername(requestUser.username);

    return res.json({ user });
  })
  .use(async (req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (await !req.user) {
      res.status(401).send('unauthenticated');
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    const requestUser = await req.user;
    const updatedFields = req.body;
    const user = await updateUserByUsername(req, requestUser, updatedFields);

    if (user) {
      return res.json({ user });
    }
    return res.status(400).send('Error updating user');
  })
  .delete(async (req, res) => {
    const requestUser = await req.user;

    if (isEmpty(requestUser)) {
      return res.json({ user: null });
    }

    deleteUser(req, requestUser);
    req.logOut();
    return res.status(204).end();
  });

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
