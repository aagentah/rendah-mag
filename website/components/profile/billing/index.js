import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import BlockContent from '@sanity/block-content-to-react';
import fetch from 'isomorphic-unfetch';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Heading, Button, Copy, Input } from 'next-pattern-library';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import { getDominionPipeline } from '~/lib/sanity/requests';

export default function ProfileOrders() {
  const [user, { loading, mutate, error }] = useUser();
  const app = useApp();
  const dispatch = useDispatchApp();
  const stripe = useStripe();
  const elements = useElements();
  const [updateCardButtonLoading, setUpdateCardButtonLoading] = useState(false);
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);

  const updatePaymentMethod = async (paymentMethod) => {
    const response = await fetch(
      `${process.env.SITE_URL}/api/stripe/update-customer`,
      {
        body: JSON.stringify({
          email_address: user.username,
          paymentMethod: paymentMethod,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    if (response.ok) {
      // Success
      toast.success('Payment method updated');
    } else {
      // Error
      toast.error('There was an issue updating your Payment method.');
    }
  };

  const handleStripeCheck = async (event) => {
    // Block native form submission.
    event.preventDefault();

    // Prevent double submit
    if (updateCardButtonLoading) return false;

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateCardButtonLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      updatePaymentMethod(paymentMethod);
    }

    dispatch({ type: 'TOGGLE_LOADING' });
    setUpdateCardButtonLoading(false);
    return true;
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

  if (user) {
    return (
      <section>
        <div className="pb4">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Billing"
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <form noValidate className="w-100  mb4" onSubmit={handleStripeCheck}>
          <div className="pb3">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Payment Method"
              color="black"
              size="small"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="pa3  pa4-md  mb4  shadow2  br4">
            <CardElement />
          </div>

          <div className="flex  justify-end-md">
            <Button
              /* Options */
              type="primary"
              size="small"
              text="Update Card"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={updateCardButtonLoading}
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

        <form className="w-100  mb4" onSubmit={handleEditProfile}>
          <div className="pb3">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Shipping & Billing Address"
              color="black"
              size="small"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="pa3  pa4-md  mb4  shadow2  br4">
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
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
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
              color="black"
              size="small"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="pa3  pa4-md  mb4  shadow2  br4">
            <p class="t-body  f6  lh-copy  black">
              If you'd like to pause or cancel your Dominion Subscription,
              please email us at{' '}
              <a href="mailto:info@rendahmag.com">info@rendahmag.com</a>.
            </p>
          </div>
        </section>
      </section>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="No results."
      color="black"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
