// ~/lib/stripe/final-retry.js

import fetch from 'isomorphic-unfetch';
import formatHttpError from '~/functions/formatHttpError';
import sendinblue from '~/lib/emails/sendinblue';
import emailCommon from '~/emails/component/common';

/**
 * Look up the customer’s email via your existing get-customer API.
 */
export async function fetchCustomerEmail(customerId) {
  const res = await fetch(`${process.env.SITE_URL}/api/stripe/get-customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stripeCustomerId: customerId }),
  });
  if (!res.ok) {
    throw new Error(`Customer lookup failed: ${await formatHttpError(res)}`);
  }
  const { customer } = await res.json();
  return customer.email;
}

/**
 * On the nth failed attempt, send a one-off “update your card” email.
 */
export async function sendFinalRetryEmail(email, attemptCount, timestamp) {
  const lastAttempt = new Date(timestamp * 1000).toLocaleDateString('en-GB');
  const title = 'Action required: update your payment method';
  const portalLink = 'https://billing.stripe.com/p/login/9AQaHtf4adFb99u288';

  const body = `
      <p>Hi there,</p>
      <p>We’ve tried to collect your membership payment <strong>${attemptCount} times</strong> (last attempt on ${lastAttempt}).</p>
      <p>Please <a href="${portalLink}">update your payment method</a> to continue the Rendah Mag membership!</p>
    `;

  const sendSmtpEmail = {
    sender: { name: 'Rendah Mag', email: 'info@rendahmag.com' },
    to: [{ email }],
    bcc: [{ email: 'info@rendahmag.com', name: 'Rendah Mag' }],
    subject: title,
    htmlContent: emailCommon(title, body, null, null, null),
  };

  const { error } = await sendinblue(sendSmtpEmail);
  if (error) {
    throw new Error(`Sendinblue error: ${error}`);
  }
}
