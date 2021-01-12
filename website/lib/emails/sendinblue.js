const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.SMTPApi();

const sendinblue = (sendSmtpEmail) => {
  try {
    apiInstance.sendTransacEmail(null).then(
      async (data) => {
        return true;
      },
      async (error) => {
        throw new Error(error);
      }
    );
  } catch (error) {
    // Handle catch
    console.error(
      `Error in lin/emails/sendinblue: ${error.message || error.toString()}`
    );

    return false;
  }
};

module.exports = sendinblue;
