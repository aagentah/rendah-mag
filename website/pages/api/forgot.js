import findUserByUsername from '~/lib/sanity/user/findUserByUsername';
import promptEmailLogin from '~/lib/emails/promt-email-login';

export default async (req, res) => {
  try {
    const { username } = req.body;
    const user = await findUserByUsername(username);

    if (user?.username) {
      const response = await promptEmailLogin(username, user.hash, user.salt);

      if (response?.error) {
        throw new Error(response.error);
      }

      return res.status(200).json({ error: '' });
    }

    return res.status(501).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error(`Error in api/forgot: ${error.message || error.toString()}`);
    return res.status(501).json({ error: error.message || error.toString() });
  }
};
