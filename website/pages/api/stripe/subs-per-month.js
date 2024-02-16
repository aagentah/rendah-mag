import Cors from 'cors';
import initMiddleware from '~/lib/init-middleware';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const handler = async (req, res) => {
  await cors(req, res);

  try {
    let hasMore = true;
    let startingAfter = null;
    const subsEachMonth = {};

    while (hasMore) {
      let options = {
        limit: 500,
        expand: ['data.items.data.price'],
      };

      if (startingAfter) {
        options.starting_after = startingAfter;
      }

      const subscriptions = await stripe.subscriptions.list(options);

      subscriptions.data.forEach((subscription) => {
        // Check if the subscription matches one of the specified product prices
        if (
          subscription.items.data.some(
            (item) =>
              item.price.id === 'price_1Lg5qXKb3SeE1fXf5mFEgyzs' ||
              item.price.product === 'dominion-subscription_2ff0f5'
          )
        ) {
          const date = new Date(subscription.created * 1000);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
          subsEachMonth[monthYear] = (subsEachMonth[monthYear] || 0) + 1;
        }
      });

      hasMore = subscriptions.has_more;
      if (hasMore && subscriptions.data.length > 0) {
        startingAfter = subscriptions.data[subscriptions.data.length - 1].id;
      } else {
        hasMore = false;
      }
    }

    // Convert subsEachMonth object into an array and sort by date
    const sortedMonths = Object.entries(subsEachMonth)
      .sort((a, b) => {
        const [monthA, yearA] = a[0].split('-').map(Number);
        const [monthB, yearB] = b[0].split('-').map(Number);
        return yearA - yearB || monthA - monthB;
      })
      .map(([monthYear, count]) => ({
        monthYear,
        count,
      }));

    console.log('sortedMonths', sortedMonths);

    return res.status(200).json(sortedMonths);
  } catch (error) {
    console.error('Error in api/stripe/get-subs-each-month:', error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
