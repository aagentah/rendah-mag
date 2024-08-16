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
    let hasMoreSubs = true;
    let hasMoreCancels = true;
    let startingAfterSubs = null;
    let startingAfterCancels = null;
    const subsEachMonth = {};

    // Collecting all active subscriptions
    while (hasMoreSubs) {
      let optionsSubs = {
        limit: 100,
        expand: ['data.items.data.price'],
        status: 'all', // To include both active and canceled subscriptions
      };

      if (startingAfterSubs) {
        optionsSubs.starting_after = startingAfterSubs;
      }

      const subscriptions = await stripe.subscriptions.list(optionsSubs);

      subscriptions.data.forEach((subscription) => {
        const dateCreated = new Date(subscription.created * 1000);
        const monthYearCreated = `${
          dateCreated.getMonth() + 1
        }-${dateCreated.getFullYear()}`;

        if (
          subscription.items.data.some(
            (item) =>
              item.price.id === 'price_1Lg5qXKb3SeE1fXf5mFEgyzs' ||
              item.price.id === 'dominion-subscription_7fbe26' ||
              item.price.id === 'dominion-subscription_2ff0f5'
          )
        ) {
          if (!subsEachMonth[monthYearCreated]) {
            subsEachMonth[monthYearCreated] = { subs: 0, cancels: 0, total: 0 };
          }
          subsEachMonth[monthYearCreated].subs++;
        }

        if (subscription.canceled_at) {
          const dateCanceled = new Date(subscription.canceled_at * 1000);
          const monthYearCanceled = `${
            dateCanceled.getMonth() + 1
          }-${dateCanceled.getFullYear()}`;

          if (!subsEachMonth[monthYearCanceled]) {
            subsEachMonth[monthYearCanceled] = {
              subs: 0,
              cancels: 0,
              total: 0,
            };
          }
          subsEachMonth[monthYearCanceled].cancels++;
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
