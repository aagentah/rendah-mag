import nextConnect from 'next-connect';

import auth from '../../middleware/auth';
import {
  deleteUser,
  updateUserByUsername,
  findUserByUsername,
} from '../../lib/sanity/user';

const handler = nextConnect();

handler
  .use(auth)
  .get(async (req, res) => {
    const requestUser = await req.user;
    if (!requestUser) {
      return res.json({ user: null });
    }
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    const user = await findUserByUsername(req, requestUser.username);
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
    if (!requestUser) {
      return res.json({ user: null });
    }

    deleteUser(req, requestUser);
    req.logOut();
    return res.status(204).end();
  });

export default handler;
