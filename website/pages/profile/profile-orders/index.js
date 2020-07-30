import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';

import {
  Modal,
  Heading,
  Button,
  Copy,
  Icon,
  Input,
  Label,
  Image,
} from 'next-pattern-library';

import { useApp, useDispatchApp } from '../../../context-provider/app';
import { useUser } from '../../../lib/hooks';

export default function ProfileOrders({ customerOrders }) {
  const app = useApp();
  const dispatch = useDispatchApp();
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [user, { mutate }] = useUser();
  const { addToast } = useToasts();

  if (customerOrders?.length) {
    return (
      <>
        <div className="pb3">
          <section className="pb5">
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
                <div className="bg-almost-white  pa2  shadow1">
                  {order.items.map((item, i) => (
                    <div className="bg-almost-white  pa3">
                      <p class="t-primary  f6  black  pb2">Name: {item.name}</p>
                      <p class="t-primary  f6  black  pb2">
                        Quantity: {item.quantity}
                      </p>
                      <p class="t-primary  f6  black">Total: {item.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }

  if (customerOrders?.length === 0) {
    return (
      <>
        <div className="pb3">
          <section className="pb5">
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
        </div>
      </>
    );
  }

  return <p>Loading...</p>;
}
