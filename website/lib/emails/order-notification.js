import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default async ({ email, phone, name, products, session }) => {
  try {
    const title = `New order from ${name}!`;

    let productDetails = '';
    if (session.mode === 'subscription') {
      productDetails = `<tr><td>Membership</td><td>1</td></tr>`;
    } else {
      products.forEach((product) => {
        productDetails += `<tr><td>${product.name}</td><td>${product.quantity}</td></tr>`;
      });
    }

    const shippingAddress = session.shipping.address;

    // @why: Build single product and quantity values for the address table row based on session mode
    let productName, productQuantity;
    if (session.mode === 'subscription') {
      productName = 'Membership';
      productQuantity = '1';
    } else {
      // @why: For payment mode, combine multiple products into single display string
      if (products.length === 1) {
        productName = products[0].name;
        productQuantity = products[0].quantity.toString();
      } else {
        productName = products.map((p) => p.name).join(', ');
        productQuantity = products
          .reduce((sum, p) => sum + p.quantity, 0)
          .toString();
      }
    }

    const address = `
      <tr>
        <td>${productName}</td>
        <td>${productQuantity}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${name}</td>
        <td>${shippingAddress.line1}</td>
        <td>${shippingAddress.line2 || ''}</td>
        <td>${shippingAddress.city}</td>
        <td>${shippingAddress.state || ''}</td>
        <td>${shippingAddress.postal_code}</td>
        <td>${shippingAddress.country}</td>
      </tr>
    `;

    const body = `
      <table>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
        </tr>
        ${productDetails}
      </table>
      <br />
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Name</th>
          <th>Address Line 1</th>
          <th>Address Line 2</th>
          <th>City</th>
          <th>County/Province</th>
          <th>Post Code</th>
          <th>Country</th>
        </tr>
        ${address}
      </table>
    `;

    const image = null;

    const sendSmtpEmail = {
      sender: { name: 'Rendah Mag', email: 'info@rendahmag.com' },
      to: [{ email: 'dan@rendahmag.com' }],
      subject: 'New order',
      htmlContent: emailCommon(title, body, image, null, null),
    };

    const { error } = await sendinblue(sendSmtpEmail);

    if (error) {
      throw new Error(error);
    }

    return { error: '' };
  } catch (error) {
    console.error(
      `Error in welcome-dominion-subscription: ${
        error.message || error.toString()
      }`
    );

    return false;
  }
};
