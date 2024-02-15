// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const getMostCommonCheckoutDaysOrdered = async (req, res) => {
//   try {
//     let hasMore = true;
//     let startingAfter = null;
//     const checkoutDays = {};

//     while (hasMore) {
//       let options = {
//         limit: 100,
//       };

//       if (startingAfter) {
//         options.starting_after = startingAfter;
//       }

//       const sessions = await stripe.checkout.sessions.list(options);

//       sessions.data.forEach((session) => {
//         // Simplified assumption: A session is successful if it has a payment_intent or subscription.
//         // Adjust according to your business logic and Stripe's data structure.
//         if (session.payment_intent || session.subscription) {
//           const date = new Date(session.created * 1000);
//           const dayOfWeek = date.toLocaleDateString('en-US', {
//             weekday: 'long',
//           });
//           checkoutDays[dayOfWeek] = (checkoutDays[dayOfWeek] || 0) + 1;
//         }
//       });

//       hasMore = sessions.has_more;
//       if (hasMore && sessions.data.length > 0) {
//         startingAfter = sessions.data[sessions.data.length - 1].id;
//       } else {
//         hasMore = false;
//       }
//     }

//     const sortedDays = Object.entries(checkoutDays).sort((a, b) => b[1] - a[1]);
//     const sortedDaysWithCounts = sortedDays.map(([day, count]) => ({
//       day,
//       count,
//     }));
//     console.log('sortedDaysWithCounts', sortedDaysWithCounts);
//     return res.status(200).json(sortedDaysWithCounts);
//   } catch (error) {
//     console.error('Error in api/stripe/playground:', error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// export default getMostCommonCheckoutDaysOrdered;

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const getMostCommonCheckoutWeeksAnyMonthOrdered = async (req, res) => {
//   try {
//     let hasMore = true;
//     let startingAfter = null;
//     const checkoutWeeks = {};

//     while (hasMore) {
//       let options = {
//         limit: 100,
//       };

//       if (startingAfter) {
//         options.starting_after = startingAfter;
//       }

//       const sessions = await stripe.checkout.sessions.list(options);

//       sessions.data.forEach((session) => {
//         // Assuming the session is successful if it has a payment_intent or subscription
//         if (session.payment_intent || session.subscription) {
//           const date = new Date(session.created * 1000);
//           const weekOfMonth = Math.ceil(date.getDate() / 7);
//           const weekKey = `Week ${weekOfMonth}`;

//           checkoutWeeks[weekKey] = (checkoutWeeks[weekKey] || 0) + 1;
//         }
//       });

//       hasMore = sessions.has_more;
//       if (hasMore && sessions.data.length > 0) {
//         startingAfter = sessions.data[sessions.data.length - 1].id;
//       } else {
//         hasMore = false;
//       }
//     }

//     // Convert checkoutWeeks object into an array and sort by count
//     const sortedWeeks = Object.entries(checkoutWeeks).sort(
//       (a, b) => b[1] - a[1]
//     );
//     const sortedWeeksWithCounts = sortedWeeks.map(([week, count]) => ({
//       week,
//       count,
//     }));
//     console.log('sortedWeeksWithCounts', sortedWeeksWithCounts);
//     return res.status(200).json(sortedWeeksWithCounts);
//   } catch (error) {
//     console.error(
//       'Error in api/stripe/get-most-common-checkout-weeks-any-month-ordered:',
//       error
//     );
//     return res.status(500).json({ error: error.message });
//   }
// };

// export default getMostCommonCheckoutWeeksAnyMonthOrdered;

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const getTop10CheckoutDaysAnyMonthOrdered = async (req, res) => {
//   try {
//     let hasMore = true;
//     let startingAfter = null;
//     const checkoutDays = {};

//     while (hasMore) {
//       let options = {
//         limit: 100,
//       };

//       if (startingAfter) {
//         options.starting_after = startingAfter;
//       }

//       const sessions = await stripe.checkout.sessions.list(options);

//       sessions.data.forEach((session) => {
//         // Assuming the session is successful if it has a payment_intent or subscription
//         if (session.payment_intent || session.subscription) {
//           const date = new Date(session.created * 1000);
//           const dayOfMonth = date.getDate();
//           const dayKey = `Day ${dayOfMonth}`;

//           checkoutDays[dayKey] = (checkoutDays[dayKey] || 0) + 1;
//         }
//       });

//       hasMore = sessions.has_more;
//       if (hasMore && sessions.data.length > 0) {
//         startingAfter = sessions.data[sessions.data.length - 1].id;
//       } else {
//         hasMore = false;
//       }
//     }

//     // Convert checkoutDays object into an array, sort by count, and then take the top 10
//     const sortedDays = Object.entries(checkoutDays)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 10); // Taking only the top 10
//     const sortedDaysWithCounts = sortedDays.map(([day, count]) => ({
//       day,
//       count,
//     }));
//     console.log('sortedDaysWithCounts', sortedDaysWithCounts);
//     return res.status(200).json(sortedDaysWithCounts);
//   } catch (error) {
//     console.error(
//       'Error in api/stripe/get-top10-checkout-days-any-month-ordered:',
//       error
//     );
//     return res.status(500).json({ error: error.message });
//   }
// };

// export default getTop10CheckoutDaysAnyMonthOrdered;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getSubsEachMonth = async (req, res) => {
  try {
    let hasMore = true;
    let startingAfter = null;
    const subsEachMonth = {};

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

export default getSubsEachMonth;
