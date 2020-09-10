import nextConnect from 'next-connect';

import auth from '../../middleware/auth';
import createUser from '~/lib/sanity/user/createUser';
import findUserByUsername from '~/lib/sanity/user/findUserByUsername';

const handler = nextConnect();

handler
  .use(auth)
  //
  .post(async (req, res) => {
    // Here you check if the username has already been used
    const userExisted = await findUserByUsername(req, req.body.username);
    const isUserEmpty =
      Object.keys(userExisted).length === 0 &&
      userExisted.constructor === Object;

    if (!isUserEmpty) {
      return res.status(409).send('The username has already been used.');
    }

    const user = await createUser(req.body);

    return req.logIn(user, (err) => {
      if (err) throw err;
      // Log the signed up user in
      res.status(201).json({
        user,
      });
    });
  });

export default handler;
