import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';

import { Heading } from 'next-pattern-library';

import { useUser } from '~/lib/hooks';

export default function ProfileOrders() {
  const [user, { loading, mutate, error }] = useUser();
  const [customerOrders, setCustomerOrders] = useState(null);

  // Fetch orders
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      // Fetch orders
      const response = await fetch(
        `${process.env.SITE_URL}/api/snipcart/get-customer`,
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

  // Fetch items and check if is dominion subscription
  useEffect(() => {
    if (user?.isDominion) return;

    // Set the user to Dominion in CMS
    async function setUserIsDominion(dominionStartDate) {
      const body = {
        isDominion: true,
        dominionSince: dominionStartDate.split('T')[0],
      };

      console.log('body', body);

      // Put to user API
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
    }

    if (user && customerOrders?.length) {
      for (let i = 0; i < customerOrders.length; i += 1) {
        const order = customerOrders[i];
        const orderItems = order.items;

        if (orderItems.length) {
          for (let ii = 0; ii < orderItems.length; ii += 1) {
            const item = orderItems[ii];

            if (item.id === 'dominion-subscription') {
              console.log('unique', item.uniqueId);
              const dominionStartDate = item.addedOn;
              setUserIsDominion(dominionStartDate);
            }
          }
        }
      }
    }
  }, [user, customerOrders, mutate]);

  if (customerOrders?.length) {
    return (
      <section>
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
