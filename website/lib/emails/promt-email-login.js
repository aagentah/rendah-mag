// import nodemailer from 'nodemailer';
// import sgTransport from 'nodemailer-sendgrid-transport';
//
//
// const transporter = nodemailer.createTransport(
//   sgTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY,
//     },
//   })
// );
//
// export default (username, hash, salt) => {
//   const html = `
//     <p>
//       ${SITE_URL}/login?username=${username}&hash=${hash}&salt=${salt}&fwdRoute=profile
//     </p>
//   `;
//
//   console.log(
//     `/login?username=${username}&hash=${hash}&salt=${salt}&fwdRoute=profile`
//   );
//
//   const message = {
//     from: 'dannyjones360@gmail.com',
//     to: username,
//     subject: 'New message',
//     html,
//     replyTo: 'dannyjones360@gmail.com',
//   };
//
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(message, (error, info) =>
//       error ? reject(error) : resolve(info)
//     );
//   });
// };
//
import sendinblue from './sendinblue';

import { SITE_URL } from '../../constants';

export default (username, hash, salt) => {
  const html = `
    <div>
      <p>
        Click below to login and change your Rendah Mag password.
      </p>
      <p>
        ${SITE_URL}/login?username=${username}&hash=${hash}&salt=${salt}&fwdRoute=profile
      </p>
    </div>
    `;

  let sendSmtpEmail = {
    sender: {
      name: 'Rendah Mag',
      email: 'no-reply@rendahmag.com',
    },
    to: [
      {
        email: username,
      },
    ],
    subject: 'Reset your Rendah Mag password',
    htmlContent: html,
  };

  sendinblue(sendSmtpEmail);
};
