import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email }) => {
  try {
    const title = 'Your Rendah Mag membership has been cancelled <3';

    const body = `
      If you have any questions at all, feel free to reply to this email.
    `;

    const sendSmtpEmail = {
      sender: { name: 'Rendah Mag', email: 'info@rendahmag.com' },
      to: [{ email }],
      bcc: [{ email: 'info@rendahmag.com' }],
      subject: 'Membership cancelled',
      htmlContent: emailCommon(title, body, null, null, null),
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
