import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async (username, hash, salt) => {
  try {
    const title = 'Password Reset';

    const body = `
      Click below to login and change your Rendah Mag password.
    `;

    const image = null;

    const buttonText = 'Reset';

    const buttonLink = `${process.env.SITE_URL}/login?username=${username}&hash=${hash}&salt=${salt}&fwdRoute=profile`;

    const sendSmtpEmail = {
      sender: {
        name: 'Rendah Mag',
        email: 'info@rendahmag.com',
      },
      to: [
        {
          email: username,
        },
      ],
      subject: 'Reset your Rendah Mag password',
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
      `Error in lib/emails/promt-email-login: ${
        error.message || error.toString()
      }`
    );

    return { error: error.message || error.toString() };
  }
};
