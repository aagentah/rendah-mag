import sendinblue from './sendinblue';


import emailCommon from '~/emails/component/common';

export default (email) => {
  const title = 'Welcome to the Dominion.';

  const body = `
    You can log in or create an account with the email you
    signed up with to access Dominion content.
  `;

  const image = `${process.env.SITE_URL}/images/subscribe-banner.png`;

  const buttonText = 'Rendah Mag';

  const buttonLink = process.env.SITE_URL;

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
