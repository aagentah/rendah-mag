const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getCustomer = async (req, res) => {
  try {
    const { stripeCustomerId } = req.body;
    let defaultPaymentMethod = null;

    // Get customer
    const customer = await stripe.customers.retrieve(stripeCustomerId);

    // Get default payment method
    if (customer.invoice_settings.default_payment_method) {
      defaultPaymentMethod = await stripe.paymentMethods.retrieve(
        customer.invoice_settings.default_payment_method
      );
    }

    // Handle response
    return res.status(200).json({ customer, defaultPaymentMethod });
  } catch (error) {
    // Handle catch
    console.error('Error in api/stripe/get-customer:', error);
    return res.status(500).json({ error });
  }
};

export default getCustomer;
