import Cors from 'cors';
import initMiddleware from '~/lib/init-middleware';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const handler = async (req, res) => {
  await cors(req, res);

  try {
    const failedPayments = [];
    let hasMore = true;
    let startingAfter = null;

    // Get the current date and the date three months ago
    const now = Math.floor(Date.now() / 1000);
    const threeMonthsAgo = now - 90 * 24 * 60 * 60; // 3 months in seconds

    // Fetch all PaymentIntents within the last three months
    while (hasMore) {
      const options = {
        limit: 100,
        created: { gte: threeMonthsAgo },
      };

      if (startingAfter) {
        options.starting_after = startingAfter;
      }

      const paymentIntents = await stripe.paymentIntents.list(options);

      failedPayments.push(...paymentIntents.data);

      hasMore = paymentIntents.has_more;
      if (hasMore) {
        startingAfter = paymentIntents.data[paymentIntents.data.length - 1].id;
      }
    }

    // Filter out only those PaymentIntents that failed
    const filteredFailedPayments = failedPayments.filter(
      (intent) =>
        intent.status === 'requires_payment_method' && intent.last_payment_error
    );

    // Group failed payments by email
    const groupedByEmail = filteredFailedPayments.reduce((acc, intent) => {
      const email = intent.charges.data[0]?.billing_details?.email || 'unknown';
      const reason = intent.last_payment_error?.message || 'unknown';

      if (!acc[email]) {
        acc[email] = {
          email,
          name: intent.charges.data[0]?.billing_details?.name || 'Unknown',
          failed_count: 0,
          failed_reasons: [],
        };
      }

      acc[email].failed_count += 1;
      acc[email].failed_reasons.push(reason);

      return acc;
    }, {});

    // Convert the grouped object into an array
    const result = Object.values(groupedByEmail);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching failed payment intents:', error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
