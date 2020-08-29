import sendinblue from './sendinblue';

import { SITE_URL } from '../../constants';
import commonEmail from '../../emails/component';

export default (email) => {
  const title = 'Welcome to the Dominion.';

  const body = `
    You can log in or create an account with the email you
    signed up with to access Dominion content.
  `;

  const image = `${SITE_URL}/images/subscribe-banner.png`;

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
    htmlContent: commonEmail(title, body, image, null, null),
  };

  sendinblue(sendSmtpEmail);
};
