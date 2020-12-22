import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';

import { Heading } from 'next-pattern-library';

import { useUser } from '~/lib/hooks';

export default function ProfileOrders() {
  const [user, { loading, mutate, error }] = useUser();
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerSubscriptions, setCustomerSubscriptions] = useState([]);
  const dateToday = new Date().toISOString().split('T')[0];

  // Fetch orders
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/snipcart/get-customer-orders`,
        {
          body: JSON.stringify({ email: user.username }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      const json = await response.json();

      if (response.ok) {
        // Success
        setCustomerOrders(json);
      } else {
        // Error
        toast.error(json.error);
        setCustomerOrders([]);
      }
    };

    if (user) fetchCustomerOrders();
  }, [user]);

  // Fetch customer
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/snipcart/get-customer-details`,
        {
          body: JSON.stringify({ email: user.username }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      const json = await response.json();

      if (response.ok) {
        // Success
        setCustomerDetails(json);
      } else {
        // Error
        toast.error(json.error);
        setCustomerDetails({});
      }
    };

    if (user) fetchCustomerDetails();
  }, [user]);

  // Fetch items and gather subscription instances
  useEffect(() => {
    if (user?.isDominionWiteList) return;

    if (user && customerOrders?.length) {
      const subscriptionInstances = [];

      for (let i = 0; i < customerOrders.length; i += 1) {
        const order = customerOrders[i];
        const orderItems = order.items;

        if (orderItems.length) {
          for (let ii = 0; ii < orderItems.length; ii += 1) {
            const item = orderItems[ii];

            if (item.id === 'dominion-subscription') {
              subscriptionInstances.push(item);
            }
          }
        }
      }

      setCustomerSubscriptions(subscriptionInstances);
    }
  }, [user, customerOrders]);

  // Look for valid subscription and see if CMS needs updating
  useEffect(async () => {
    if (!customerSubscriptions.length || user?.isDominionWiteList) return;

    // Set the user to Dominion
    async function setUserIsDominion(dominionSince) {
      if (user?.isDominion) return;

      // Set the user to Dominion in CMS
      const updateCMS = async () => {
        const body = {
          isDominion: true,
          dominionSince: dominionSince.split('T')[0],
        };

        const response = await fetch(`${process.env.SITE_URL}/api/user`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          // Success
          mutate(await response.json());
        } else {
          // Error
          toast.error(
            'There was an issue adding you to the Dominion, please contact support right away.'
          );
        }
      };

      // Set the user to Dominion in MailChimp
      const updateMailChimpTags = async () => {
        const tags = [
          {
            label: 'Dominion Subscription',
            status: true,
          },
        ];

        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
          {
            body: JSON.stringify({
              email: user.username,
              tags: tags,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        if (!response.ok) {
          // Error
          toast.error(
            'There was an issue adding you to the Dominion, please contact support right away.'
          );
        }
      };

      await updateMailChimpTags();
      await updateCMS();
    }

    // Unset the user from Dominion in CMS
    async function setUserNotDominion() {
      if (!user?.isDominion) return;

      // Unset the user to Dominion in CMS
      const updateCMS = async () => {
        const body = {
          isDominion: false,
        };

        const response = await fetch(`${process.env.SITE_URL}/api/user`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          // Success
          mutate(await response.json());
        } else {
          // Error
          toast.error(
            'There was an issue removing you from the Dominion, please contact support right away.'
          );
        }
      };

      // Unset the user to Dominion in MailChimp
      const updateMailChimpTags = async () => {
        const tags = [
          {
            label: 'Dominion Subscription',
            status: false,
          },
        ];

        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
          {
            body: JSON.stringify({
              email: user.username,
              tags: tags,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        if (!response.ok) {
          // Error
          toast.error(
            'There was an issue removing you to the Dominion, please contact support right away.'
          );
        }
      };

      await updateMailChimpTags();
      await updateCMS();
    }

    // Fetch subscription data
    const fetchAllSubscriptionsData = () => {
      let promiseArray = [];

      for (let i = 0; i < customerSubscriptions.length; i += 1) {
        const subscription = customerSubscriptions[i];

        promiseArray.push(
          fetch(`${process.env.SITE_URL}/api/snipcart/get-subscription`, {
            body: JSON.stringify({
              subscriptionId: subscription.subscriptionId,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          }).then((response) =>
            response.json().catch((error) => {
              console.log(error);
              return {};
            })
          )
        );
      }

      return Promise.all(promiseArray);
    };

    const customerSubscriptionDetails = await fetchAllSubscriptionsData();

    console.log('customerSubscriptionDetails', customerSubscriptionDetails);

    // Check if user has an active subscription, and then call CMS update
    if (customerSubscriptionDetails.length) {
      for (let i = 0; i < customerSubscriptionDetails.length; i++) {
        const subscription = customerSubscriptionDetails[i];

        // If user has a subscription that is active or paid for
        if (
          subscription?.status === 'Paid' &&
          !subscription?.cancelledOn &&
          !subscription?.pausedOn
        ) {
          const dominionSince = subscription?.modificationDate;
          return setUserIsDominion(dominionSince);
        }
      }
    }

    // Otherwise unset
    return setUserNotDominion();
  }, [customerSubscriptions, mutate]);

  if (customerOrders?.length) {
    return (
      <section>
        {customerDetails && (
          <>
            <div className="pb4">
              <Heading
                /* Options */
                htmlEntity="h1"
                text="Current Address."
                color="black"
                size="medium"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <section className="pb4  ph3">
              {customerDetails?.shippingAddress?.name && (
                <p className="t-secondary  f6  black  lh-copy">
                  {customerDetails.shippingAddress.name}
                </p>
              )}

              {customerDetails?.shippingAddress?.address1 && (
                <p className="t-secondary  f6  black  lh-copy">
                  {customerDetails.shippingAddress.address1}
                </p>
              )}

              {customerDetails?.shippingAddress?.address2 && (
                <p className="t-secondary  f6  black  lh-copy">
                  {customerDetails.shippingAddress.address2}
                </p>
              )}

              {customerDetails?.shippingAddress?.city && (
                <p className="t-secondary  f6  black  lh-copy">
                  {customerDetails.shippingAddress.city}
                </p>
              )}

              {customerDetails?.shippingAddress?.postalCode && (
                <p className="t-secondary  f6  black  lh-copy">
                  {customerDetails.shippingAddress.postalCode}
                </p>
              )}
              {customerDetails?.shippingAddress?.country && (
                <p className="t-secondary  f6  black  lh-copy">
                  {customerDetails.shippingAddress.country}
                </p>
              )}
            </section>
          </>
        )}

        <div className="pb4">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Previous orders."
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          {customerOrders.map((order, i) => (
            <div
              key={`${order.creationDate}-${order.paymentTransactionId}`}
              className="col-24  pa2"
            >
              <div className="br3  pa3  shadow2  mb3">
                <p className="t-secondary  f7  grey">{order.completionDate}</p>
                {order.items.map((item) => (
                  <div key={item.uniqueId} className="pv3">
                    <p className="t-primary  f5  black  pb3">{item.name}</p>
                    <div className="pl2">
                      <p className="t-secondary  f6  black  pb2">
                        <span className="bold  pr1">Quantity:</span>
                        {item.quantity}
                      </p>
                      <p className="t-secondary  f6  black">
                        <span className="bold  pr1">Total:</span>
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (customerOrders?.length === 0) {
    return (
      <Heading
        /* Options */
        htmlEntity="h1"
        text="You don't have any previous orders."
        color="black"
        size="medium"
        truncate={null}
        /* Children */
        withLinkProps={null}
      />
    );
  }

  return <p>Loading...</p>;
}
