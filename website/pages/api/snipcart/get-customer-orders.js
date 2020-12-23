import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '~/constants';

const getCustomerOrders = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = Buffer.from(SNIPCART_SECRET_KEY).toString('base64');

    const fetchCustomer = async () => {
      const customer = await fetch(
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

      return customer;
    };

    const fetchCustomerOrdersById = async (id) => {
      const orders = await fetch(
        `http://app.snipcart.com/api/customers/${id}/orders`,
        {
          headers: {
            Authorization: `Basic ${secret}`,
            Accept: 'application/json',
          },
          method: 'GET',
        }
      );

      return orders;
    };

    const fetchCustomerOrderByToken = async (token) => {
      const order = await fetch(`http://app.snipcart.com/api/orders/${token}`, {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      });

      if (!order.ok) {
        return null;
      }

      const json = await order.json();
      return json;
    };

    const action = async () => {
      // Fetch all customers
      const customerRes = await fetchCustomer();

      if (!customerRes.ok) {
        throw new Error(JSON.stringify(await customerRes.json()));
      }

      const customer = await customerRes.json();
      if (!customer.items.length) return [];

      // Fetch customer's orders based on Id
      const ordersRes = await fetchCustomerOrdersById(customer.items[0].id);

      if (!ordersRes.ok) {
        throw new Error(JSON.stringify(await ordersRes.json()));
      }

      const orders = await ordersRes.json();
      if (!orders?.length) return [];

      const promises = [];

      for (let i = 0; i < orders.length; i += 1) {
        promises.push(fetchCustomerOrderByToken(orders[i].token));
      }

      const detailedOrders = await Promise.all(promises);
      return detailedOrders;
    };

    // Handle response
    const response = await action();
    return res.status(200).json(response);
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/get-customer:', error);
    return res.status(400).json({ error: error });
  }
};

export default getCustomerOrders;
