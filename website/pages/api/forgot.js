import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import promptEmailLogin from '~/lib/emails/promt-email-login';

export default async (req, res) => {
  const { username } = req.body;

  const user = await findUserByUsername(null, username);

  if (user) {
    promptEmailLogin(username, user.hash, user.salt);
    return res.status(200).json({ error: '' });
  }

  return res.status(501).json({ error: '' });
};
