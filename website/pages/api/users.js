import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import { createUser, findUserByUsername } from '../../lib/sanity/user';

const handler = nextConnect();

handler
  .use(auth)
  //
  .post(async (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).send('Missing fields');
    }
    // Here you check if the username has already been used
    const userExisted = await findUserByUsername(req, username);
    console.log('userExisted', userExisted);
    const isUserEmpty =
      Object.keys(userExisted).length === 0 &&
      userExisted.constructor === Object;
    console.log('isUserEmpty', isUserEmpty);
    if (!isUserEmpty) {
      return res.status(409).send('The username has already been used');
    }

    const user = { username, password, name };
    // Security-wise, you must hash the password before saving it
    // const hashedPass = await argon2.hash(password);
    // const user = { username, password: hashedPass, name }
    createUser(req, user);

    return req.logIn(user, (err) => {
      if (err) throw err;
      // Log the signed up user in
      res.status(201).json({
        user,
      });
    });
  });

export default handler;
