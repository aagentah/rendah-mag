import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email, name }) => {
  try {
    const title = `New order from ${name}!`;

    const body = `
      Email: ${email}.
    `;

    const image = null;

    const sendSmtpEmail = {
      sender: { name: 'Rendah Mag', email: 'info@rendahmag.com' },
      to: [{ email: 'dan@rendahmag.com' }],
      subject: 'New order',
      htmlContent: emailCommon(title, body, image, null, null),
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
