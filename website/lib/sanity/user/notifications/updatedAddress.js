import { nanoid } from 'nanoid';
import find from 'lodash/find';

import client from '~/lib/sanity/config-write';
import dateTodayISO from '~/functions/dateTodayISO';
import htmlToBlocks from '~/functions/htmlToBlocks';
import monthDiff from '~/functions/monthDiff';

const updatedAddress = async (user) => {
  try {
    const exists = find(user.notifications, {
      notificationType: 'updated-address',
    });

    // If exists an promoted in the last 6 months, return
    if (exists && monthDiff(new Date(), new Date(exists.created)) < 6) {
      return false;
    }

    const blocks = htmlToBlocks(
      `<p>A friendly reminder to keep your Shipping & Billing address up to date. You can update this in the Billing tab.</p>`
    );

    return {
      _key: nanoid(),
      title: 'Keep your address updated',
      body: blocks,
      hasOpened: false,
      notificationType: 'updated-address',
      created: dateTodayISO(),
    };
  } catch (error) {
    console.error(
      `Error in updatedAddress(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default updatedAddress;
