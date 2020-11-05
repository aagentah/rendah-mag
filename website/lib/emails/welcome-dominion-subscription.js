import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default (email) => {
  const title = 'Welcome to the Dominion.';

  const body = `
    We can't thank you enough, and we're happy to have you on this journey with us!
    <br />
    <br />
    If you haven't already, create your Rendah Mag account (using the email you used on purchase) to
    access your Dominion profile.
  `;

  const image = null;

  const buttonText = 'Create Account';

  const buttonLink = `${process.env.SITE_URL}/signup`;

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
};
