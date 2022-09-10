import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Error404({ siteConfig }) {
  return (
    <>
      <Layout
        navOffset="top"
        navOnWhite
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Privacy Policy',
          description: null,
          image: null
        }}
        preview={null}
      >
        <Container>
          <div className="pb4  tac">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Privacy Policy"
              color="black"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          {
            // https://htmltidy.net/
          }
          <div className="rich-text  measure-wide  mla  mra  pb5">
            <div>
              <p>
                <strong>
                  {' '}
                  <span>PRIVACY NOTICE</span>{' '}
                </strong>
              </p>
              <p>
                <strong>
                  {' '}
                  <span> Last updated January 01, 2021&nbsp; </span>{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <span>
                  {' '}
                  Thank you for choosing to be part of our community at Rendah
                  Mag (&ldquo;company&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to
                  protecting your personal information and your right to
                  privacy. If you have any questions or concerns about our
                  policy, or our practices with regards to your personal
                  information, please{' '}
                  <a href="https://forms.gle/xpPtVhUiuzZzehdy8">
                    contact us
                  </a>.{' '}
                </span>
              </p>
              <p>
                <span>
                  {' '}
                  When you visit our website{' '}
                  <a href="https://www.rendahmag.com/">
                    {' '}
                    https://www.rendahmag.com/{' '}
                  </a>{' '}
                  , and use our services, you trust us with your personal
                  information. We take your privacy very seriously. In this
                  privacy notice, we describe our privacy policy. We seek to
                  explain to you in the clearest way possible what information
                  we collect, how we use it and what rights you have in relation
                  to it. We hope you take some time to read through it
                  carefully, as it is important. If there are any terms in this
                  privacy policy that you do not agree with, please discontinue
                  use of our Sites and our services.{' '}
                </span>
              </p>
              <p>
                <span>
                  {' '}
                  This privacy policy applies to all information collected
                  through our website (such as{' '}
                  <a href="https://www.rendahmag.com/">
                    {' '}
                    https://www.rendahmag.com/{' '}
                  </a>{' '}
                  ), and/or any related services, sales, marketing or events (we
                  refer to them collectively in this privacy policy as the
                  &quot; <strong>Sites</strong>").&nbsp;{' '}
                </span>
              </p>
              <p>
                <strong>
                  {' '}
                  <span>
                    {' '}
                    Please read this privacy policy carefully as it will help
                    you make informed decisions about sharing your personal
                    information with us.&nbsp;{' '}
                  </span>{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <span> 1. WHAT INFORMATION DO WE COLLECT? </span> &nbsp;{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <span> Personal information you disclose to us </span>{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <em>
                    {' '}
                    <span>In Short:</span>{' '}
                  </em>{' '}
                  &nbsp;{' '}
                </strong>{' '}
                <span>
                  {' '}
                  <em>
                    {' '}
                    We collect personal information that you provide to us such
                    as name, address, contact information, passwords and
                    security data, and payment information.{' '}
                  </em>{' '}
                  &nbsp;{' '}
                </span>{' '}
                &nbsp;
              </p>
              <p>
                <span>
                  {' '}
                  We collect personal information that you voluntarily provide
                  to us when registering at the Sites&nbsp;expressing an
                  interest in obtaining information about us or our products and
                  services, when participating in activities on the Sites (such
                  as posting messages in our online forums or entering
                  competitions, contests or giveaways){' '}
                  <span> &nbsp;or otherwise contacting us. </span>{' '}
                </span>
              </p>
              <p>
                <span>
                  {' '}
                  The personal information that we collect depends on the
                  context of your interactions with us and the Sites, the
                  choices you make and the products and features you use. The
                  personal information we collect can include the following:{' '}
                </span>
              </p>
              <p>
                <strong>
                  {' '}
                  <span> Name and Contact Data. </span>{' '}
                </strong>{' '}
                <span>
                  {' '}
                  &nbsp;We collect your first and last name, email address,
                  postal address, phone number, and other similar contact data.{' '}
                </span>
              </p>
              <p>
                <strong>
                  {' '}
                  <span>Credentials.</span>{' '}
                </strong>{' '}
                <span>
                  {' '}
                  &nbsp;We collect passwords, password hints, and similar
                  security information used for authentication and account
                  access.{' '}
                </span>
              </p>
              <p>
                <strong>
                  {' '}
                  <span>Payment Data.</span>{' '}
                </strong>{' '}
                <span>
                  {' '}
                  &nbsp;We collect data necessary to process your payment if you
                  make purchases, such as your payment instrument number (such
                  as a credit card number), and the security code associated
                  with your payment instrument. All payment data is stored by
                  our payment processor and you should review its privacy
                  policies and contact the payment processor directly to respond
                  to your questions.{' '}
                </span>{' '}
                &nbsp;
              </p>
              <p>
                <span>
                  {' '}
                  All personal information that you provide to us must be true,
                  complete and accurate, and you must notify us of any changes
                  to such personal information.{' '}
                </span>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <span> Information collected from other sources </span>{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <em>
                    {' '}
                    <span>In Short:</span>&nbsp;{' '}
                  </em>{' '}
                </strong>{' '}
                <em>
                  {' '}
                  <span>
                    {' '}
                    We may collect limited data from public databases, marketing
                    partners, and other outside sources.&nbsp;{' '}
                  </span>{' '}
                </em>
              </p>
              <p>
                <span>
                  {' '}
                  We may obtain information about you from other sources, such
                  as public databases, joint marketing partners, as well as from
                  other third parties. Examples of the information we receive
                  from other sources include: social media profile information{' '}
                </span>{' '}
                <span>
                  {' '}
                  ; marketing leads and search results and links, including paid
                  listings (such as sponsored links).{' '}
                </span>
              </p>
              <p>
                <strong>
                  {' '}
                  <span> 2. HOW DO WE USE YOUR INFORMATION? </span> &nbsp;{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <em>
                    {' '}
                    <span>In Short:</span>&nbsp;{' '}
                  </em>{' '}
                </strong>{' '}
                <em>
                  {' '}
                  <span>
                    {' '}
                    We process your information for purposes based on legitimate
                    business interests, the fulfillment of our contract with
                    you, compliance with our legal obligations, and/or your
                    consent.{' '}
                  </span>{' '}
                </em>
              </p>
              <p>
                <span>
                  {' '}
                  We use personal information collected via our Sites for a
                  variety of business purposes described below. We process your
                  personal information for these purposes in reliance on our
                  legitimate business interests (&apos;Business Purposes&apos;),
                  in order to enter into or perform a contract with you
                  (&apos;Contractual&apos;), with your consent
                  (&apos;Consent&apos;), and/or for compliance with our legal
                  obligations (&apos;Legal Reasons&apos;). We indicate the
                  specific processing grounds we rely on next to each purpose
                  listed below.&nbsp;{' '}
                </span>{' '}
                &nbsp;
              </p>
              <p>
                <span>
                  {' '}
                  We use the information we collect or receive:&nbsp;{' '}
                </span>{' '}
                &nbsp;
              </p>
              <ul>
                <li>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      To facilitate account creation and logon process.{' '}
                    </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    If you choose to link your account with us to a third party
                    account *(such as your Google or Facebook account), we use
                    the information you allowed us to collect from those third
                    parties to facilitate account creation and logon process.
                    &nbsp;{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      To send you marketing and promotional communications.{' '}
                    </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We and/or our third party marketing partners may use
                    the personal information you send to us for our marketing
                    purposes, if this is in accordance with your marketing
                    preferences. You can opt-out of our marketing emails at any
                    time (see the &apos;{' '}
                  </span>{' '}
                  <span>
                    {' '}
                    <a href="#privacyrights">
                      {' '}
                      WHAT ARE YOUR PRIVACY RIGHTS{' '}
                    </a>{' '}
                  </span>{' '}
                  <span>&apos; below).</span> <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      To send administrative information to you.{' '}
                    </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your personal information to send you
                    product, service and new feature information and/or
                    information about changes to our terms, conditions, and
                    policies.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> Fulfill and manage your orders. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information to fulfill and manage your
                    orders, payments, returns, and exchanges made through the
                    Sites.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> To post testimonials. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We post testimonials on our Sites that may contain
                    personal information. Prior to posting a testimonial, we
                    will obtain your consent to use your name and testimonial.
                    If you wish to update, or delete your testimonial, please
                    <a href="https://forms.gle/xpPtVhUiuzZzehdy8">
                      contact us
                    </a>{' '}
                    and be sure to include your name, testimonial location, and
                    contact information.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> Deliver targeted advertising to you. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information to develop and display
                    content and advertising (and work with third parties who do
                    so) tailored to your interests and/or location and to
                    measure its effectiveness.&nbsp;{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> Administer prize draws and competitions. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information to administer prize draws
                    and competitions when you elect to participate in
                    competitions.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span>Request Feedback.</span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information to request feedback and to
                    contact you about your use of our Sites.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> To protect our Sites. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information as part of our efforts to
                    keep our Sites safe and secure (for example, for fraud
                    monitoring and prevention).{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> To enable user-to-user communications. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information in order to enable
                    user-to-user communications with each user's consent.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      To enforce our terms, conditions and policies.{' '}
                    </span>{' '}
                  </strong>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      To respond to legal requests and prevent harm.{' '}
                    </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;If we receive a subpoena or other legal request, we
                    may need to inspect the data we hold to determine how to
                    respond.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> For other Business Purposes. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may use your information for other Business
                    Purposes, such as data analysis, identifying usage trends,
                    determining the effectiveness of our promotional campaigns
                    and to evaluate and improve our Sites, products, services,
                    marketing and your experience.{' '}
                  </span>
                </li>
              </ul>
              <p>
                <strong>
                  {' '}
                  <span>
                    {' '}
                    3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?{' '}
                  </span>{' '}
                  &nbsp;{' '}
                </strong>{' '}
                &nbsp;
              </p>
              <p>
                <strong>
                  {' '}
                  <em>
                    {' '}
                    <span>In Short:</span>&nbsp;{' '}
                  </em>{' '}
                </strong>{' '}
                <em>
                  {' '}
                  <span>
                    {' '}
                    We only share information with your consent, to comply with
                    laws, to protect your rights, or to fulfill business
                    obligations.&nbsp;{' '}
                  </span>{' '}
                </em>
              </p>
              <div>
                <span>
                  {' '}
                  We may process or share data based on the following legal
                  basis:{' '}
                </span>
              </div>
              <ul>
                <li>
                  <span>
                    {' '}
                    <strong>Consent:</strong> We may process your data if you
                    have given us specific consent to use your personal
                    information in a specific purpose.&nbsp; <br /> <br />{' '}
                  </span>
                </li>
                <li>
                  <span>
                    {' '}
                    <strong>Legitimate Interests:</strong> We may process your
                    data when it is reasonably necessary to achieve our
                    legitimate business interests.&nbsp; <br /> <br />{' '}
                  </span>
                </li>
                <li>
                  <span>
                    {' '}
                    <strong>Performance of a Contract:&nbsp;</strong>Where we
                    have entered into a contract with you, we may process your
                    personal information to fulfill the terms of our
                    contract.&nbsp; <br /> <br />{' '}
                  </span>
                </li>
                <li>
                  <span>
                    {' '}
                    <strong>Legal Obligations:</strong> We may disclose your
                    information where we are legally required to do so in order
                    to comply with applicable law, governmental requests, a
                    judicial proceeding, court order, or legal process, such as
                    in response to a court order or a subpoena (including in
                    response to public authorities to meet national security or
                    law enforcement requirements).&nbsp; <br /> <br />{' '}
                  </span>
                </li>
                <li>
                  <span>
                    {' '}
                    <strong>Vital Interests:</strong> We may disclose your
                    information where we believe it is necessary to investigate,
                    prevent, or take action regarding potential violations of
                    our policies, suspected fraud, situations involving
                    potential threats to the safety of any person and illegal
                    activities, or as evidence in litigation in which we are
                    involved.{' '}
                  </span>
                </li>
              </ul>
              <p>
                <span>
                  {' '}
                  More specifically, we may need to process your data or share
                  your personal information in the following situations:{' '}
                </span>
              </p>
              <ul>
                <li>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      Vendors, Consultants and Other Third-Party Service
                      Providers.{' '}
                    </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may share your data with third party vendors,
                    service providers, contractors or agents who perform
                    services for us or on our behalf and require access to such
                    information to do that work. Examples include: payment
                    processing, data analysis, email delivery, hosting services,
                    customer service and marketing efforts. We may allow
                    selected third parties to use tracking technology on the
                    Sites, which will enable them to collect data about how you
                    interact with the Sites over time. This information may be
                    used to, among other things, analyze and track data,
                    determine the popularity of certain content and better
                    understand online activity. Unless described in this Policy,
                    we do not share, sell, rent or trade any of your information
                    with third parties for their promotional purposes.{' '}
                  </span>{' '}
                  &nbsp; <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span> Business Transfers. </span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;We may share or transfer your information in
                    connection with, or during negotiations of, any merger, sale
                    of company assets, financing, or acquisition of all or a
                    portion of our business to another company.{' '}
                  </span>{' '}
                  <br />{' '}
                </li>
                <li>
                  <strong>
                    {' '}
                    <span>Other Users.</span>{' '}
                  </strong>{' '}
                  <span>
                    {' '}
                    &nbsp;When you share personal information (for example, by
                    posting comments, contributions or other content to the
                    Sites) or otherwise interact with public areas of the Sites,
                    such personal information may be viewed by all users and may
                    be publicly distributed outside the Sites in perpetuity.
                    Similarly, other users will be able to view descriptions of
                    your activity, communicate with you within our Sites, and
                    view your profile.{' '}
                  </span>
                </li>
              </ul>
              <div>
                <p>
                  <strong>
                    {' '}
                    <span>
                      {' '}
                      4. WHO WILL YOUR INFORMATION BE SHARED WITH?{' '}
                    </span>{' '}
                    &nbsp;{' '}
                  </strong>{' '}
                  &nbsp;
                </p>
              </div>
              <div>
                <strong>
                  {' '}
                  <em>
                    {' '}
                    <span>In Short:</span>&nbsp;{' '}
                  </em>{' '}
                  &nbsp;{' '}
                </strong>{' '}
                <em>
                  {' '}
                  <span>
                    {' '}
                    We only share information with the following third parties.{' '}
                  </span>{' '}
                </em>
              </div>
              <div>&nbsp;</div>
              <div>
                <span>
                  {' '}
                  We only share and disclose your information with the following
                  third parties. We have categorized each party so that you may
                  be easily understand the purpose of our data collection and
                  processing practices. If we have processed your data based on
                  your consent and you wish to revoke your consent, please
                  contact us.{' '}
                </span>{' '}
                &nbsp;
              </div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <ul>
                              <li>
                                <span>
                                  {' '}
                                  <strong>Invoice and Billing</strong>{' '}
                                </span>{' '}
                                <br /> <span> Stripe </span>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <span>
                                  {' '}
                                  <strong>Retargeting Platforms</strong>{' '}
                                </span>{' '}
                                <br /> <span> Facebook Remarketing </span>
                              </li>
                            </ul>
                            <div>
                              <div>
                                <div>
                                  <ul>
                                    <li>
                                      <span>
                                        {' '}
                                        <strong>
                                          {' '}
                                          Web and Mobile Analytics{' '}
                                        </strong>{' '}
                                      </span>{' '}
                                      <br /> <span> Google Ads </span>{' '}
                                      <span> and Facebook Analytics </span>
                                    </li>
                                  </ul>
                                  <div>
                                    <div>
                                      <div>
                                        <div>
                                          <span>
                                            {' '}
                                            <strong>
                                              {' '}
                                              <span>
                                                {' '}
                                                5. DO WE USE COOKIES AND OTHER
                                                TRACKING TECHNOLOGIES?{' '}
                                              </span>{' '}
                                            </strong>{' '}
                                          </span>
                                        </div>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <em>
                                            {' '}
                                            <span>
                                              {' '}
                                              We may use cookies and other
                                              tracking technologies to collect
                                              and store your information.{' '}
                                            </span>{' '}
                                          </em>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            We may use cookies and similar
                                            tracking technologies (like web
                                            beacons and pixels) to access or
                                            store information. Specific
                                            information about how we use such
                                            technologies and how you can refuse
                                            certain cookies is set out in our
                                            Cookie Policy.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              6. HOW LONG DO WE KEEP YOUR
                                              INFORMATION?{' '}
                                            </span>{' '}
                                            &nbsp;{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <em>
                                            {' '}
                                            <span>
                                              {' '}
                                              We keep your information for as
                                              long as necessary to fulfill the
                                              purposes outlined in this privacy
                                              policy unless otherwise required
                                              by law.{' '}
                                            </span>{' '}
                                          </em>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            We will only keep your personal
                                            information for as long as it is
                                            necessary for the purposes set out
                                            in this privacy policy, unless a
                                            longer retention period is required
                                            or permitted by law (such as tax,
                                            accounting or other legal
                                            requirements). No purpose in this
                                            policy will require us keeping your
                                            personal information for longer than
                                            the period of time in which users
                                            have an account with us.{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            When we have no ongoing legitimate
                                            business need to process your
                                            personal information, we will either
                                            delete or anonymize it, or, if this
                                            is not possible (for example,
                                            because your personal information
                                            has been stored in backup archives),
                                            then we will securely store your
                                            personal information and isolate it
                                            from any further processing until
                                            deletion is possible.{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              7. HOW DO WE KEEP YOUR INFORMATION
                                              SAFE?&nbsp;{' '}
                                            </span>{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <em>
                                            {' '}
                                            <span>
                                              {' '}
                                              We aim to protect your personal
                                              information through a system of
                                              organisational and technical
                                              security measures.{' '}
                                            </span>{' '}
                                          </em>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            We have implemented appropriate
                                            technical and organisational
                                            security measures designed to
                                            protect the security of any personal
                                            information we process. However,
                                            please also remember that we cannot
                                            guarantee that the internet itself
                                            is 100% secure. Although we will do
                                            our best to protect your personal
                                            information, transmission of
                                            personal information to and from our
                                            Sites is at your own risk. You
                                            should only access the services
                                            within a secure environment.&nbsp;{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              8. DO WE COLLECT INFORMATION FROM
                                              MINORS?{' '}
                                            </span>{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <em>
                                            {' '}
                                            <span>
                                              {' '}
                                              We do not knowingly collect data
                                              from or market to children under
                                              18 years of age.{' '}
                                            </span>{' '}
                                          </em>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            We do not knowingly solicit data
                                            from or market to children under 18
                                            years of age. By using the Sites,
                                            you represent that you are at least
                                            18 or that you are the parent or
                                            guardian of such a minor and consent
                                            to such minor dependent&rsquo;s use
                                            of the Sites. If we learn that
                                            personal information from users less
                                            than 18 years of age has been
                                            collected, we will deactivate the
                                            account and take reasonable measures
                                            to promptly delete such data from
                                            our records. If you become aware of
                                            any data we have collected from
                                            children under age 18, please
                                            <a href="https://forms.gle/xpPtVhUiuzZzehdy8">
                                              contact us
                                            </a>
                                            .{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              9. WHAT ARE YOUR PRIVACY RIGHTS?{' '}
                                            </span>{' '}
                                            &nbsp;{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <span>
                                            {' '}
                                            <em>
                                              {' '}
                                              In some regions, such as the
                                              European Economic Area, you have
                                              rights that allow you greater
                                              access to and control over your
                                              personal information. You may
                                              review, change, or terminate your
                                              account at any time.{' '}
                                            </em>{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            In some regions (like the European
                                            Economic Area), you have certain
                                            rights under applicable data
                                            protection laws. These may include
                                            the right (i) to request access and
                                            obtain a copy of your personal
                                            information, (ii) to request
                                            rectification or erasure; (iii) to
                                            restrict the processing of your
                                            personal information; and (iv) if
                                            applicable, to data portability. In
                                            certain circumstances, you may also
                                            have the right to object to the
                                            processing of your personal
                                            information. To make such a request,
                                            please use the&nbsp;{' '}
                                          </span>{' '}
                                          <span>
                                            {' '}
                                            <a href="#contact">
                                              {' '}
                                              contact details{' '}
                                            </a>{' '}
                                          </span>{' '}
                                          <span>
                                            {' '}
                                            &nbsp;provided below. We will
                                            consider and act upon any request in
                                            accordance with applicable data
                                            protection laws.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            If we are relying on your consent to
                                            process your personal information,
                                            you have the right to withdraw your
                                            consent at any time. Please note
                                            however that this will not affect
                                            the lawfulness of the processing
                                            before its withdrawal.{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            If you are resident in the European
                                            Economic Area and you believe we are
                                            unlawfully processing your personal
                                            information, you also have the right
                                            to complain to your local data
                                            protection supervisory authority.
                                            You can find their contact details
                                            here:{' '}
                                          </span>{' '}
                                          &nbsp;{' '}
                                          <span>
                                            {' '}
                                            <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
                                              {' '}
                                              http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm{' '}
                                            </a>{' '}
                                            &nbsp;{' '}
                                          </span>{' '}
                                          <br /> &nbsp;
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              Account Information{' '}
                                            </span>{' '}
                                          </strong>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            If you would at any time like to
                                            review or change the information in
                                            your account or terminate your
                                            account, you can:&nbsp;{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          ■{' '}
                                          <span>
                                            {' '}
                                            Log into your account settings and
                                            update your user account.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            Upon your request to terminate your
                                            account, we will deactivate or
                                            delete your account and information
                                            from our active databases. However,
                                            some information may be retained in
                                            our files to prevent fraud,
                                            troubleshoot problems, assist with
                                            any investigations, enforce our
                                            Terms of Use and/or comply with
                                            legal requirements.{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <u>
                                              {' '}
                                              <span>
                                                {' '}
                                                Cookies and similar
                                                technologies:{' '}
                                              </span>{' '}
                                            </u>{' '}
                                            &nbsp;{' '}
                                          </strong>{' '}
                                          <span>
                                            {' '}
                                            &nbsp;Most Web browsers are set to
                                            accept cookies by default. If you
                                            prefer, you can usually choose to
                                            set your browser to remove cookies
                                            and to reject cookies. If you choose
                                            to remove cookies or reject cookies,
                                            this could affect certain features
                                            or services of our Sites. To opt-out
                                            of interest-based advertising by
                                            advertisers on our Sites visit&nbsp;{' '}
                                          </span>{' '}
                                          <span>
                                            {' '}
                                            <a href="http://www.aboutads.info/choices/">
                                              {' '}
                                              http://www.aboutads.info/choices/{' '}
                                            </a>{' '}
                                          </span>{' '}
                                          <span> . </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <u>
                                              {' '}
                                              <span>
                                                {' '}
                                                Opting out of email marketing:{' '}
                                              </span>{' '}
                                            </u>{' '}
                                            &nbsp;{' '}
                                          </strong>{' '}
                                          <span>
                                            {' '}
                                            You can unsubscribe from our
                                            marketing email list at any time by
                                            clicking on the unsubscribe link in
                                            the emails that we send or by
                                            contacting us using the details
                                            provided below. You will then be
                                            removed from the marketing email
                                            list &ndash; however, we will still
                                            need to send you service-related
                                            emails that are necessary for the
                                            administration and use of your
                                            account. To otherwise opt-out, you
                                            may:&nbsp;{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          ■{' '}
                                          <span>
                                            {' '}
                                            Note your preferences when you
                                            register an account with the site.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          ■{' '}
                                          <span>
                                            {' '}
                                            Contact us using the contact
                                            information provided.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          ■{' '}
                                          <span>
                                            {' '}
                                            Access your account settings and
                                            update preferences.{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              10. CONTROLS FOR DO-NOT-TRACK
                                              FEATURES{' '}
                                            </span>{' '}
                                            &nbsp;{' '}
                                          </strong>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            Most web browsers and some mobile
                                            operating systems and mobile
                                            applications include a Do-Not-Track
                                            (&ldquo;DNT&rdquo;) feature or
                                            setting you can activate to signal
                                            your privacy preference not to have
                                            data about your online browsing
                                            activities monitored and collected.
                                            No uniform technology standard for
                                            recognizing and implementing DNT
                                            signals has been finalized. As such,
                                            we do not currently respond to DNT
                                            browser signals or any other
                                            mechanism that automatically
                                            communicates your choice not to be
                                            tracked online. If a standard for
                                            online tracking is adopted that we
                                            must follow in the future, we will
                                            inform you about that practice in a
                                            revised version of this Privacy
                                            Policy.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              11. DO CALIFORNIA RESIDENTS HAVE
                                              SPECIFIC PRIVACY RIGHTS?{' '}
                                            </span>{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <em>
                                            {' '}
                                            <span>
                                              {' '}
                                              Yes, if you are a resident of
                                              California, you are granted
                                              specific rights regarding access
                                              to your personal
                                              information.&nbsp;{' '}
                                            </span>{' '}
                                          </em>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            California Civil Code Section
                                            1798.83, also known as the
                                            &ldquo;Shine The Light&rdquo; law,
                                            permits our users who are California
                                            residents to request and obtain from
                                            us, once a year and free of charge,
                                            information about categories of
                                            personal information (if any) we
                                            disclosed to third parties for
                                            direct marketing purposes and the
                                            names and addresses of all third
                                            parties with which we shared
                                            personal information in the
                                            immediately preceding calendar year.
                                            If you are a California resident and
                                            would like to make such a request,
                                            please submit your request in
                                            writing to us using the contact
                                            information provided below.{' '}
                                          </span>{' '}
                                          &nbsp;
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            If you are under 18 years of age,
                                            reside in California, and have a
                                            registered account with the Sites,
                                            you have the right to request
                                            removal of unwanted data that you
                                            publicly post on the Sites. To
                                            request removal of such data, please
                                            contact us using the contact
                                            information provided below, and
                                            include the email address associated
                                            with your account and a statement
                                            that you reside in California. We
                                            will make sure the data is not
                                            publicly displayed on the Sites, but
                                            please be aware that the data may
                                            not be completely or comprehensively
                                            removed from our systems.{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              12. DO WE MAKE UPDATES TO THIS
                                              POLICY?{' '}
                                            </span>{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <em>
                                              {' '}
                                              <span>
                                                {' '}
                                                In Short:{' '}
                                              </span> &nbsp;{' '}
                                            </em>{' '}
                                          </strong>{' '}
                                          <em>
                                            {' '}
                                            <span>
                                              {' '}
                                              Yes, we will update this policy as
                                              necessary to stay compliant with
                                              relevant laws.{' '}
                                            </span>{' '}
                                          </em>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            We may update this privacy policy
                                            from time to time. The updated
                                            version will be indicated by an
                                            updated &ldquo;Revised&rdquo; date
                                            and the updated version will be
                                            effective as soon as it is
                                            accessible. If we make material
                                            changes to this privacy policy, we
                                            may notify you either by prominently
                                            posting a notice of such changes or
                                            by directly sending you a
                                            notification. We encourage you to
                                            review this privacy policy
                                            frequently to be informed of how we
                                            are protecting your
                                            information.&nbsp;{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              13. HOW CAN YOU CONTACT US ABOUT
                                              THIS POLICY?{' '}
                                            </span>{' '}
                                          </strong>
                                        </p>
                                        <p>
                                          <span>
                                            {' '}
                                            If you have questions or comments
                                            about this policy, you may{' '}
                                            <a href="https://forms.gle/xpPtVhUiuzZzehdy8">
                                              contact us
                                            </a>
                                            :{' '}
                                          </span>
                                        </p>
                                        <p>
                                          <strong>
                                            {' '}
                                            <span>
                                              {' '}
                                              HOW CAN YOU REVIEW, UPDATE, OR
                                              DELETE THE DATA WE COLLECT FROM
                                              YOU?{' '}
                                            </span>{' '}
                                          </strong>
                                        </p>
                                        <div>
                                          <span>
                                            {' '}
                                            Based on the applicable laws of your
                                            country, you may have the right to
                                            request access to the personal
                                            information we collect from you,
                                            change that information, or delete
                                            it in some circumstances. To request
                                            to review, update, or delete your
                                            personal information, please visit:
                                            __________. We will respond to your
                                            request within 30 days.{' '}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig }
  };
}
