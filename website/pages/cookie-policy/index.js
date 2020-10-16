import { Heading, Copy } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';


import { getSiteConfig } from '~/lib/sanity/requests';

export default function Error404({ siteConfig }) {
  return (
    <>
      <Layout
        navOffset="top"
        navOnWhite={true}
        meta={{
          siteConfig,
          title: 'Cookie Policy',
          description: null,
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pb4  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="COOKIE POLICY"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="rich-text  measure-wide  mla  mra  pb5">
            <div>
              <strong>Last updated October 07, 2020</strong>
            </div>
            <div>
              This Cookie Policy explains how Rendah Mag ("
              <strong>Company</strong>", "<strong>we</strong>", "
              <strong>us</strong>", and "<strong>our</strong>") uses cookies and
              similar technologies to recognize you when you visit our websites
              at{' '}
              <a
                href="https://www.rendahmag.com/"
                target="_blank"
                data-custom-class="link"
              >
                https://www.rendahmag.com/
              </a>
              , ("<strong>Websites</strong>"). It explains what these
              technologies are and why we use them, as well as your rights to
              control our use of them.
            </div>
            <div>
              In some cases we may use cookies to collect personal information,
              or that becomes personal information if we combine it with other
              information.{' '}
            </div>
            <div>
              <strong>What are cookies?</strong>
            </div>
            <div>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners in order to make their websites work, or to work
              more efficiently, as well as to provide reporting information.
            </div>
            <div>
              Cookies set by the website owner (in this case, Rendah Mag) are
              called "first party cookies". Cookies set by parties other than
              the website owner are called "third party cookies". Third party
              cookies enable third party features or functionality to be
              provided on or through the website (e.g. like advertising,
              interactive content and analytics). The parties that set these
              third party cookies can recognize your computer both when it
              visits the website in question and also when it visits certain
              other websites.
            </div>
            <div>
              <strong>Why do we use cookies?</strong>
            </div>
            <div>
              We use first and third party cookies for several reasons. Some
              cookies are required for technical reasons in order for our
              Websites to operate, and we refer to these as "essential" or
              "strictly necessary" cookies. Other cookies also enable us to
              track and target the interests of our users to enhance the
              experience on our Online Properties. Third parties serve cookies
              through our Websites for advertising, analytics and other
              purposes. This is described in more detail below.
            </div>
            <div>
              The specific types of first and third party cookies served through
              our Websites and the purposes they perform are described below
              (please note that the specific cookies served may vary depending
              on the specific Online Properties you visit):
            </div>
            <div>
              <strong>How can I control cookies?</strong>
            </div>
            <div>
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              the Cookie Consent Manager. The Cookie Consent Manager allows you
              to select which categories of cookies you accept or reject.
              Essential cookies cannot be rejected as they are strictly
              necessary to provide you with services.
            </div>
            <div>
              The Cookie Consent Manager can be found in the notification banner
              and on our website. If you choose to reject cookies, you may still
              use our website though your access to some functionality and areas
              of our website may be restricted. You may also set or amend your
              web browser controls to accept or refuse cookies. As the means by
              which you can refuse cookies through your web browser controls
              vary from browser-to-browser, you should visit your browser's help
              menu for more information.
            </div>
            <div>
              In addition, most advertising networks offer you a way to opt out
              of targeted advertising. If you would like to find out more
              information, please visit&nbsp;
              <a
                href="http://www.aboutads.info/choices/"
                target="_blank"
                data-custom-class="link"
              >
                http://www.aboutads.info/choices/
              </a>
              &nbsp;or&nbsp;
              <a
                href="http://www.youronlinechoices.com"
                target="_blank"
                data-custom-class="link"
                data-fr-linked="true"
              >
                http://www.youronlinechoices.com
              </a>
              .
            </div>
            <div>
              The specific types of first and third party cookies served through
              our Websites and the purposes they perform are described in the
              table below (please note that the specific&nbsp;cookies served may
              vary depending on the specific Online Properties you visit):
              <strong>
                <u>
                  <br />
                  <br />
                  Essential website cookies:
                </u>
              </strong>
            </div>
            <div>
              <div>
                These cookies are strictly necessary to provide you with
                services available through our Websites and to use some of its
                features, such as access to secure areas.
              </div>
              <section data-custom-class="body_text">
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>__tlbcpv</td>
                      </tr>
                      <tr>
                        <td>Purpose:</td>
                        <td>
                          Used to record unique visitor views of the consent
                          banner.
                        </td>
                      </tr>
                      <tr>
                        <td>Provider:</td>
                        <td>.termly.io</td>
                      </tr>
                      <tr>
                        <td>Service:</td>
                        <td>
                          Termly{' '}
                          <a
                            href="https://termly.io/our-privacy-policy/"
                            target="_blank"
                          >
                            View Service Privacy Policy
                          </a>{' '}
                        </td>
                      </tr>
                      <tr>
                        <td>Country:</td>
                        <td>United States</td>
                      </tr>
                      <tr>
                        <td>Type:</td>
                        <td>http_cookie</td>
                      </tr>
                      <tr>
                        <td>Expires in:</td>
                        <td>1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <div>
              <div>
                <strong>
                  <u>
                    <br />
                    Analytics and customization cookies:
                  </u>
                </strong>
              </div>
              <p>
                These cookies collect information that is used either in
                aggregate form to help us understand how our Websites are being
                used or how effective our marketing campaigns are, or to help us
                customize our Websites for you.
              </p>
              <div>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>_gat#</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            Enables Google Analytics regulate the rate of
                            requesting. It is a HTTP cookie type that lasts for
                            a session.
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Google Analytics{' '}
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 minute</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>_gid</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            Keeps an entry of unique ID which is then used to
                            come up with statistical data on website usage by
                            visitors. It is a HTTP cookie type and expires after
                            a browsing session.
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Google Analytics{' '}
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 day</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>_ga</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            It records a particular ID used to come up with data
                            about website usage by the user. It is a HTTP cookie
                            that expires after 2 years.
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Google Analytics{' '}
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 year 11 months 29 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>sc_anonymous_id</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            Used by soundcloud as a unique user id for a
                            listener listening from a another website with
                            soundcloud music embedded. Expires after 3650 days
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.soundcloud.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Soundcloud{' '}
                            <a
                              href="https://soundcloud.com/pages/privacy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>9 years 11 months 28 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <strong>
                <u>
                  <br />
                  Advertising cookies:
                </u>
              </strong>
            </div>
            <div>
              <p>
                These cookies are used to make advertising messages more
                relevant to you. They perform functions like preventing the same
                ad from continuously reappearing, ensuring that ads are properly
                displayed for advertisers, and in some cases selecting
                advertisements that are based on your interests.
              </p>
              <div>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>TapAd_TS</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            Used to determine what type of devices (smartphones,
                            tablets, computers, TVs etc.) is used by a user.
                            Expires after 2 months.
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.tapad.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Tapad{' '}
                            <a
                              href="https://www.tapad.com/privacy-policy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 month 29 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>TapAd_DID</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            Used to determine what type of devices (smartphones,
                            tablets, computers, TVs etc.) is used by a user.
                            Expires after 2 months.
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.tapad.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Tapad{' '}
                            <a
                              href="https://www.tapad.com/privacy-policy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>server_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 month 29 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <strong>
                <u>
                  <br />
                  Social networking cookies:
                </u>
              </strong>
            </div>
            <div>
              <p>
                These cookies are used to enable you to share pages and content
                that you find interesting on our Websites through third party
                social networking and other websites. These cookies may also be
                used for advertising purposes.
              </p>
              <div>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>personalization_id</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>
                            Used on sites that share Twitter content and with
                            Twitter share plugin. Persistent cookie that is set
                            for 730 days
                          </td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.twitter.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>
                            Twitter{' '}
                            <a
                              href="https://twitter.com/en/privacy"
                              target="_blank"
                            >
                              View Service Privacy Policy
                            </a>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>server_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 year 11 months 29 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <strong>
                <u>
                  <br />
                  Unclassified cookies:
                </u>
              </strong>
            </div>
            <div>
              <p>
                These are cookies that have not yet been categorized. We are in
                the process of classifying these cookies with the help of their
                providers.
              </p>
              <div>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>X-AB</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>sc-static.net</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>server_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 day</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>sp_t</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 month 29 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>sp_landing</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>open.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>server_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 day</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>_pin_unauth</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.open.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>11 months 30 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>snipcart_summary</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>www.rendahmag.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>html_local_storage</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>persistent</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>sc_at</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.snapchat.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>server_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 year 24 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>_scid</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 year 1 month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>TapAd_3WAY_SYNCS</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.tapad.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 month 29 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section data-custom-class="body_text">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>_sctr</td>
                        </tr>
                        <tr>
                          <td>Purpose:</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>Provider:</td>
                          <td>.spotify.com</td>
                        </tr>
                        <tr>
                          <td>Service:</td>
                          <td>__________ </td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>http_cookie</td>
                        </tr>
                        <tr>
                          <td>Expires in:</td>
                          <td>1 year 1 month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <strong>
                What about other tracking technologies, like web beacons?
              </strong>
            </div>
            <div>
              Cookies are not the only way&nbsp;to recognize or track visitors
              to a website. We may use other, similar technologies from time to
              time, like web beacons (sometimes called "tracking pixels" or
              "clear gifs"). These are tiny graphics files that contain a unique
              identifier that enable us to recognize when someone has visited
              our Websites or opened an e-mail including them. This allows us,
              for example, to monitor&nbsp;the traffic patterns of users from
              one page within a website to another, to deliver or communicate
              with cookies, to understand whether you have come to the website
              from an online advertisement displayed on a third-party website,
              to improve site performance, and to measure the success of e-mail
              marketing campaigns. In many instances, these technologies are
              reliant on cookies to function properly, and so declining cookies
              will impair their functioning.
            </div>
            <div>
              <strong>Do you use Flash cookies or Local Shared Objects?</strong>
            </div>
            <div>
              Websites may also use so-called "Flash Cookies" (also known as
              Local Shared Objects or "LSOs") to, among other things, collect
              and store information about your use of our services, fraud
              prevention and for other site operations.
            </div>
            <div>
              If you do not want Flash Cookies stored on your computer, you can
              adjust the settings of your Flash player to block Flash Cookies
              storage using the tools contained in the&nbsp;
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                target="_BLANK"
                data-custom-class="link"
              >
                Website Storage Settings Panel
              </a>
              . You can also control Flash Cookies by going to the&nbsp;
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                target="_BLANK"
                data-custom-class="link"
              >
                Global Storage Settings Panel
              </a>
              &nbsp;and&nbsp;following the instructions (which may include
              instructions that explain, for example, how to delete existing
              Flash Cookies (referred to "information" on the Macromedia site),
              how to prevent Flash LSOs from being placed on your computer
              without your being asked, and (for Flash Player 8 and later) how
              to block Flash Cookies that are not being delivered by the
              operator of the page you are on at the time).
            </div>
            <div>
              Please note that setting the Flash Player to restrict or limit
              acceptance of Flash Cookies may reduce or impede the functionality
              of some Flash applications, including, potentially, Flash
              applications used in connection with our services or online
              content.
            </div>
            <div>
              <strong>Do you serve targeted advertising?</strong>
            </div>
            <div>
              Third parties may serve cookies on your computer or mobile device
              to serve advertising through our Websites. These companies may use
              information about your visits to this and other websites in order
              to provide relevant advertisements about goods and services that
              you may be interested in. They may also employ technology that is
              used to measure the effectiveness of advertisements. This can be
              accomplished by them using cookies or web beacons to collect
              information about your visits to this and other sites in order to
              provide relevant advertisements about goods and services of
              potential interest to you. The information collected through this
              process does not enable us or them to identify your name, contact
              details or other details that directly identify you unless you
              choose to provide these.
            </div>
            <div>
              <strong>How often will you update this Cookie Policy?</strong>
            </div>
            <div>
              We may update&nbsp;this Cookie Policy from time to time in order
              to reflect, for example, changes to the cookies we use or for
              other operational, legal or regulatory reasons. Please therefore
              re-visit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </div>
            <div>
              The date at the top of this Cookie Policy indicates when it was
              last updated.
            </div>
            <div>
              <strong>Where can I get further information?</strong>
            </div>
            <div>
              If you have any questions about our use of cookies or other
              technologies, please email us at info@rendahmag.com or by post to:
            </div>
            <div>Rendah Mag</div>
            <div>__________</div>
            <div>__________</div>
            <div>United Kingdom</div>
            <div>Phone: __________</div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
