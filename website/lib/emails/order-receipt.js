import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email, name, products, session }) => {
  try {
    const title = `Your Receipt from Rendah Mag`;

    let productDetails = '';
    if (session.mode === 'subscription') {
      productDetails = `<tr><td style="text-align: left; padding-right: 15px;">Rendah Mag Membership</td></tr>`;
    } else {
      products.forEach((product) => {
        productDetails += `<tr><td style="text-align: left; padding-right: 15px;">${product.name} (${product.quantity})</td></tr>`;
      });
    }

    const shippingAddress = session.shipping.address;
    const shippingAddressTable = `
      <table>
        <tr>
          <th style="text-align: left; padding-right: 15px;">Shipping Address</th>
        </tr>
        <tr>
          <td style="text-align: left; padding-right: 15px;">${
            shippingAddress.line1
          }</td>
        </tr>
        ${
          shippingAddress.line2
            ? `<tr><td style="text-align: left; padding-right: 15px;">${shippingAddress.line2}</td></tr>`
            : ''
        }
        <tr>
          <td style="text-align: left; padding-right: 15px;">${
            shippingAddress.city
          }, ${shippingAddress.state || ''} ${shippingAddress.postal_code}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-right: 15px;">${
            shippingAddress.country
          }</td>
        </tr>
      </table>
    `;

    const billingAddress = session.customer_details.address;
    let billingAddressTable = '';
    if (billingAddress) {
      billingAddressTable = `
      <table>
        <tr>
          <th style="text-align: left; padding-right: 15px;">Billing Address</th>
        </tr>
        <tr>
          <td style="text-align: left; padding-right: 15px;">${
            billingAddress.line1
          }</td>
        </tr>
        ${
          billingAddress.line2
            ? `<tr><td style="text-align: left; padding-right: 15px;">${billingAddress.line2}</td></tr>`
            : ''
        }
        <tr>
          <td style="text-align: left; padding-right: 15px;">${
            billingAddress.city
          }, ${billingAddress.state || ''} ${billingAddress.postal_code}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-right: 15px;">${
            billingAddress.country
          }</td>
        </tr>
      </table>
      `;
    }

    const orderDetails = `
      <table>
        <tr>
          <th style="text-align: left; padding-right: 15px;">Product Name</th>
        </tr>
        ${productDetails}
      </table>
    `;

    const body = `
      ${orderDetails}
      <br />
      ${shippingAddressTable}
      <br />
      ${billingAddressTable}
    `;

    const sendSmtpEmail = {
      sender: { name: 'Rendah Mag', email: 'info@rendahmag.com' },
      to: [{ email }],
      subject: 'Your Receipt from Rendah Mag',
      htmlContent: emailCommon(title, body, null, null, null),
    };

    const { error } = await sendinblue(sendSmtpEmail);

    if (error) {
      throw new Error(error);
    }

    return { error: '' };
  } catch (error) {
    console.error(
      `Error in order receipt: ${error.message || error.toString()}`
    );
    return false;
  }
};
