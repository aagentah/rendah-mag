import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { Heading } from 'next-pattern-library';

export default function ProfileOrders({ customerOrders }) {
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
            reveal={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          {customerOrders.map((order, i) => (
            <div className="col-24  pa2">
              <div className="shadow1">
                {order.items.map((item, i) => (
                  <div className="bg-almost-white  pa3">
                    <p className="t-primary  f6  black  pb2">
                      Name: {item.name}
                    </p>
                    <p className="t-primary  f6  black  pb2">
                      Quantity: {item.quantity}
                    </p>
                    <p className="t-primary  f6  black">Total: {item.price}</p>
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
      <section>
        <div className="pb4">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You don't have any previous orders."
            color="black"
            size="medium"
            truncate={null}
            reveal={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </section>
    );
  }

  return <p>Loading...</p>;
}
