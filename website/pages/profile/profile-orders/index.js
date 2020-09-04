import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { Heading } from 'next-pattern-library';

export default function ProfileOrders({ customerOrders }) {
  console.log('customerOrders', customerOrders);
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
