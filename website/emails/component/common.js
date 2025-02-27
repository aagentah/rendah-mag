export default (title, body, image, buttonText, buttonLink) => {
  const emailTitle = title
    ? `
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td width="50" valign="top">
          </td>
          <td width="500" valign="top">
            <h1>${title}</h1>
          </td>
          <td width="50" valign="top">
          </td>
        </tr>
      </table>
    `
    : '';

  const emailBody = body
    ? `
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td width="50" valign="top">
          </td>
          <td width="500" valign="top">
            <p>${body}</p>
          </td>
          <td width="50" valign="top">
          </td>
        </tr>
        <tr>
          <td height="10">&nbsp;</td>
        </tr>
      </table>
      `
    : '';

  const emailImage = image
    ? `
        <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td width="50" valign="top">
            </td>
            <td width="500" valign="top">
              <img width="300" src="${image}" />
            </td>
            <td width="50" valign="top">
            </td>
          </tr>
          <tr>
            <td height="10">&nbsp;</td>
          </tr>
        </table>
        `
    : '';

  const emailButton =
    buttonText && buttonLink
      ? `
        <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td width="50" valign="top">
            </td>
            <td width="200" valign="top" style="text-align: justify; font-family: monospace, Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px;">
              <div>
                <a class="btn" href="${buttonLink}"
                  style="border-radius:0px;display:inline-block;font-family: monospace, Arial, Helvetica, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;"
                  >
                  ${buttonText}
                </a>
              </div>
            </td>
            <td width="300" valign="top">
            </td>
            <td width="50" valign="top">
            </td>
          </tr>
          <tr>
            <td height="10">&nbsp;</td>
          </tr>
        </table>
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
        u + #body a {
          color: inherit;
          font-size: inherit;
          font-family: monospace, Arial, Helvetica, sans-serif;
          font-weight: inherit;
          line-height: inherit;
        }
  
        body, .bg, td, p, span, strong, em, strong, ul, ol, li, h1, h2, h3, h4, h5 ,h6, h7, a:not(.btn), a[href]:not(.btn) {
          font-family: monospace, Arial, Helvetica, sans-serif;
          background: #ffffff !important;
          color: #111111 !important;
        }
  
        a.btn {
          background: #111111 !important;
          color: #ffffff !important;
          font-size: 16px !important;
          line-height: 50px !important;
        }
  
        @media (prefers-color-scheme: dark) {
          body, .bg, td, p, span, strong, em, strong, ul, ol, li, h1, h2, h3, h4, h5 ,h6, h7, a:not(.btn), a[href]:not(.btn) {
            background: #111111 !important;
            color: #ffffff !important;
          }
  
          a.btn {
            background: #111111 !important;
            color: #ffffff !important;
            outline: 1px solid #ffffff !important;
          }
  
          a, a[href] {
            color: #ffffff !important;
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
  
        td, p, a, a[href], span, strong, em, h2, h3, h4, h5, h6, ul, ol, li {
          font-size: 16px;
          line-height: 22px;
        }
        
        p, p:empty {
          min-height: 10px !important;
        }
  
        ul, ol {
          padding-left: 15px;
        }
  
        ul, li {
          text-align: left;
        }
  
        h1 {
          font-size: 20px;
          line-height: 28px;
        }
  
        .footnote {
          font-size: 16px !important;
          line-height: 22px !important;
        }
  
        @media only screen and (max-width:768px) {
          /* For mobile phones: */
          td, p, a, a[href], span, strong, em, h2, h3, h4, h5, h6, ul, ol, li {
            font-size: 26px !important;
            line-height: 38px !important;
          }
  
          a.btn {
            font-size: 24px !important;
            line-height: 52px !important;
          }
  
          h1 {
            font-size: 28px !important;
            line-height: 40px !important;
          }
  
          .footnote {
            font-size: 16px !important;
            line-height: 22px !important;
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
  
        a.phone {
          text-decoration: none;
          pointer-events: auto;
          cursor: default;
        }
  
        a {
          text-decoration: underline !important;
        }
  
        .showy {
          height: 100% !important;
          width: 100% !important;
        }
  
        .mcnPreviewText{
          display: none !important;
        }
      </style>
  
      <!--[if gte mso 9]>
        <style>
        /* Target Outlook 2007 and 2010 */
        </style>
      <![endif]-->
    </head>
  
    <body id="body">
      <!--*|IF:MC_PREVIEW_TEXT|*-->
      <!--[if !gte mso 9]><!---->
      <span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span>
      <div style="display: none; max-height: 0px; overflow: hidden;">
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <!--<![endif]-->
      <!--*|END:IF|*-->
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
                              <td width="600" valign="top" style="text-align: center;">
                                <a href="https://www.rendahmag.com/">
                                  <img style="border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;" width="600" src="https://mcusercontent.com/df0d549f92845c8dfc4d99dde/images/a51c9153-8cff-dcc3-927a-a8e87e1a0f3f.png" alt="Rendah Mag">
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td><br><br></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
  
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="600" valign="top">
                              ${emailTitle}
                              ${emailBody}
                              ${emailImage}
                              ${emailButton}
                              </td>
                            </tr>
                            <tr>
                              <td height="40">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
  
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="600" valign="top">
                                <hr>
                              </td>
                            </tr>
                            <tr>
                              <td height="40">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
  
  
                       <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="600"> <!-- Updated the width to 600px -->
                            <tr>
                              <td width="144" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://www.facebook.com/rendahmag" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/facebook_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://www.instagram.com/rendahmag/" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/instagram_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://twitter.com/RendahMag" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/twitter_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://soundcloud.com/rendahmag" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/soundcloud_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://discord.gg/gPkQF8n" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/discord_1.png" alt="">
                                </a>
                              </td>
                              <td width="144" valign="top"> <!-- Increased this width to account for the removed YouTube icon -->
                              </td>
                            </tr>
                            <tr>
                              <td height="40">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
  
  
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="50" valign="top">
                              </td>
                              <td mc:edit="description" width="500" style="text-align: center;">
                                <span class="footnote" style="color: #000000; font-size: 16px !important; line-height: 22px !important; text-align: center;">Rendah Mag Ltd.</span>
                                <span class="footnote" style="color: #000000; font-size: 16px !important; line-height: 22px !important; text-align: center;">|</span>
                                <a class="footnote" style="color: #000000; text-decoration: underline; font-size: 16px !important; line-height: 22px !important; text-align: center;" href="*|UNSUB|*">Unsubscribe</a>
                              </td>
                              <td width="50" valign="top">
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
  
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="600" valign="top" style="text-align: center;">
                                <img width="600" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607125368/email/ghost-padding.png" alt="Rendah Mag">
                              </td>
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
