import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

export default async (req, res) => {
  const { email } = req.body;
  // const email = 'Goldtoofgarms@hotmail.com';

  try {
    const secret = Buffer.from(process.env.SNIPCART_SECRET_KEY).toString(
      'base64'
    );

    const fetchCustomers = async () =>
      await fetch('http://app.snipcart.com/api/customers', {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      });

    const fetchCustomerOrdersById = async (id) =>
      await fetch(`http://app.snipcart.com/api/customers/${id}/orders`, {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      });

    const fetchCustomerOrderByToken = async (token) =>
      await fetch(`http://app.snipcart.com/api/orders/${token}`, {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      });

    const action = async () => {
      // Fetch all customers
      const customersRes = await fetchCustomers();
      if (customersRes.status >= 400) return false;
      const customers = await customersRes.json();

      // Find customer based on email
      if (!customers.items) return false;
      const customer = find(customers.items, { email });
      if (!customer?.id) return false;

      // Fetch customer's orders based on Id
      const ordersRes = await fetchCustomerOrdersById(customer.id);
      if (ordersRes.status >= 400) return false;
      const orders = await ordersRes.json();
      if (!orders) return false;

      // Fetch each order's details
      const detailedOrders = [];

      for (let i = 0; i < orders.length; i++) {
        const orderResponse = await fetchCustomerOrderByToken(orders[i].token);
        if (orderResponse.status >= 400) continue;
        const order = await orderResponse.json();
        detailedOrders.push(order);
      }

      if (!detailedOrders.length > 0) return false;
      return detailedOrders;
    };

    const response = await action();

    // Handle response
    return response ? res.status(200).json(response) : res.status(400).json([]);
  } catch (error) {
    return res.status(500).json([]);
  }
};
