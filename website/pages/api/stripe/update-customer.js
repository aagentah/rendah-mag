import fetch from 'isomorphic-unfetch';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

import formatHttpError from '~/functions/formatHttpError';

const updateCustomer = async (req, res) => {
  try {
    const { stripeCustomerId, paymentMethod } = req.body;

    // // Get customer
    // const customer = await stripe.customers.list({
    //   limit: 1,
    //   email: email_address,
    // });
    //
    // // Error
    // if (!customer?.data?.length) {
    //   throw new Error('Error fetching Stripe customer');
    // }
    //
    // const customerId = customer.data[0].id;
    //
    // // Get customer details based on ID
    // const customerDetails = await stripe.customers.retrieve(customerId);

    // Get customer
    const customer = await stripe.customers.retrieve(stripeCustomerId);

    const customerId = customer.id;

    // Attach payment method to customer
    const attach = await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId,
    });

    // Set default payment method
    const customerUpdate = await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethod.id },
    });

    // Asign default payment method to subscription
    const subscription = await stripe.subscriptions.update(
      customer.subscriptions.data[0].id,
      {
        default_payment_method:
          customerUpdate.invoice_settings.default_payment_method,
      }
    );

    // Handle response
    return res.status(200).json({});
  } catch (error) {
    // Handle catch
    console.error('Error in api/stripe/update-customer:', error);
    return res.status(500).json({ error });
  }
};

export default updateCustomer;
