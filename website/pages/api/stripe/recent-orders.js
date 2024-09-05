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
    const sessions = [];
    let hasMore = true;
    let startingAfter = null;

    // Get the current date and the date one month ago
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - 30 * 24 * 60 * 60;

    // Fetch all checkout sessions within the last month
    while (hasMore) {
      const options = {
        limit: 100,
        expand: ['data.customer', 'data.line_items'],
        created: { gte: oneMonthAgo },
      };

      if (startingAfter) {
        options.starting_after = startingAfter;
      }

      const checkoutSessions = await stripe.checkout.sessions.list(options);

      sessions.push(...checkoutSessions.data);

      hasMore = checkoutSessions.has_more;
      if (hasMore) {
        startingAfter =
          checkoutSessions.data[checkoutSessions.data.length - 1].id;
      }
    }

    // Map the data to match the required output format with null checks
    const formattedSessions = sessions.map((session) => {
      console.log('session', session);
      const customer = session.customer_details || {};
      const products =
        session.line_items?.data?.map((item) => item.description).join(', ') ||
        '';

      if (session.status !== 'complete') return null;

      return {
        email: customer.email || '',
        name: customer.name || '',
        address_line_1: customer.address?.line1 || '',
        address_line_2: customer.address?.line2 || '',
        city: customer.address?.city || '',
        county_province: customer.address?.state || '',
        post_code: customer.address?.postal_code || '',
        country: customer.address?.country || '',
        payment_date: new Date(session.created * 1000).toISOString(),
        payment_amount: session.amount_total / 100 || 0,
        products,
      };
    });

    // Sort the data by payment date descending
    // formattedSessions.sort(
    //   (a, b) => new Date(b.payment_date) - new Date(a.payment_date)
    // );
    const nonNullSessions = formattedSessions.filter(Boolean);
    return res.status(200).json(nonNullSessions);
  } catch (error) {
    console.error('Error fetching checkout sessions:', error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
