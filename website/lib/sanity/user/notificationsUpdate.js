import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

import client from '../config-write';
import dateTodayISO from '~/functions/dateTodayISO';

const notificationsUpdate = async (user) => {
  try {
    if (!user?.notifications?.length) {
      return;
    }

    // If all notifs already oepend, return
    if (!find(user.notifications, { hasOpened: false })) {
      return;
    }

    const notifications = cloneDeep(user.notifications);

    for (let i = 0; i < notifications.length; i++) {
      notifications[i].hasOpened = true;
    }

    // Remove notifications from user
    await client
      .patch(user._id)
      .set({ notifications: [] })
      .commit()
      .then((res) => {
        console.log(`Notifications removed successfully ${res?._id}`);
        return res;
      })
      .catch((err) => {
        console.error('Failed to remove notifications: ', err.message);
        return false;
      });

    // Add notifications to user
    const data = await client
      .patch(user._id)
      .setIfMissing({ notifications: [] })
      .insert('after', 'notifications[-1]', notifications)
      .commit()
      .then((res) => {
        console.log(`Notifications updated successfully ${res?._id}`);
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
