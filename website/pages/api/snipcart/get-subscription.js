import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '~/constants';

const getSubscription = async (req, res) => {
  try {
    const { uniqueId } = req.body;
    const secret = Buffer.from(SNIPCART_SECRET_KEY).toString('base64');

    console.log('uniqueId', uniqueId);

    const fetchSubscriptionData = async () => {
      const subscription = await fetch(
        `http://app.snipcart.com/api/subscriptions/${uniqueId}`,
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

    console.log('subscriptionData status', subscriptionData);

    // Handle response
    // const response = await action();
    const response = null;
    return res.status(200).json(response);
  } catch (error) {
    // Handle catch
    console.error(error.message || error.toString());
    return res.status(400).json({ error: 'Error fetching subscription data.' });
  }
};

export default getSubscription;
