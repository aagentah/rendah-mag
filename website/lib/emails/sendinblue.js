const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
const apiInstance = new SibApiV3Sdk.SMTPApi();

const sendinblue = async (sendSmtpEmail) => {
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail).then(
      (data) => {
        return true;
      },
      (error) => {
        throw new Error(error);
      }
    );

    return { error: '' };
  } catch (error) {
    // Handle catch
    console.error(
      `Error in lib/emails/sendinblue: ${error.message || error.toString()}`
    );

    return { error: error.message || error.toString() };
  }
};

module.exports = sendinblue;
