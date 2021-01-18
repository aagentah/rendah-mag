import orderCompleted from '~/lib/snipcart/order-completed';
import subscriptionCancelled from '~/lib/snipcart/subscription-cancelled';
import subscriptionCreated from '~/lib/snipcart/subscription-created';
import subscriptionResumed from '~/lib/snipcart/subscription-resumed';

export default async (req, res) => {
  try {
    const order = req.body;
    let e = null;

    if (order?.eventName === 'order.completed') {
      const orderCompletedRes = await orderCompleted(order);
      if (orderCompletedRes?.error) e += orderCompletedRes.error;
    }

    if (order?.eventName === 'subscription.created') {
      const subscriptionCreatedRes = await subscriptionCreated(order);
      if (subscriptionCreatedRes?.error) e += subscriptionCreatedRes.error;
    }

    if (order?.eventName === 'subscription.resumed') {
      const subscriptionResumedRes = await subscriptionResumed(order);
      if (subscriptionResumedRes?.error) e += subscriptionResumedRes.error;
    }

    if (order?.eventName === 'subscription.cancelled') {
      const subscriptionCancelledRes = await subscriptionCancelled(order);
      if (subscriptionCancelledRes?.error) e += subscriptionCancelledRes.error;
    }

    if (order?.eventName === 'subscription.paused') {
      const subscriptionPausedRes = await subscriptionCancelled(order);
      if (subscriptionPausedRes?.error) e += subscriptionPausedRes.error;
    }

    if (e) {
      throw new Error(e);
    }

    return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/order-webhook:', error);
    return res.status(500).json({ error });
  }
};
