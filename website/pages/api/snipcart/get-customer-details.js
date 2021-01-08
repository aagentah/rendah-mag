import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import formatHttpError from '~/functions/formatHttpError';

const getCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = Buffer.from(process.env.SNIPCART_SECRET_KEY).toString(
      'base64'
    );

    const response = await fetch(
      `http://app.snipcart.com/api/customers?offset=0&limit=1&email=${encodeURIComponent(
        email.toLowerCase()
      )}`,
      {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      }
    );

    // Error
    if (!response.ok) {
      throw new Error(await formatHttpError(response));
    }

    const customer = await response.json();

    if (!customer.items.length) {
      return res.status(200).json([]);
    }

    // Handle response
    return res.status(200).json(customer.items[0]);
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/get-customer-details:', error);
    return res.status(400).json({ error: error });
  }
};

export default getCustomer;
