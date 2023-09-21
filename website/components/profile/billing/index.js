import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import fetch from 'isomorphic-unfetch';
import { useStripe, useElements } from '@stripe/react-stripe-js';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Input from '~/components/elements/input';
import { useApp, useDispatchApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

export default function ProfileOrders() {
  const [user, { loading, mutate, error }] = useUser();
  const app = useApp();
  const dispatch = useDispatchApp();
  const stripe = useStripe();
  const elements = useElements();
  const [updateCardButtonLoading, setUpdateCardButtonLoading] = useState(false);
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  const getCustomer = async () => {
    const response = await fetch(
      `${process.env.SITE_URL}/api/stripe/get-customer`,
      {
        body: JSON.stringify({
          stripeCustomerId: user.stripeCustomerId,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    if (response.ok) {
      // Success
      setCustomer(await response.json());
    }
  };

  async function handleEditProfile(e) {
    e.preventDefault();

    // Prevent double submit
    if (updateButtonLoading) return false;

    const body = {
      address: {
        line1: e.currentTarget.line1.value,
        line2: e.currentTarget.line2.value,
        city: e.currentTarget.city.value,
        postal_code: e.currentTarget.postal_code.value,
        state: e.currentTarget.state.value,
        country: e.currentTarget.country.value,
      },
    };

    if (!body.address?.line1) {
      return toast.error('Please enter your Address Line 1');
    }

    if (!body.address?.city) {
      return toast.error('Please enter your City');
    }

    if (!body.address?.postal_code) {
      return toast.error('Please enter your Postal Code');
    }

    if (!body.address?.state) {
      return toast.error('Please enter your State/County');
    }

    if (!body.address?.country) {
      return toast.error('Please enter your Country');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(true);

    // Update user
    const response = await fetch(`${process.env.SITE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Success
      mutate(await response.json());
      toast.success('Successfully updated');
    } else {
      // Error
      toast.error('Error whilst updating, try again, or a different browser.');
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateButtonLoading(false);
    return true;
  }

  useEffect(() => {
    if (user && !customer) {
      getCustomer();
    }
  }, [customer]);

  if (user) {
    return (
      <section>
        <div className="ph3">
          <div className="profile_heading">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Billing"
              color="white"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          {customer ? (
            <div className="w-100  mb4  pt3  pt0-md">
              <div className="pb3">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text="Payment Method & Invoices"
                  color="white"
                  size="small"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="pa3  pa4-md  mb4  ba  bc-white  br4  flex  flex-wrap">
                <a
                  className="underline  f6  white"
                  target="_blank"
                  href={customer?.billingPortal?.url}
                >
                  Update Payment Method & View Invoices
                </a>
              </div>
            </div>
          ) : null}

          <form className="w-100  mb4" onSubmit={handleEditProfile}>
            <div className="pb3">
              <Heading
                /* Options */
                htmlEntity="h2"
                text="Shipping & Billing Address"
                color="white"
                size="small"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pa3  pa4-md  mb4  ba  bc-white  br4">
              <div className="flex  flex-wrap">
                <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
                  <div className="pv2">
                    <Input
                      /* Options */
                      type="text"
                      label="Address Line 1"
                      name="line1"
                      value={user?.address?.line1 || ''}
                      icon={null}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
                <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
                  <div className="pv2">
                    <Input
                      /* Options */
                      type="text"
                      label="Address Line 2"
                      name="line2"
                      value={user?.address?.line2 || ''}
                      icon={null}
                      required={false}
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
                <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
                  <div className="pv2">
                    <Input
                      /* Options */
                      type="text"
                      label="City"
                      name="city"
                      value={user?.address?.city || ''}
                      icon={null}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
                <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
                  <div className="pv2">
                    <Input
                      /* Options */
                      type="text"
                      label="Postal Code"
                      name="postal_code"
                      value={user?.address?.postal_code || ''}
                      icon={null}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
                <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
                  <div className="pv2">
                    <Input
                      /* Options */
                      type="text"
                      label="State/County"
                      name="state"
                      value={user?.address?.state || ''}
                      icon={null}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
                <div className="col-24  col-12-md  pr0  pr4-md  pb3  pb0-md">
                  <div className="pv2">
                    <Input
                      /* Options */
                      type="text"
                      label="Country"
                      name="country"
                      value={user?.address?.country || ''}
                      icon={null}
                      required
                      disabled={false}
                      readOnly={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex  justify-end-md">
              <Button
                /* Options */
                type="primary"
                size="small"
                text="Update Address"
                color="white"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={true}
                loading={updateButtonLoading}
                disabled={null}
                disabled={!stripe}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'form',
                }}
              />
            </div>
          </form>

          <section className="w-100  mb4">
            <div className="pb3">
              <Heading
                /* Options */
                htmlEntity="h2"
                text="Pause/Cancel Subscription"
                color="white"
                size="small"
                truncate={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="pa3  pa4-md  mb4  ba  bc-white  br4">
              <p className="t-secondary  f6  lh-copy  white">
                If you'd like to pause or cancel your Dominion Subscription,
                please email us at{' '}
                <a
                  className="white  underline"
                  href="mailto:info@rendahmag.com"
                >
                  info@rendahmag.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </section>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="No results"
      color="white"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
