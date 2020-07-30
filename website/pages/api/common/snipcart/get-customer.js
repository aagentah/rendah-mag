import request from 'request';
import find from 'lodash/find';

export default async (req, res) => {
  const { email } = req.body;
  // const email = 'Goldtoofgarms@hotmail.com';

  function fetchCustomers() {
    return new Promise((resolve) => {
      request(
        {
          url: 'http://app.snipcart.com/api/customers',
          auth: {
            user: process.env.SNIPCART_SECRET_KEY,
          },
          method: 'GET',
          json: true,
        },
        (error, response) => {
          resolve(response.body);
        }
      );
    });
  }

  function fetchCustomerOrdersById(id) {
    return new Promise((resolve) => {
      request(
        {
          url: `http://app.snipcart.com/api/customers/${id}/orders`,
          auth: {
            user: process.env.SNIPCART_SECRET_KEY,
          },
          method: 'GET',
          json: true,
        },
        (error, response) => {
          resolve(response.body);
        }
      );
    });
  }

  function fetchCustomerOrderByToken(token) {
    return new Promise((resolve) => {
      request(
        {
          url: `http://app.snipcart.com/api/orders/${token}`,
          auth: {
            user: process.env.SNIPCART_SECRET_KEY,
          },
          method: 'GET',
          json: true,
        },
        (error, response) => {
          resolve(response.body);
        }
      );
    });
  }

  async function action() {
    const customers = await fetchCustomers();

    if (customers.items) {
      const customerwithEmail = find(customers.items, { email: email });

      if (customerwithEmail?.id) {
        const customerOrders = await fetchCustomerOrdersById(
          customerwithEmail.id
        );

        if (customerOrders) {
          const ordersByToken = [];

          for (let i = 0; i < customerOrders.length; i++) {
            const order = await fetchCustomerOrderByToken(
              customerOrders[i].token
            );
            ordersByToken.push(order);
          }

          return res.status(200).json(ordersByToken);
        }
      }

      return res.status(400).json([]);
    }

    return res.status(400).json([]);
  }

  return action();
};
