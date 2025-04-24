import Cors from 'cors';
import initMiddleware from '~/lib/init-middleware';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  try {
    // 1. Gather normalized MRR per month
    const mrrEachMonth = {};
    const subsList = stripe.subscriptions.list({
      status: 'active',
      limit: 100,
      expand: ['data.items.data.price'],
    });

    for await (const sub of subsList) {
      const created = new Date(sub.created * 1000);
      const monthYear = `${created.getMonth() + 1}-${created.getFullYear()}`;

      for (const item of sub.items.data) {
        const price = item.price;
        if (!price.unit_amount || !price.recurring) continue;
        const amount = price.unit_amount / 100;
        const { interval, interval_count: intervalCount } = price.recurring;

        let monthlyAmount;
        if (interval === 'month') monthlyAmount = amount;
        else if (interval === 'year') monthlyAmount = amount / 12;
        else monthlyAmount = amount / intervalCount;

        mrrEachMonth[monthYear] =
          (mrrEachMonth[monthYear] || 0) + monthlyAmount * item.quantity;
      }
    }

    // 2. Gather actual revenue (successful charges) per month
    const revenueEachMonthCents = {};
    const txList = stripe.balanceTransactions.list({
      limit: 100,
      type: 'charge',
    });

    for await (const tx of txList) {
      const created = new Date(tx.created * 1000);
      const monthYear = `${created.getMonth() + 1}-${created.getFullYear()}`;

      revenueEachMonthCents[monthYear] =
        (revenueEachMonthCents[monthYear] || 0) + tx.amount;
    }

    // 3. Merge months and sort chronologically
    const allMonths = new Set([
      ...Object.keys(mrrEachMonth),
      ...Object.keys(revenueEachMonthCents),
    ]);

    const sortedMonths = Array.from(allMonths)
      .sort((a, b) => {
        const [mA, yA] = a.split('-').map(Number);
        const [mB, yB] = b.split('-').map(Number);
        return yA - yB || mA - mB;
      })
      .map((monthYear) => ({
        monthYear,
        mrr: Number((mrrEachMonth[monthYear] || 0).toFixed(2)),
        revenue: Number(
          ((revenueEachMonthCents[monthYear] || 0) / 100).toFixed(2)
        ),
      }));

    return res.status(200).json(sortedMonths);
  } catch (err) {
    console.error('Error in monthly-metrics:', err);
    return res.status(500).json({ error: err.message });
  }
}
