import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '~/constants';

const getSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const secret = Buffer.from(SNIPCART_SECRET_KEY).toString('base64');

    const fetchSubscriptionData = async () => {
      const subscription = await fetch(
        `http://app.snipcart.com/api/subscriptions/${subscriptionId}`,
        {
          headers: {
            Authorization: `Basic ${secret}`,
            Accept: 'application/json',
          },
          method: 'GET',
        }
      );

      return subscription;
    };

    const subscriptionDataRes = await fetchSubscriptionData();

    if (!subscriptionDataRes.ok) {
      throw new Error(await subscriptionDataRes.json());
    }

    const subscriptionData = await subscriptionDataRes.json();

    // Handle response
    return res.status(200).json(subscriptionData);
  } catch (error) {
    // Handle catch
    console.error(
      `Error in api/snipcart/get-subscription: ${
        error.message || error.toString()
      }`
    );

    return res.status(400).json({ error: 'Error fetching subscription data.' });
  }
};

export default getSubscription;
