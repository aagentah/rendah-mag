import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '~/constants';

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

    const fetchCustomerById = async (id) => {
      const orders = await fetch(
        `http://app.snipcart.com/api/customers/${id}`,
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

    const action = async () => {
      // Fetch all customers
      const customersRes = await fetchCustomers();

      if (!customersRes.ok) {
        throw new Error(await customersRes.json());
      }

      const customers = await customersRes.json();
      if (!customers.items) return [];

      // Find customer based on email
      const customer = find(customers.items, { email });
      if (!customer) return [];

      // Fetch customer's orders based on Id
      const customerRes = await fetchCustomerById(customer.id);

      if (!customerRes.ok) {
        throw new Error(await customerRes.json());
      }

      const customerData = await customerRes.json();
      if (!customerData) return {};

      return customerData;
    };

    // Handle response
    const response = await action();
    return res.status(200).json(response);
  } catch (error) {
    // Handle catch
    console.error(
      `Error in api/snipcart/get-customer-details: ${
        error.message || error.toString()
      }`
    );

    return res.status(400).json({ error: 'Error fetching customer details.' });
  }
};

export default getCustomer;
