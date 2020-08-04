const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =
  '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';

var apiInstance = new SibApiV3Sdk.SMTPApi();

const sendinblue = (sendSmtpEmail) => {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      return true;
    },
    function (error) {
      console.error(error);
      return false;
    }
  );
};

module.exports = sendinblue;
