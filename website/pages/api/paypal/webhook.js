import subscriptionCreated from '~/lib/stripe/subscription-created';
import subscriptionCancelled from '~/lib/stripe/subscription-cancelled';

let paypal = require('paypal-rest-sdk');

// paypal.configure({
//   mode: 'live', // sandbox or live
//   client_id:
//     'AXJ4HaEwC7x-IEoVwM1z0_8Oh3AtG5EhS5h71ZXfDOypuuiw8h5LEwYIQYgrWpP1fD9W_rHBV6yQtBWq',
//   client_secret:
//     'EHgTrg3uD8TwxbYuZuAwoXjiNzCv9v530e4y-5hOSe-LtamarJ-SChFc_9JcZonI_KzWoSZLQqaty-Yh'
// });

paypal.configure({
  mode: 'sandbox', // sandbox or live
  client_id:
    'AV2cNVJMqOnlwqe9zyuFuW0rh_rT2oSgYYIvdRDvhfBAVV4ErFjB2dlpy-YBDQ9Re8YkoXV8KBtg4PZD',
  client_secret:
    'EJfzp7CWjnefkf1jZvQhfMi1G98rUkIMsE2EOQXggu7n6KkedXc6Q2c2sCrGBT4VuVZOqOhXgAPuQOwD'
});

export default async (req, res) => {
  try {
    console.log('aaa', req.body);

    paypal.notification.webhookEvent.verify(
      req.headers,
      req.body,
      '1F2802625R430843X',
      async (error, response) => {
        if (error) {
          console.log(error);
          console.log('error.response', error.response.details);
          throw error;
        } else {
          console.log(response);

          const subscriber = req.body.resource.subscriber;

          // Verification status must be SUCCESS
          if (response.verification_status === 'SUCCESS') {
            console.log('It was a success.');

            switch (req.body.event_type) {
              case 'BILLING.SUBSCRIPTION.ACTIVATED':
                await subscriptionCreated({
                  username: subscriber.email_address,
                  name: subscriber.shipping_address.name.full_name,
                  stripeCustomerId: null,
                  address: {
                    line1: subscriber.shipping_address.address_line_1,
                    line2: subscriber.shipping_address.address_line_2,
                    city: subscriber.shipping_address.admin_area_2,
                    postal_code: subscriber.shipping_address.postal_code,
                    state: subscriber.shipping_address.admin_area_1,
                    country: subscriber.shipping_address.country_code
                  }
                });

                break;
              case 'BILLING.SUBSCRIPTION.CANCELLED':
                await subscriptionCancelled({ session });

                break;
              default:
            }
          } else {
            console.log('It was a failed verification');
          }
        }
      }
    );
  } catch (error) {
    // Handle catch
    console.error('Error in api/mailchimp/add-member:', error);
    return res.status(500).json({ error });
  }
};
