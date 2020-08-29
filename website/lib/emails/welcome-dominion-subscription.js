import sendinblue from './sendinblue';

import { SITE_URL } from '../../constants';

export default (email) => {
  const html = `
    <div>
      <img src="${SITE_URL}/images/welcome-to-the-dominion.png" width="600" />
      <p>
        Welcome to the Dominion.
      </p>
      <p>
        You can log in or create an account with the
        email you signed up with to access Dominion content.
      </p>
    </div>
    `;

  const sendSmtpEmail = {
    sender: {
      name: 'Dan at Rendah Mag',
      email: 'dan@rendahmag.com',
    },
    to: [
      {
        email: email,
      },
    ],
    subject: 'Welcome to the Dominion',
    htmlContent: html,
  };

  sendinblue(sendSmtpEmail);
};
