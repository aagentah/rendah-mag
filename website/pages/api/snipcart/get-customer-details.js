import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '~/constants';

const getCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = Buffer.from(SNIPCART_SECRET_KEY).toString('base64');

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

    if (!response.ok) {
      // Error
      throw new Error(JSON.stringify(await response.json()));
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
