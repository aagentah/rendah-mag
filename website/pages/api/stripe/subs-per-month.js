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
    let hasMoreSubs = true;
    let hasMoreCancels = true;
    let startingAfterSubs = null;
    let startingAfterCancels = null;
    const subsEachMonth = {};

    while (hasMoreSubs) {
      let optionsSubs = {
        limit: 100,
        expand: ['data.items.data.price'],
      };

      if (startingAfterSubs) {
        optionsSubs.starting_after = startingAfterSubs;
      }

      const subscriptions = await stripe.subscriptions.list(optionsSubs);

      subscriptions.data.forEach((subscription) => {
        if (
          subscription.items.data.some(
            (item) =>
              item.price.id === 'price_1Lg5qXKb3SeE1fXf5mFEgyzs' ||
              item.price.product === 'dominion-subscription_2ff0f5'
          )
        ) {
          const date = new Date(subscription.created * 1000);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
          if (!subsEachMonth[monthYear]) {
            subsEachMonth[monthYear] = { subs: 0, cancels: 0, total: 0 };
          }
          subsEachMonth[monthYear].subs++;
        }
      });

      hasMoreSubs = subscriptions.has_more;
      if (hasMoreSubs && subscriptions.data.length > 0) {
        startingAfterSubs =
          subscriptions.data[subscriptions.data.length - 1].id;
      } else {
        hasMoreSubs = false;
      }
    }

    while (hasMoreCancels) {
      let optionsCancels = {
        limit: 100,
        status: 'canceled',
      };

      if (startingAfterCancels) {
        optionsCancels.starting_after = startingAfterCancels;
      }

      const canceledSubscriptions = await stripe.subscriptions.list(
        optionsCancels
      );

      canceledSubscriptions.data.forEach((subscription) => {
        if (
          subscription.items.data.some(
            (item) =>
              item.price.id === 'price_1Lg5qXKb3SeE1fXf5mFEgyzs' ||
              item.price.product === 'dominion-subscription_2ff0f5'
          )
        ) {
          const date = new Date(subscription.created * 1000);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
          if (!subsEachMonth[monthYear]) {
            subsEachMonth[monthYear] = { subs: 0, cancels: 0, total: 0 };
          }
          subsEachMonth[monthYear].cancels++;
        }
      });

      hasMoreCancels = canceledSubscriptions.has_more;
      if (hasMoreCancels && canceledSubscriptions.data.length > 0) {
        startingAfterCancels =
          canceledSubscriptions.data[canceledSubscriptions.data.length - 1].id;
      } else {
        hasMoreCancels = false;
      }
    }

    // Calculate totals for each month
    Object.keys(subsEachMonth).forEach((monthYear) => {
      subsEachMonth[monthYear].total =
        subsEachMonth[monthYear].subs - subsEachMonth[monthYear].cancels;
    });

    // Convert subsEachMonth object into an array and sort by date
    const sortedMonths = Object.entries(subsEachMonth)
      .sort((a, b) => {
        const [monthA, yearA] = a[0].split('-').map(Number);
        const [monthB, yearB] = b[0].split('-').map(Number);
        return yearA - yearB || monthA - monthB;
      })
      .map(([monthYear, data]) => ({
        monthYear,
        subs: data.subs,
        cancelled: data.cancels,
        total: data.total,
      }));

    console.log('sortedMonths', sortedMonths);

    return res.status(200).json(sortedMonths);
  } catch (error) {
    console.error('Error in api/stripe/get-subs-each-month:', error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
