export default (title, body, image, buttonText, buttonLink) => {
  const emailTitle = title
    ? `
      <tr>
        <td>
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="150" valign="top">
              </td>
              <td width="300" valign="top">
                <h1 style="text-align: center;">${title}</h1>
              </td>
              <td width="150" valign="top">
              </td>
            </tr>
            <tr>
              <td height="30">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    `
    : '';

  const emailBody = body
    ? `
      <tr>
        <td>
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="150" valign="top">
              </td>
              <td width="300" valign="top">
                <p>${body}</p>
              </td>
              <td width="150" valign="top">
              </td>
            </tr>
            <tr>
              <td height="40">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
      `
    : '';

  const emailImage = image
    ? `
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="150" valign="top">
                </td>
                <td width="300" valign="top">
                  <img width="300" src="${image}" />
                </td>
                <td width="150" valign="top">
                </td>
              </tr>
              <tr>
                <td height="40">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        `
    : '';

  const emailButton =
    buttonText && buttonLink
      ? `
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="200" valign="top">
                </td>
                <td width="200" valign="top" style="text-align: justify; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px;">
                  <div>
                    <a class="btn" href="${buttonLink}"
                      style="border-radius:0px;display:inline-block;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;"
                     >
                      ${buttonText}
                    </a>
                  </div>
                </td>
                <td width="200" valign="top">
                </td>
              </tr>
              <tr>
                <td height="40">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        `
      : '';

  const email = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rendah Mag</title>

      <style type="text/css">
        body, .bg {
          background: #ffffff;
          color: #111111;
        }
        .btn {
          background: #111111;
          color: #ffffff;
        }
        @media (prefers-color-scheme: dark) {
          body, .bg {
            background: #111111;
            color: #ffffff;
          }
          .btn {
            background: #111111;
            color: #ffffff;
            outline: 1px solid #ffffff;;
          }
        }
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        #outlook a {
          padding: 0;
        }
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        p, ul, li, a, span, h1, h2, h3, h4, h5, h6 {
          text-align: justify;
          font-family: Arial, Helvetica, sans-serif;
          color: #000000;
          font-size: 16px;
          line-height: 22px;
        }
        h1 {
          font-size: 20px;
          line-height: 26px;
        }
        @media only screen and (max-width: 768px) {
          /* For mobile phones: */
          p, ul, li, a, span, h1, h2, h3, h4, h5, h6 {
            font-size: 20px;
            line-height: 26px;
          }
          h1 {
            font-size: 22px;
            line-height: 26px;
          }
        }
        table td {
          border-collapse: collapse;
        }
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          display: block;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
        a img {
          border: none;
        }
        a {
          text-decoration: none;
        }
        a.phone {
          text-decoration: none;
          pointer-events: auto;
          cursor: default;
        }
        .showy {
          height: 100% !important;
          width: 100% !important;
        }
      </style>
      <!--[if gte mso 9]>
      <style>
      /* Target Outlook 2007 and 2010 */
      </style>
    <![endif]-->
    </head>

    <body>
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0;padding: 0;width: 100%;line-height: 100% !important;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
        <tr>
          <td valign="top">
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="bg">
              <tr>
                <td valign="top">
                  <center class="bg">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600">

                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td height="10">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="290" valign="top">
                              </td>
                              <td width="80" valign="top" style="text-align: center;">
                                <a href="https://www.rendahmag.com/">
                                  <img width="80" style="width: 80px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1600125427/email/logo.png" alt="Rendah Mag">
                                </a>
                              </td>
                              <td width="290" valign="top">
                              </td>
                            </tr>
                            <tr>
                              <td height="30">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${emailTitle}
                      ${emailBody}
                      ${emailImage}
                      ${emailButton}

                      <tr style="border-top: 2px solid #808080;">
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td height="30">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="50" valign="top"></td>

                              <td width="22" valign="top"></td>
                              <td width="40" valign="top">
                                <a href="https://www.facebook.com/rendahmag/">
                                  <img width="40" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/w_40/v1527784080/brand/social/iconmonstr-facebook-5.png" alt="facebook">
                                </a>
                              </td>
                              <td width="22" valign="top"></td>

                              <td width="22" valign="top"></td>
                              <td width="40" valign="top">
                                <a href="https://www.instagram.com/rendahmag/">
                                  <img width="40" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/w_40/v1527784080/brand/social/iconmonstr-instagram-5.png" alt="instagram">
                                </a>
                              </td>
                              <td width="22" valign="top"></td>

                              <td width="22" valign="top"></td>
                              <td width="40" valign="top">
                                <a href="https://twitter.com/rendahmag">
                                  <img width="40" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/w_40/v1527784080/brand/social/iconmonstr-twitter-5.png" alt="twitter">
                                </a>
                              </td>
                              <td width="22" valign="top"></td>

                              <td width="22" valign="top"></td>
                              <td width="40" valign="top">
                                <a href="https://soundcloud.com/rendahmag">
                                  <img width="40" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/w_40/v1527784080/brand/social/iconmonstr-soundcloud-5.png" alt="soundcloud">
                                </a>
                              </td>
                              <td width="22" valign="top"></td>

                              <td width="22" valign="top"></td>
                              <td width="40" valign="top">
                                <a href="https://www.youtube.com/channel/UC4dYeD1ceX8sSY3J3UuMn8w">
                                  <img width="40" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/w_40/v1527784080/brand/social/iconmonstr-youtube-5.png" alt="youtube">
                                </a>
                              </td>
                              <td width="22" valign="top"></td>

                              <td width="22" valign="top"></td>
                              <td width="40" valign="top">
                                <a href="https://discordapp.com/invite/ev2Q22C">
                                  <img width="40" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/w_40/v1563543859/brand/social/iconmonstr-discord-5-240.png" alt="discord">
                                </a>
                              </td>
                              <td width="22" valign="top"></td>

                              <td width="50" valign="top">
                              </td>
                            </tr>
                            <tr>
                              <td height="30">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>
                  </center>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>

    </html>
  `;

  return email;
};
