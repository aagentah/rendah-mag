import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function TermsAndConditions({ siteConfig }) {
  const lastUpdated = 'June 9, 2025';
  const effectiveDate = 'June 9, 2025';
  const termsVersion = '3.0';

  return (
    <Layout
      navOffset="top"
      navOnWhite
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Terms & Conditions - Rendah Mag',
        description: 'Comprehensive terms and conditions governing the use of Rendah Mag website, services, memberships, and digital content',
        image: null
      }}
      preview={null}
    >
      <Container>
        <div className="py-8 tac">
          <Heading
            htmlEntity="h1"
            text="TERMS & CONDITIONS"
            color="black"
            size="large"
          />
        </div>

        <div className="rich-text rich-text-spacing gap-y-4 flex flex-col text-sm">
          <p><strong>Last updated: {lastUpdated}</strong></p>
          <p><strong>Effective date: {effectiveDate}</strong></p>
          <p><strong>Version: {termsVersion}</strong></p>

          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions ("<strong>Terms</strong>", "<strong>Agreement</strong>") constitute a legally binding agreement between you ("<strong>User</strong>", "<strong>you</strong>", "<strong>your</strong>") and Rendah Mag ("<strong>Company</strong>", "<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>") regarding your access to and use of our website, services, and related offerings.
          </p>

          <h3>1.1 Acceptance of Terms</h3>
          <ul>
            <li>By accessing, browsing, or using our website at <a href="https://www.rendahmag.com/" target="_blank" rel="noopener noreferrer">https://www.rendahmag.com/</a> (the "<strong>Site</strong>"), you acknowledge that you have read, understood, and agree to be bound by these Terms.</li>
            <li>If you do not agree to these Terms, you must immediately discontinue use of the Site and our services.</li>
            <li>Your continued use of the Site following any modifications to these Terms constitutes acceptance of such modifications.</li>
          </ul>

          <h3>1.2 Capacity and Authority</h3>
          <ul>
            <li>You represent and warrant that you have the legal capacity to enter into this Agreement.</li>
            <li>If you are acting on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.</li>
            <li>You confirm that all information provided during registration or use of our services is accurate and complete.</li>
          </ul>

          <h2>2. Definitions</h2>
          <ul>
            <li><strong>"Account"</strong> means the user account created when you register for our services, including membership subscriptions or user profiles.</li>
            <li><strong>"Content"</strong> means all text, images, photographs, graphics, audio, video, data, software, and other materials available on or through the Site.</li>
            <li><strong>"Digital Products"</strong> means digital downloads, online archive access, exclusive digital content, and other non-physical products offered through the Site.</li>
            <li><strong>"Intellectual Property Rights"</strong> means all intellectual property rights worldwide, including copyright, trademarks, patents, trade secrets, moral rights, and other proprietary rights.</li>
            <li><strong>"Membership"</strong> means paid subscription services offering premium access to Content, exclusive features, or additional benefits.</li>
            <li><strong>"Personal Data"</strong> has the meaning given in our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and applicable data protection laws.</li>
            <li><strong>"Physical Products"</strong> means printed materials, merchandise, and other tangible goods sold through the Site.</li>
            <li><strong>"Services"</strong> means all services provided through the Site, including Content access, Membership subscriptions, e-commerce functionality, and community features.</li>
            <li><strong>"Third-Party Services"</strong> means services, content, or functionality provided by entities other than Rendah Mag that may be integrated with or accessible through the Site.</li>
            <li><strong>"User Content"</strong> means any content, including text, images, audio, video, comments, reviews, or other materials, that you submit, upload, or otherwise make available through the Site.</li>
          </ul>

          <h2>3. Eligibility and Registration</h2>

          <h3>3.1 Age Requirements</h3>
          <ul>
            <li>You must be at least 16 years old to use the Site.</li>
            <li>Users between 16-18 years old must have parental consent to use paid services or submit User Content.</li>
            <li>We reserve the right to request age verification at any time.</li>
          </ul>

          <h3>3.2 Registration Requirements</h3>
          <ul>
            <li>Certain features require registration and creation of an Account.</li>
            <li>You must provide accurate, current, and complete information during registration.</li>
            <li>You are responsible for maintaining the confidentiality of your Account credentials.</li>
            <li>You must promptly notify us of any unauthorised use of your Account.</li>
            <li>One person may not maintain multiple Accounts without our express permission.</li>
          </ul>

          <h3>3.3 Geographic Restrictions</h3>
          <ul>
            <li>The Site is intended for users in the United Kingdom and European Economic Area.</li>
            <li>We may restrict access from other jurisdictions based on legal requirements or business considerations.</li>
            <li>Users accessing the Site from other locations do so at their own risk and are responsible for compliance with local laws.</li>
          </ul>

          <h2>4. Modifications to Terms</h2>

          <h3>4.1 Right to Modify</h3>
          <ul>
            <li>We reserve the right to modify these Terms at any time in our sole discretion.</li>
            <li>Modifications may be necessary due to changes in law, business practices, or technological developments.</li>
          </ul>

          <h3>4.2 Notification of Changes</h3>
          <ul>
            <li><strong>Material changes:</strong> We will provide at least 30 days' notice via email to registered users and/or prominent notice on the Site.</li>
            <li><strong>Minor changes:</strong> Updated "Last updated" date and notification in our newsletter or on the Site.</li>
            <li>For significant changes affecting paid services, we may offer grandfathering or transition periods.</li>
          </ul>

          <h3>4.3 Acceptance of Changes</h3>
          <ul>
            <li>Continued use of the Site after the effective date constitutes acceptance of modified Terms.</li>
            <li>If you do not agree to modifications, you may terminate your Account and discontinue use.</li>
            <li>Termination due to rejected modifications does not entitle you to refunds unless specifically stated.</li>
          </ul>

          <h2>5. Use of the Site and Services</h2>

          <h3>5.1 Permitted Use</h3>
          <ul>
            <li>You may access and use the Site for personal, non-commercial purposes in accordance with these Terms.</li>
            <li>You may view, download, and print Content for personal use only.</li>
            <li>You may share Content using provided social sharing features.</li>
            <li>Commercial use requires our prior written consent and may be subject to additional terms.</li>
          </ul>

          <h3>5.2 Account Responsibilities</h3>
          <ul>
            <li>You are solely responsible for all activities occurring under your Account.</li>
            <li>You must maintain the security and confidentiality of your login credentials.</li>
            <li>You must promptly update Account information to keep it accurate and current.</li>
            <li>You may not share, transfer, or assign your Account to another person without our consent.</li>
          </ul>

          <h3>5.3 Technical Requirements</h3>
          <ul>
            <li>You are responsible for ensuring your devices and internet connection meet minimum technical requirements.</li>
            <li>We do not guarantee compatibility with all devices, browsers, or operating systems.</li>
            <li>System requirements may change and will be communicated through the Site or Account notifications.</li>
          </ul>

          <h2>6. Prohibited Activities</h2>

          <h3>6.1 General Prohibitions</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose or in violation of any applicable laws or regulations.</li>
            <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with any person or entity.</li>
            <li>Interfere with or disrupt the integrity, security, or performance of the Site or its underlying infrastructure.</li>
            <li>Attempt to gain unauthorised access to any portion of the Site, other user accounts, or computer systems.</li>
            <li>Use automated scripts, bots, crawlers, or other automated means to access or interact with the Site without our express permission.</li>
            <li>Circumvent any security measures or access restrictions implemented on the Site.</li>
            <li>Reverse engineer, decompile, or disassemble any software or technology used in connection with the Site.</li>
          </ul>

          <h3>6.2 Content-Related Prohibitions</h3>
          <p>You may not submit, upload, or otherwise make available any User Content that:</p>
          <ul>
            <li>Infringes upon the Intellectual Property Rights of any third party.</li>
            <li>Contains harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable material.</li>
            <li>Promotes discrimination, hatred, or violence against individuals or groups.</li>
            <li>Contains false, misleading, or deceptive information.</li>
            <li>Violates the privacy rights of any third party.</li>
            <li>Contains malware, viruses, or other harmful computer code.</li>
            <li>Constitutes spam, unsolicited advertising, or promotional material.</li>
            <li>Relates to illegal activities or encourages unlawful behaviour.</li>
          </ul>

          <h3>6.3 Commercial Restrictions</h3>
          <ul>
            <li>You may not use the Site for commercial purposes without our prior written consent.</li>
            <li>You may not reproduce, distribute, modify, or create derivative works of our Content without authorisation.</li>
            <li>You may not frame, mirror, or otherwise incorporate the Site into another website or service.</li>
            <li>You may not collect user information for commercial purposes or to create competing services.</li>
          </ul>

          <h2>7. Intellectual Property Rights</h2>

          <h3>7.1 Our Intellectual Property</h3>
          <ul>
            <li>All Content on the Site, including text, graphics, logos, images, audio, video, software, and design elements, is owned by or licensed to Rendah Mag.</li>
            <li>Our Content is protected by copyright, trademark, and other Intellectual Property Rights under UK, EU, and international law.</li>
            <li>The "Rendah Mag" name, logo, and associated trademarks are our exclusive property.</li>
            <li>No right, title, or interest in our Intellectual Property Rights is transferred to you through these Terms or your use of the Site.</li>
          </ul>

          <h3>7.2 Limited License to Users</h3>
          <ul>
            <li>We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Content for personal, non-commercial purposes.</li>
            <li>This license does not permit republication, redistribution, commercial use, or creation of derivative works.</li>
            <li>You may not remove, alter, or obscure any copyright, trademark, or other proprietary notices.</li>
            <li>Any unauthorised use immediately terminates your license and may subject you to legal action.</li>
          </ul>

          <h3>7.3 Digital Millennium Copyright Act (DMCA) Compliance</h3>
          <ul>
            <li>We respect intellectual property rights and expect users to do the same.</li>
            <li>If you believe your copyright has been infringed, please contact us at dmca@rendahmag.com with the following information:
              <ul>
                <li>Description of the copyrighted work claimed to be infringed</li>
                <li>Location of the allegedly infringing material on our Site</li>
                <li>Your contact information and a statement of good faith belief</li>
                <li>Statement of accuracy and authority to act on behalf of the copyright owner</li>
                <li>Your physical or electronic signature</li>
              </ul>
            </li>
            <li>We will investigate valid claims and remove infringing content where appropriate.</li>
            <li>Users who repeatedly infringe copyright may have their Accounts terminated.</li>
          </ul>

          <h2>8. User Content and Contributions</h2>

          <h3>8.1 User Content License</h3>
          <ul>
            <li>By submitting User Content, you grant us a worldwide, perpetual, irrevocable, royalty-free, sublicensable license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content.</li>
            <li>This license includes the right to use your User Content for promotional, marketing, and commercial purposes.</li>
            <li>You retain ownership of your User Content, but the license granted to us continues even if you delete your Account or remove the content.</li>
            <li>You may request removal of specific User Content by contacting us, though we are not obligated to comply.</li>
          </ul>

          <h3>8.2 User Content Representations</h3>
          <p>By submitting User Content, you represent and warrant that:</p>
          <ul>
            <li>You own or have the necessary rights to grant the license described above.</li>
            <li>Your User Content does not infringe upon the rights of any third party.</li>
            <li>Your User Content complies with all applicable laws and these Terms.</li>
            <li>You have obtained all necessary permissions and releases from individuals depicted in your User Content.</li>
          </ul>

          <h3>8.3 Content Moderation</h3>
          <ul>
            <li>We reserve the right, but have no obligation, to monitor, review, edit, or remove User Content at our sole discretion.</li>
            <li>We may remove User Content that violates these Terms or is otherwise objectionable.</li>
            <li>We may suspend or terminate Accounts of users who repeatedly violate our content policies.</li>
            <li>Content moderation decisions are final and not subject to appeal unless specifically provided.</li>
          </ul>

          <h2>9. Membership and Subscription Services</h2>

          <h3>9.1 Membership Terms</h3>
          <ul>
            <li>Membership subscriptions provide access to premium Content and exclusive features as described on the Site.</li>
            <li>Membership benefits may change over time, with reasonable notice provided to existing members.</li>
            <li>We reserve the right to modify, suspend, or discontinue Membership programs with appropriate notice.</li>
            <li>Membership is non-transferable and for personal use only unless otherwise specified.</li>
          </ul>

          <h3>9.2 Billing and Renewal</h3>
          <ul>
            <li>Membership subscriptions automatically renew at the then-current rate unless cancelled before the renewal date.</li>
            <li>You authorise us to charge your designated payment method for subscription fees, taxes, and applicable charges.</li>
            <li>If payment fails, we may suspend access until payment is resolved or cancel your subscription.</li>
            <li>Price changes will be communicated at least 30 days in advance for existing subscribers.</li>
          </ul>

          <h3>9.3 Cancellation</h3>
          <ul>
            <li>You may cancel your subscription at any time through your Account settings or by contacting us.</li>
            <li>Cancellation takes effect at the end of your current billing period.</li>
            <li>No refunds are provided for partial billing periods unless required by law.</li>
            <li>Access to premium features terminates when your subscription expires.</li>
          </ul>

          <h2>10. E-Commerce and Purchases</h2>

          <h3>10.1 Product Information</h3>
          <ul>
            <li>We strive to provide accurate product descriptions, images, and pricing information.</li>
            <li>Product availability, specifications, and prices may change without notice.</li>
            <li>We reserve the right to correct errors in product information or pricing.</li>
            <li>Colours and images may vary due to display settings and printing processes.</li>
          </ul>

          <h3>10.2 Orders and Payment</h3>
          <ul>
            <li>All orders are subject to acceptance and availability.</li>
            <li>We reserve the right to refuse or cancel orders for any reason, including suspected fraud.</li>
            <li>Payment is required in full at the time of order unless otherwise arranged.</li>
            <li>We accept payment methods displayed at checkout and may add or remove options at any time.</li>
            <li>You are responsible for any applicable taxes, duties, or fees.</li>
          </ul>

          <h3>10.3 Shipping and Delivery</h3>
          <ul>
            <li>Shipping costs and estimated delivery times are provided during checkout.</li>
            <li>Risk of loss transfers to you upon delivery to the address you provide.</li>
            <li>We are not responsible for delays caused by shipping carriers or customs authorities.</li>
            <li>International customers are responsible for customs duties and import taxes.</li>
          </ul>

          <h3>10.4 Returns and Refunds</h3>
          <ul>
            <li>Our return and refund policy is detailed in our separate <a href="/returns-policy" target="_blank" rel="noopener noreferrer">Returns & Refunds Policy</a>.</li>
            <li>Digital Products are generally non-refundable except as required by law.</li>
            <li>Physical Products may be returned within specified timeframes if in original condition.</li>
            <li>Custom or personalised items may not be eligible for return unless defective.</li>
          </ul>

          <h2>11. Privacy and Data Protection</h2>

          <h3>11.1 Privacy Policy</h3>
          <ul>
            <li>Your privacy is important to us. Our collection and use of Personal Data is governed by our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
            <li>By using the Site, you consent to the collection and use of information as described in our Privacy Policy.</li>
            <li>We implement appropriate security measures to protect your Personal Data.</li>
          </ul>

          <h3>11.2 Data Rights</h3>
          <ul>
            <li>You have rights regarding your Personal Data as described in our Privacy Policy and under applicable data protection laws.</li>
            <li>You may request access, correction, deletion, or portability of your Personal Data.</li>
            <li>You may withdraw consent for certain data processing activities.</li>
            <li>You may lodge complaints with relevant data protection authorities.</li>
          </ul>

          <h2>12. Third-Party Services and Content</h2>

          <h3>12.1 Third-Party Integration</h3>
          <ul>
            <li>The Site may integrate with or link to Third-Party Services such as payment processors, social media platforms, and analytics providers.</li>
            <li>Your use of Third-Party Services is subject to their respective terms and privacy policies.</li>
            <li>We are not responsible for the availability, accuracy, or content of Third-Party Services.</li>
            <li>Any transactions or interactions with third parties are solely between you and the third party.</li>
          </ul>

          <h3>12.2 Embedded Content</h3>
          <ul>
            <li>The Site may include embedded content from third parties (videos, audio, social media posts).</li>
            <li>Embedded content is governed by the terms and policies of the content provider.</li>
            <li>We do not control or endorse Third-Party Content and are not responsible for its accuracy or legality.</li>
          </ul>

          <h2>13. Disclaimers and Warranties</h2>

          <h3>13.1 General Disclaimers</h3>
          <ul>
            <li>THE SITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</li>
            <li>WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND TITLE.</li>
            <li>WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.</li>
            <li>WE MAKE NO REPRESENTATIONS REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF CONTENT.</li>
          </ul>

          <h3>13.2 Third-Party Disclaimers</h3>
          <ul>
            <li>WE DISCLAIM ALL LIABILITY FOR THIRD-PARTY SERVICES, CONTENT, OR PRODUCTS.</li>
            <li>ANY RELIANCE ON THIRD-PARTY INFORMATION IS AT YOUR OWN RISK.</li>
            <li>WE DO NOT ENDORSE OR GUARANTEE THIRD-PARTY OFFERINGS.</li>
          </ul>

          <h3>13.3 Performance Disclaimers</h3>
          <ul>
            <li>WE DO NOT GUARANTEE SPECIFIC RESULTS FROM USE OF THE SITE OR SERVICES.</li>
            <li>DOWNLOAD SPEEDS, STREAMING QUALITY, AND OTHER PERFORMANCE METRICS MAY VARY.</li>
            <li>SYSTEM MAINTENANCE AND UPGRADES MAY TEMPORARILY AFFECT AVAILABILITY.</li>
          </ul>

          <h2>14. Limitation of Liability</h2>

          <h3>14.1 Exclusion of Damages</h3>
          <ul>
            <li>TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</li>
            <li>THIS INCLUDES DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES.</li>
            <li>OUR EXCLUSION OF LIABILITY APPLIES REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, NEGLIGENCE, OR OTHERWISE).</li>
          </ul>

          <h3>14.2 Damage Cap</h3>
          <ul>
            <li>OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.</li>
            <li>FOR FREE SERVICES, OUR LIABILITY SHALL NOT EXCEED £100.</li>
            <li>THESE LIMITATIONS APPLY EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</li>
          </ul>

          <h3>14.3 Essential Purpose</h3>
          <ul>
            <li>THE LIMITATIONS IN THIS SECTION ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN US.</li>
            <li>THE SITE AND SERVICES WOULD NOT BE PROVIDED WITHOUT SUCH LIMITATIONS.</li>
            <li>SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS, SO THEY MAY NOT APPLY TO YOU.</li>
          </ul>

          <h2>15. Indemnification</h2>

          <h3>15.1 Your Indemnification Obligations</h3>
          <ul>
            <li>You agree to indemnify, defend, and hold harmless Rendah Mag, its officers, directors, employees, agents, licensors, and suppliers from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorney fees) arising out of or related to:</li>
            <li>Your use of the Site or Services in violation of these Terms.</li>
            <li>Your User Content or any infringement of third-party rights.</li>
            <li>Your violation of any applicable laws or regulations.</li>
            <li>Any negligent or wrongful conduct on your part.</li>
          </ul>

          <h3>15.2 Indemnification Process</h3>
          <ul>
            <li>We will notify you promptly of any claim subject to indemnification.</li>
            <li>You will have the right to control the defence and settlement of the claim.</li>
            <li>We may participate in the defence at our own expense.</li>
            <li>You may not settle any claim without our prior written consent.</li>
          </ul>

          <h2>16. Termination</h2>

          <h3>16.1 Termination by You</h3>
          <ul>
            <li>You may terminate your Account at any time by following the procedures in your Account settings or contacting us.</li>
            <li>Termination does not relieve you of obligations incurred prior to termination.</li>
            <li>Some provisions of these Terms survive termination as described below.</li>
          </ul>

          <h3>16.2 Termination by Us</h3>
          <ul>
            <li>We may suspend or terminate your Account immediately if you violate these Terms or engage in prohibited activities.</li>
            <li>We may terminate Accounts for convenience with reasonable notice.</li>
            <li>We may terminate Services entirely with appropriate notice to users.</li>
            <li>Termination for cause does not entitle you to refunds.</li>
          </ul>

          <h3>16.3 Effects of Termination</h3>
          <ul>
            <li>Upon termination, your right to access and use the Site immediately ceases.</li>
            <li>We may delete your Account data subject to legal retention requirements.</li>
            <li>Outstanding payment obligations survive termination.</li>
            <li>Licenses granted by you to us survive termination.</li>
          </ul>

          <h3>16.4 Survival</h3>
          <p>The following sections survive termination: Definitions, Intellectual Property Rights, User Content licenses, Payment obligations, Disclaimers, Limitation of Liability, Indemnification, Governing Law, and any other provisions that by their nature should survive.</p>

          <h2>17. Dispute Resolution</h2>

          <h3>17.1 Informal Resolution</h3>
          <ul>
            <li>Before initiating formal proceedings, you agree to attempt to resolve disputes informally by contacting us.</li>
            <li>We will work in good faith to resolve complaints within 30 days of receiving notice.</li>
            <li>Informal resolution may include mediation or other alternative dispute resolution methods.</li>
          </ul>

          <h3>17.2 Governing Law</h3>
          <ul>
            <li>These Terms are governed by and construed in accordance with the laws of England and Wales.</li>
            <li>The United Nations Convention on Contracts for the International Sale of Goods does not apply.</li>
            <li>Local consumer protection laws may also apply to your transactions.</li>
          </ul>

          <h3>17.3 Jurisdiction</h3>
          <ul>
            <li>Any legal action or proceeding shall be brought exclusively in the courts of England and Wales.</li>
            <li>You consent to the personal jurisdiction of such courts.</li>
            <li>This does not prevent us from seeking injunctive relief in any appropriate jurisdiction.</li>
          </ul>

          <h2>18. General Provisions</h2>

          <h3>18.1 Electronic Communications</h3>
          <ul>
            <li>You consent to receive communications from us electronically via email or notices posted on the Site.</li>
            <li>Electronic communications satisfy any legal requirement for written communication.</li>
            <li>You are responsible for maintaining current contact information.</li>
          </ul>

          <h3>18.2 Entire Agreement</h3>
          <ul>
            <li>These Terms, together with our Privacy Policy and any additional terms for specific Services, constitute the entire agreement between us.</li>
            <li>These Terms supersede all prior agreements and understandings relating to the subject matter.</li>
            <li>Any conflicting terms in other documents are superseded by these Terms unless specifically stated otherwise.</li>
          </ul>

          <h3>18.3 Severability</h3>
          <ul>
            <li>If any provision of these Terms is found invalid or unenforceable, the remaining provisions continue in full force and effect.</li>
            <li>Invalid provisions will be replaced with valid provisions that most closely reflect the original intent.</li>
            <li>The invalidity of one provision does not affect the validity of the entire Agreement.</li>
          </ul>

          <h3>18.4 Waiver</h3>
          <ul>
            <li>Our failure to enforce any provision does not constitute a waiver of our right to enforce it later.</li>
            <li>Waivers must be in writing and signed by our authorised representative.</li>
            <li>No waiver of any breach constitutes a waiver of any subsequent breach.</li>
          </ul>

          <h3>18.5 Assignment</h3>
          <ul>
            <li>We may assign or transfer these Terms and our rights and obligations without restriction.</li>
            <li>You may not assign these Terms or your Account without our prior written consent.</li>
            <li>Any attempted unauthorised assignment is void.</li>
          </ul>

          <h3>18.6 Force Majeure</h3>
          <ul>
            <li>We are not liable for delays or failures due to circumstances beyond our reasonable control.</li>
            <li>This includes natural disasters, government actions, labour disputes, internet failures, or other unforeseeable events.</li>
            <li>We will use reasonable efforts to minimise the impact of such events.</li>
          </ul>

          <h3>18.7 Relationship of Parties</h3>
          <ul>
            <li>No joint venture, partnership, employment, or agency relationship exists between you and us.</li>
            <li>Neither party has authority to bind the other except as expressly set forth in these Terms.</li>
            <li>We are independent contractors with respect to each other.</li>
          </ul>

          <h2>19. Contact Information</h2>

          <h3>19.1 General Contact</h3>
          <ul>
            <li><strong>Email:</strong> legal@rendahmag.com</li>
            <li><strong>Contact Form:</strong> <a href="https://forms.gle/xpPtVhUiuzZzehdy8" target="_blank" rel="noopener noreferrer">Submit inquiry</a></li>
            <li><strong>Response Time:</strong> We will respond to inquiries within 5 business days</li>
          </ul>

          <h3>19.2 Specific Concerns</h3>
          <ul>
            <li><strong>Copyright Claims:</strong> dmca@rendahmag.com</li>
            <li><strong>Privacy Matters:</strong> privacy@rendahmag.com</li>
            <li><strong>Billing Questions:</strong> billing@rendahmag.com</li>
            <li><strong>Technical Support:</strong> support@rendahmag.com</li>
          </ul>

          <h3>19.3 Legal Notices</h3>
          <ul>
            <li>Legal notices should be sent to: legal@rendahmag.com</li>
            <li>Notices are effective when received and confirmed by us</li>
            <li>For urgent legal matters, you may also send notices via registered mail</li>
          </ul>

          <hr />

          <p><strong>Acknowledgment:</strong> By using our Site and Services, you acknowledge that you have read these Terms, understand them, and agree to be bound by them. If you do not agree to these Terms, please discontinue use immediately.</p>

          <p><em>These Terms & Conditions are designed to be comprehensive and legally compliant. For questions about specific provisions or how they apply to your situation, please contact us using the information provided above.</em></p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  return { props: { siteConfig } };
}