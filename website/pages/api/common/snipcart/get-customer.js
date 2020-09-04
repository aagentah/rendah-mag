import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '../../../../constants';

const getCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    const secret = Buffer.from(SNIPCART_SECRET_KEY).toString('base64');

    const fetchCustomers = async () => {
      const customers = await fetch('http://app.snipcart.com/api/customers', {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      });

      return customers;
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

      return await order.json();
    };

    const action = async () => {
      // Fetch all customers
      const customersRes = await fetchCustomers();
      if (!customersRes.ok) return false;
      const customers = await customersRes.json();

      // Find customer based on email
      if (!customers.items) return false;
      const customer = find(customers.items, { email });
      if (!customer?.id) return false;

      // Fetch customer's orders based on Id
      const ordersRes = await fetchCustomerOrdersById(customer.id);
      if (!ordersRes.ok) return false;
      const orders = await ordersRes.json();
      if (!orders) return false;

      // Fetch each order's details
      // const detailedOrders = [];
      //
      // for (let i = 0; i < orders.length; i += 1) {
      //   const orderResponse = await ;
      //
      //   if (orderResponse.ok) {
      //     const order = await orderResponse.json();
      //     detailedOrders.push(order);
      //   }
      // }

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
    // console.error(error.message || error.toString());
    return res.status(400).json({ error: 'Error fetching customer orders.' });
  }
};

export default getCustomer;
