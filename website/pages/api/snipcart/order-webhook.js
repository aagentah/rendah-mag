import orderCompleted from '~/lib/snipcart/order-completed';
import subscriptionCancelled from '~/lib/snipcart/subscription-cancelled';
import subscriptionCreated from '~/lib/snipcart/subscription-created';
import subscriptionResumed from '~/lib/snipcart/subscription-resumed';

export default async (req, res) => {
  try {
    const order = req.body;

    console.log('order', order);

    if (order?.eventName === 'order.completed') {
      console.log('order.completed');
      await orderCompleted(order);
    }

    if (order?.eventName === 'subscription.created') {
      console.log('subscription.created');
      subscriptionCreated(order);
    }

    if (order?.eventName === 'subscription.resumed') {
      console.log('subscription.resumed');
      subscriptionResumed(order);
    }

    if (order?.eventName === 'subscription.cancelled') {
      console.log('subscription.cancelled');
      await subscriptionCancelled(order);
    }

    if (order?.eventName === 'subscription.paused') {
      console.log('subscription.paused');
      await subscriptionCancelled(order);
    }

    return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/order-webhook:', error);
    return res.status(500).json({ error: error });
  }
};
