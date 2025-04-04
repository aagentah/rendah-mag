import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email, temporaryPassword }) => {
  try {
    const title = 'Welcome to the Membership!';

    const body = `
    We can't thank you enough.
    <br />
    <br />
    <strong>What's next?</strong>
    <br />
    <br />
    Please log into the Dashboard and have a look around. We've set up your account with a
    temporary password, please change this when logging in.
    <br />
    <br />
    <strong>When will I get my print?</strong>
    <br />
    <br />
    We usually fire our a copy of our latest print within 5-days of any new 
    sign-ups, so keep an eye out for that coming.
    <br />
    <br />
    We send out emails with all new updates, so don't feel you have to constantly be logging in to "keep up to date".
    <br />
    <br />
    <strong>Login details:</strong>
    <br />
    <br />
    <ul>
      <li><strong>Username:</strong> ${email}</li>
      <li><strong>Password:</strong> ${temporaryPassword}</li>
    </ul>
  `;

    const image = null;

    const buttonText = 'Log in';

    const buttonLink = `${process.env.SITE_URL}/login?prefillEmail=${email}`;

    const sendSmtpEmail = {
      sender: { name: 'Dan', email: 'dan@rendahmag.com' },
      to: [{ email }],
      subject: 'Welcome to the Dominion',
      htmlContent: emailCommon(title, body, image, buttonText, buttonLink),
    };

    const { error } = await sendinblue(sendSmtpEmail);

    if (error) {
      throw new Error(error);
    }

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in welcome-dominion-subscription: ${
        error.message || error.toString()
      }`
    );

    return false;
  }
};
