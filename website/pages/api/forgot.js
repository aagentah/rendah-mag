import { findUserByUsername } from '../../lib/sanity/user';
import promptEmailLogin from '../../lib/emails/promt-email-login';

export default async (req, res) => {
  const { username } = req.body;

  const user = await findUserByUsername(null, username);
  promptEmailLogin(username, user.hash, user.salt);
  return res.status(201).json({ error: '' });
};
