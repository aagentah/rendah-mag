import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

export default async (req, res) => {
  const { email } = req.body;
  // const email = 'Goldtoofgarms@hotmail.com';

  const secret = Buffer.from(process.env.SNIPCART_SECRET_KEY).toString(
    'base64'
  );

  try {
    const fetchCustomers = await fetch(
      'http://app.snipcart.com/api/customers',
      {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      }
    );

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
      if (fetchCustomers.status >= 400) return false;
      const customers = await fetchCustomers.json();

      // Find customer based on email
      if (!customers.items) return false;
      const customer = find(customers.items, { email: email });
      if (!customer?.id) return false;

      // Fetch customer's orders based on Id
      const customerOrdersResponse = await fetchCustomerOrdersById(customer.id);
      if (fetchCustomers.status >= 400) return false;
      const customerOrders = await customerOrdersResponse.json();
      if (!customerOrders) return false;

      // Fetch each order's details
      const ordersByToken = [];

      for (let i = 0; i < customerOrders.length; i++) {
        const orderResponse = await fetchCustomerOrderByToken(
          customerOrders[i].token
        );

        if (orderResponse.status >= 400) continue;
        const order = await orderResponse.json();
        ordersByToken.push(order);
      }

      return ordersByToken;
    };

    const response = await action();

    // Handle response
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json([]);
    }
  } catch (error) {
    // Catch errors
    return res.status(500).json([]);
  }
};
