import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email }) => {
  try {
    const title = 'Your Dominion Subscription has been cancelled!';

    const body = `
      If you have any questions, feel free to reply to this email.
    `;

    const image = null;

    const sendSmtpEmail = {
      sender: { name: 'Rendah Mag', email: 'info@rendahmag.com' },
      to: [{ email }],
      subject: 'Subscription cancelled',
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
