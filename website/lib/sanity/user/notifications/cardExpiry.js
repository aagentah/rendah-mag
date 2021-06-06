import { nanoid } from 'nanoid';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

import client from '~/lib/sanity/config-write';
import dateTodayISO from '~/functions/dateTodayISO';
import htmlToBlocks from '~/functions/htmlToBlocks';
import monthDiff from '~/functions/monthDiff';

const cardExpiry = async (user) => {
  try {
    // If exists an promoted in the last 2 months, return
    const exists = find(user.notifications, {
      notificationType: 'card-expiring',
    });
    if (exists && monthDiff(new Date(), new Date(exists.created)) < 2) {
      return;
    }

    const getStripeCustomer = await fetch(
      `${process.env.SITE_URL}/api/stripe/get-customer`,
      {
        body: JSON.stringify({ stripeCustomerId: user.stripeCustomerId }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    const stripeCustomer = await getStripeCustomer.json();
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const expMonth = stripeCustomer.defaultPaymentMethod.card.exp_month;
    const expYear = stripeCustomer.defaultPaymentMethod.card.exp_year;

    // If expiry not due in the next 2 months, return
    if (monthDiff(new Date(), new Date(expYear, expMonth, null)) > 2) {
      return;
    }

    const blocks = htmlToBlocks(
      `<p>Your card is due to expire on ${expMonth}/${expYear}. Please update your card in the Billing tab.</p>`
    );

    return {
      _key: nanoid(),
      title: 'Your card is about to expire',
      body: blocks,
      hasOpened: false,
      notificationType: 'card-expiring',
      created: dateTodayISO(),
    };
  } catch (error) {
    console.error(
      `Error in cardExpiry(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default cardExpiry;
