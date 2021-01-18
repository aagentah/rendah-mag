import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import formatHttpError from '~/functions/formatHttpError';

const getSubscription = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = Buffer.from(process.env.SNIPCART_SECRET_KEY).toString(
      'base64'
    );

    const response = await fetch(
      `http://app.snipcart.com/api/subscriptions?userDefinedCustomerNameOrEmail=${encodeURIComponent(
        email.toLowerCase()
      )}&status=active`,
      {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      }
    );

    const json = await response.json();

    // Error
    if (!response.ok) {
      throw new Error(await formatHttpError(response));
    }

    if (!json?.items?.length) {
      return res.status(200).json({});
    }

    // Handle response
    return res.status(200).json(json.items[0]);
  } catch (error) {
    // Handle catch
    console.error(
      'Error in api/snipcart/get-customer-latest-subscription:',
      error
    );
    return res.status(500).json({ error });
  }
};

export default getSubscription;
