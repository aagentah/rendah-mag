import cloneDeep from 'lodash/cloneDeep';

import client from '../config-write';
import dateTodayISO from '~/functions/dateTodayISO';

const notificationsUpdate = async (user) => {
  try {
    if (!user?.notifications) {
      return;
    }

    const notifications = cloneDeep(user?.notifications);

    for (let i = 0; i < notifications.length; i++) {
      notifications[i].hasOpened = true;
    }

    // Update user
    const data = await client
      .patch(user._id)
      .setIfMissing({ notifications: [] })
      .insert('replace', 'notifications[-1]', notifications)
      .commit()
      .then((res) => {
        console.log(`Notifications updated successfully ${res._id}`);
        return res;
      })
      .catch((err) => {
        console.error('Failed to update notifications: ', err.message);
        return false;
      });

    return data;
  } catch (error) {
    console.error(
      `Error in notificationsUpdate(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default notificationsUpdate;
