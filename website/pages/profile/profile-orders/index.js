import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

import { Heading } from 'next-pattern-library';

import { useUser } from '~/lib/hooks';

export default function ProfileOrders() {
  const [user, { loading, mutate, error }] = useUser();
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerDetails, setCustomerDetails] = useState();

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

      if (response.ok) {
        // Success
        setCustomerOrders(await response.json());
      } else {
        // Error
        toast.error('Error fetching customer orders.');
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

      if (response.ok) {
        // Success
        setCustomerDetails(await response.json());
      } else {
        // Error
        toast.error('Error fetching customer details.');
        setCustomerDetails(null);
      }
    };

    if (user) fetchCustomerDetails();
  }, [user]);

  // Fetch active subscription
  // useEffect(() => {
  //   if (user.isDominionWiteList) return;
  //
  //   // Set the user to Dominion
  //   async function setUserIsDominion(dominionSince) {
  //     const updateCMS = async () => {
  //       const body = {
  //         isDominion: true,
  //         dominionSince: dominionSince.split('T')[0],
  //       };
  //
  //       const response = await fetch(`${process.env.SITE_URL}/api/user`, {
  //         method: 'PUT',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(body),
  //       });
  //
  //       if (response.ok) {
  //         // Success
  //         mutate(await response.json());
  //       } else {
  //         // Error
  //         toast.error(
  //           'There was an issue adding you to the Dominion, please contact support right away.'
  //         );
  //       }
  //     };
  //
  //     const updateMailChimpTags = async () => {
  //       const response = await fetch(
  //         `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
  //         {
  //           body: JSON.stringify({
  //             email: user.username,
  //             tags: [{ name: 'Dominion Subscription', status: 'active' }],
  //           }),
  //           headers: { 'Content-Type': 'application/json' },
  //           method: 'POST',
  //         }
  //       );
  //
  //       if (!response.ok) {
  //         // Error
  //         toast.error(
  //           'There was an issue adding you to the Dominion, please contact support right away.'
  //         );
  //       }
  //     };
  //
  //     await updateMailChimpTags();
  //     await updateCMS();
  //   }
  //
  //   // Unset the user from Dominion in CMS
  //   async function setUserNotDominion() {
  //     const updateCMS = async () => {
  //       const body = {
  //         isDominion: false,
  //       };
  //
  //       const response = await fetch(`${process.env.SITE_URL}/api/user`, {
  //         method: 'PUT',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(body),
  //       });
  //
  //       if (response.ok) {
  //         // Success
  //         mutate(await response.json());
  //       } else {
  //         // Error
  //         toast.error(
  //           'There was an issue removing you from the Dominion, please contact support right away.'
  //         );
  //       }
  //     };
  //
  //     const updateMailChimpTags = async () => {
  //       const response = await fetch(
  //         `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
  //         {
  //           body: JSON.stringify({
  //             email: user.username,
  //             tags: [{ name: 'Dominion Subscription', status: 'inactive' }],
  //           }),
  //           headers: { 'Content-Type': 'application/json' },
  //           method: 'POST',
  //         }
  //       );
  //
  //       if (!response.ok) {
  //         // Error
  //         toast.error(
  //           'There was an issue removing you to the Dominion, please contact support right away.'
  //         );
  //       }
  //     };
  //
  //     await updateMailChimpTags();
  //     await updateCMS();
  //   }
  //
  //   const fetchCustomerLatestSubscription = async () => {
  //     const response = await fetch(
  //       `${process.env.SITE_URL}/api/snipcart/get-customer-latest-subscription`,
  //       {
  //         body: JSON.stringify({ email: user.username }),
  //         headers: { 'Content-Type': 'application/json' },
  //         method: 'POST',
  //       }
  //     );
  //
  //     const json = await response.json();
  //
  //     if (response.ok) {
  //       // Success
  //       if (isEmpty(json)) {
  //         if (user?.isDominion) setUserNotDominion();
  //       } else {
  //         if (!user?.isDominion) setUserIsDominion(json.schedule.startsOn);
  //       }
  //     }
  //   };
  //
  //   if (user) fetchCustomerLatestSubscription();
  // }, [user]);

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
