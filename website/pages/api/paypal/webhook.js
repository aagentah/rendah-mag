import subscriptionCreated from '~/lib/stripe/subscription-created';
import subscriptionCancelled from '~/lib/stripe/subscription-cancelled';

let paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'live',
  client_id:
    'AXJ4HaEwC7x-IEoVwM1z0_8Oh3AtG5EhS5h71ZXfDOypuuiw8h5LEwYIQYgrWpP1fD9W_rHBV6yQtBWq',
  client_secret: process.env.PAYPAL_SECRET
});

export default async (req, res) => {
  try {
    let subscriber;

    paypal.notification.webhookEvent.verify(
      req.headers,
      req.body,
      '5CC19278KE333950K',
      async (error, response) => {
        if (error) {
          console.log(error);
          console.log('error.response', error.response.details);
          throw error;
        } else {
          console.log(response);

          subscriber = req.body.resource.subscriber;

          // Verification status must be SUCCESS
          if (response.verification_status === 'SUCCESS') {
            console.log('It was a success.');

            switch (req.body.event_type) {
              case 'BILLING.SUBSCRIPTION.ACTIVATED':
                await subscriptionCreated({
                  username: subscriber.email_address,
                  firstName: subscriber.name.given_name,
                  lastName: subscriber.name.surname,
                  name: `${subscriber.name.given_name} ${subscriber.name.surname}`,
                  stripeCustomerId: 'paypal',
                  address: {
                    line1:
                      subscriber?.shipping_address?.address?.address_line_1,
                    line2:
                      subscriber?.shipping_address?.address?.address_line_2,
                    city: subscriber?.shipping_address?.address?.admin_area_2,
                    postal_code:
                      subscriber?.shipping_address?.address?.postal_code,
                    state: subscriber?.shipping_address?.address?.admin_area_1,
                    country: subscriber?.shipping_address?.address?.country_code
                  }
                });

                break;
              case 'BILLING.SUBSCRIPTION.CANCELLED':
                await subscriptionCancelled({
                  email: subscriber.email_address
                });

                break;
              default:
            }
          } else {
            console.log('It was a failed verification');
          }

          // Success
          return res.status(200).json({ error: '' });
        }
      }
    );
  } catch (error) {
    // Handle catch
    console.error('Error in api/mailchimp/add-member:', error);
    return res.status(500).json({ error });
  }
};
