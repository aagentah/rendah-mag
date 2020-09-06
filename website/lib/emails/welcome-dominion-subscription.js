import sendinblue from './sendinblue';

import { SITE_URL } from '~/constants';
import emailCommon from '~/emails/component/common';

export default (email) => {
  const title = 'Welcome to the Dominion.';

  const body = `
    You can log in or create an account with the email you
    signed up with to access Dominion content.
  `;

  const image = `${SITE_URL}/images/subscribe-banner.png`;

  const buttonText = 'Rendah Mag';

  const buttonLink = SITE_URL;

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
