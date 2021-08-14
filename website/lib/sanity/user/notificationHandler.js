import client from '../config-write';
import cardExpiry from '~/lib/sanity/user/notifications/cardExpiry';
import updatedAddress from '~/lib/sanity/user/notifications/updatedAddress';

const notificationHandler = async (user) => {
  try {
    const notifications = [];

    const cardExpiryNotif = await cardExpiry(user);
    const updatedAddressNotif = await updatedAddress(user);

    if (cardExpiryNotif) notifications.push(cardExpiryNotif);
    if (updatedAddressNotif) notifications.push(updatedAddressNotif);

    if (notifications.length) {
      // Update user
      const data = await client
        .patch(user._id)
        .setIfMissing({ notifications: [] })
        .insert('before', 'notifications[-1]', notifications)
        .commit()
        .then((res) => {
          console.log(`Notifications added successfully ${res._id}`);
          return res;
        })
        .catch((err) => {
          console.error('Failed to add notifications: ', err.message);
          return false;
        });

      return data;
    }

    return false;
  } catch (error) {
    console.error(
      `Error in notificationHandler(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default notificationHandler;
