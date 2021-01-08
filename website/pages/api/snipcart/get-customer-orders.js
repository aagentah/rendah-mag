import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import formatHttpError from '~/functions/formatHttpError';

const getCustomerOrders = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = Buffer.from(process.env.SNIPCART_SECRET_KEY).toString(
      'base64'
    );

    const fetchCustomerByEmail = async () => {
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

      return await response.json();
    };

    const fetchCustomerOrdersById = async (id) => {
      const response = await fetch(
        `http://app.snipcart.com/api/customers/${id}/orders`,
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

      return await response.json();
    };

    const fetchCustomerOrderByToken = async (token) => {
      const response = await fetch(
        `http://app.snipcart.com/api/orders/${token}`,
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

      return await response.json();
    };

    const action = async () => {
      // Fetch customer based on email
      const customer = await await fetchCustomerByEmail();
      if (!customer?.items?.length) return [];

      // Fetch customer's orders based on Id
      const ordersById = await fetchCustomerOrdersById(customer.items[0].id);
      if (!ordersById?.length) return [];

      const ordersByToken = [];
      for (let i = 0; i < ordersById.length; i += 1) {
        ordersByToken.push(fetchCustomerOrderByToken(ordersById[i].token));
      }
      if (!ordersByToken?.length) return [];

      return await Promise.all(ordersByToken);
    };

    // Handle response
    return res.status(200).json(await action());
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/get-customer:', error);
    return res.status(400).json({ error: error });
  }
};

export default getCustomerOrders;
