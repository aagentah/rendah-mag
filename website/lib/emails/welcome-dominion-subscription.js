import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email, temporaryPassword }) => {
  try {
    const title = 'Welcome to the Dominion!';

    const body = `
    We can't thank you enough, and we're happy to have you on this journey with us.
    <br />
    <br />
    <strong>So what's next?</strong>
    <br />
    <br />
    Please log into your Dominion profile. We've set up your account with a
    temporary password, please change this when logging in.
    <br />
    <br />
    <strong>My Dominion Profile?</strong>
    <br />
    <br />
    Your Dominion Profile will allow you to keep on top of everything related to
    your Subscription, including access to Dominion content. We'll also send you
    updates via email, just to keep you in the loop.
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
      sender: { name: 'Dan at Rendah Mag', email: 'dan@rendahmag.com' },
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
