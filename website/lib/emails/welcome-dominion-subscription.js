import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default (email) => {
  try {
    const title = 'Welcome to the Dominion!';

    const body = `
    We can't thank you enough, and we're happy to have you on this journey with us.
    <br />
    <br />
    <strong>So what's next?</strong>
    <br />
    <br />
    If you haven't already, please create your Rendah Mag account (using the
    email you used on purchase) to access your Dominion Profile.
    <br />
    <br />
    <strong>My Dominion Profile?</strong>
    <br />
    <br />
    Your Dominion Profile will allow you to keep on top of everything related to
    your Subscription, including access to Dominion content.
    We'll also send you Dominion updates via email, just to keep you
    in the loop.
    <br />
    <br />
    If you have any questions at all, please don't hesitate to contact the team at
    info@rendahmag.com.
  `;

    const image = null;

    const buttonText = 'Create Account';

    const buttonLink = `${process.env.SITE_URL}/signup?prefillEmail=${email}`;

    const sendSmtpEmail = {
      sender: {
        name: 'Dan at Rendah Mag',
        email: 'dan@rendahmag.com',
      },
      to: [
        {
          email,
        },
      ],
      subject: 'Welcome to the Dominion',
      htmlContent: emailCommon(title, body, image, buttonText, buttonLink),
    };

    sendinblue(sendSmtpEmail);
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
