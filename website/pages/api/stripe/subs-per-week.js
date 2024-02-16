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
    let hasMore = true;
    let startingAfter = null;
    const subsEachWeek = {};

    while (hasMore) {
      let options = {
        limit: 100,
        expand: ['data.items.data.price'],
      };

      if (startingAfter) {
        options.starting_after = startingAfter;
      }

      const subscriptions = await stripe.subscriptions.list(options);

      subscriptions.data.forEach((subscription) => {
        const date = new Date(subscription.created * 1000);
        const year = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const firstDayOfMonth = new Date(year, date.getMonth(), 1);
        const weekNumber = Math.ceil(
          ((date - firstDayOfMonth) / 86400000 + firstDayOfMonth.getDay() + 1) /
            7
        );

        const weekYearKey = `${weekNumber}-${monthName}-${year}`;
        if (!subsEachWeek[weekYearKey]) {
          subsEachWeek[weekYearKey] = {
            weekNumberOfMonth: weekNumber,
            monthName,
            year,
            count: 0,
          };
        }
        subsEachWeek[weekYearKey].count++;
      });

      hasMore = subscriptions.has_more;
      if (hasMore && subscriptions.data.length > 0) {
        startingAfter = subscriptions.data[subscriptions.data.length - 1].id;
      }
    }

    const sortedWeeks = Object.values(subsEachWeek).sort((a, b) => {
      const dateA = new Date(`${a.monthName} 01, ${a.year}`);
      const dateB = new Date(`${b.monthName} 01, ${b.year}`);
      return dateA - dateB || a.weekNumberOfMonth - b.weekNumberOfMonth;
    });

    return res.status(200).json(sortedWeeks);
  } catch (error) {
    console.error('Error in api/stripe/get-subs-each-week:', error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
