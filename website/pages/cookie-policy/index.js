import Heading from '~/components/elements/heading';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function CookiePolicy({ siteConfig }) {
  const lastUpdated = 'June 9, 2025';
  const effectiveDate = 'June 9, 2025';
  const policyVersion = '2.1';

  return (
    <Layout
      navOffset="top"
      navOnWhite
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Cookie Policy - Rendah Mag',
        description: 'Comprehensive information about how Rendah Mag uses cookies, tracking technologies, and processes personal data in compliance with GDPR and UK data protection laws',
        image: null
      }}
      preview={null}
    >
      <Container>
        <div className="py-8  tac">
          <Heading
            htmlEntity="h1"
            text="COOKIE POLICY"
            color="black"
            size="large"
          />
        </div>
        <div className="rich-text rich-text-spacing gap-y-4 flex flex-col text-sm">

          <p><strong>Last updated: {lastUpdated}</strong></p>
          <p><strong>Effective date: {effectiveDate}</strong></p>
          <p><strong>Policy version: {policyVersion}</strong></p>

          <h2>1. Introduction</h2>
          <p>
            Rendah Mag ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>", "<strong>Company</strong>") operates the website <a href="https://www.rendahmag.com/" target="_blank" rel="noopener noreferrer">https://www.rendahmag.com/</a> (the "<strong>Site</strong>"). This Cookie Policy ("<strong>Policy</strong>") explains how we use cookies and similar tracking technologies when you visit our Site.
          </p>
          <p>
            This Policy should be read alongside our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>. By continuing to use our Site, you acknowledge that you have read and understood this Policy.
          </p>

          <h2>2. What Are Cookies &amp; Similar Technologies?</h2>
          <h3>2.1 Cookies</h3>
          <p>Cookies are small text files placed on your device by websites you visit. They contain information that is transferred to your device's hard drive and enable websites to recognise your device and remember certain information about your visit.</p>

          <h3>2.2 Types of Cookies by Duration</h3>
          <ul>
            <li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until manually deleted</li>
          </ul>

          <h3>2.3 Types of Cookies by Source</h3>
          <ul>
            <li><strong>First-party cookies:</strong> Set directly by our Site</li>
            <li><strong>Third-party cookies:</strong> Set by external service providers we work with</li>
          </ul>

          <h3>2.4 Similar Technologies</h3>
          <ul>
            <li><strong>Web beacons/Pixels:</strong> Tiny transparent graphics that track page views, email opens, and user interactions</li>
            <li><strong>Local storage:</strong> HTML5 local storage that allows websites to store data locally within your browser</li>
            <li><strong>Session storage:</strong> Temporary storage that exists only for the duration of your browser session</li>
            <li><strong>Device fingerprinting:</strong> Collection of device and browser characteristics to create a unique identifier</li>
            <li><strong>Server logs:</strong> Automatically collected information about your visits, including IP addresses and timestamps</li>
          </ul>

          <h2>3. Legal Basis for Processing</h2>
          <p>Under the UK General Data Protection Regulation (UK GDPR), Data Protection Act 2018, and Privacy and Electronic Communications Regulations (PECR), we process cookie data based on the following legal grounds:</p>

          <h3>3.1 Consent (Article 6(1)(a) UK GDPR)</h3>
          <ul>
            <li>For all non-essential cookies and tracking technologies</li>
            <li>Marketing and advertising cookies</li>
            <li>Analytics cookies beyond basic website functionality</li>
            <li>Social media integration cookies</li>
          </ul>

          <h3>3.2 Legitimate Interests (Article 6(1)(f) UK GDPR)</h3>
          <ul>
            <li>Website security and fraud prevention</li>
            <li>Basic website analytics for operational improvements</li>
            <li>Technical functionality and user experience optimisation</li>
          </ul>

          <h3>3.3 Legal Obligation (Article 6(1)(c) UK GDPR)</h3>
          <ul>
            <li>Cookies required to comply with legal or regulatory requirements</li>
            <li>Cookies necessary for tax or accounting purposes</li>
          </ul>

          <h3>3.4 Contractual Necessity (Article 6(1)(b) UK GDPR)</h3>
          <ul>
            <li>Essential cookies required to provide our services</li>
            <li>Authentication and session management</li>
          </ul>

          <h2>4. Categories of Cookies We Use</h2>

          <h3>4.1 Strictly Necessary Cookies</h3>
          <p><strong>Purpose:</strong> These cookies are essential for the basic functionality of our Site and cannot be disabled.</p>
          <ul>
            <li>Enable core website functionality</li>
            <li>Remember your cookie preferences</li>
            <li>Maintain security and prevent fraud</li>
            <li>Load balancing and network security</li>
          </ul>
          <p><strong>Legal basis:</strong> Contractual necessity and legitimate interests</p>
          <p><strong>Can be disabled:</strong> No</p>

          <h3>4.2 Performance &amp; Analytics Cookies</h3>
          <p><strong>Purpose:</strong> Help us understand how visitors interact with our Site to improve user experience.</p>
          <ul>
            <li>Collect anonymous usage statistics</li>
            <li>Monitor website performance and errors</li>
            <li>Understand user journey and popular content</li>
            <li>A/B testing for website optimisation</li>
          </ul>
          <p><strong>Legal basis:</strong> Consent and legitimate interests</p>
          <p><strong>Can be disabled:</strong> Yes</p>

          <h3>4.3 Functionality Cookies</h3>
          <p><strong>Purpose:</strong> Remember your preferences and settings to enhance your experience.</p>
          <ul>
            <li>Language and region preferences</li>
            <li>Font size and accessibility settings</li>
            <li>Content personalisation based on previous visits</li>
            <li>Remember login status and user preferences</li>
          </ul>
          <p><strong>Legal basis:</strong> Consent</p>
          <p><strong>Can be disabled:</strong> Yes</p>

          <h3>4.4 Targeting &amp; Advertising Cookies</h3>
          <p><strong>Purpose:</strong> Deliver relevant advertisements and measure advertising effectiveness.</p>
          <ul>
            <li>Show personalised advertisements</li>
            <li>Limit the number of times you see the same ad</li>
            <li>Measure advertising campaign effectiveness</li>
            <li>Build advertising profiles based on interests</li>
            <li>Cross-device tracking for consistent ad experience</li>
          </ul>
          <p><strong>Legal basis:</strong> Consent</p>
          <p><strong>Can be disabled:</strong> Yes</p>

          <h3>4.5 Social Media Cookies</h3>
          <p><strong>Purpose:</strong> Enable social media functionality and track social media engagement.</p>
          <ul>
            <li>Social media sharing buttons</li>
            <li>Embedded social media content</li>
            <li>Social media login functionality</li>
            <li>Track shares, likes, and social engagement</li>
          </ul>
          <p><strong>Legal basis:</strong> Consent</p>
          <p><strong>Can be disabled:</strong> Yes</p>

          <h2>5. Detailed Cookie Inventory</h2>
          <p><strong>Note:</strong> This list is regularly updated through automated cookie scanning. Some cookies may be set by third parties and their presence may vary.</p>

          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Provider</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>__tlbcpv</td>
                <td>Tracks cookie consent banner interactions and stores user preferences</td>
                <td>Termly (termly.io)</td>
                <td>Strictly Necessary</td>
                <td>1 year</td>
                <td>First-party</td>
              </tr>
              <tr>
                <td>CONSENT</td>
                <td>Stores cookie consent status and preferences across Google services</td>
                <td>Google (google.com)</td>
                <td>Strictly Necessary</td>
                <td>2 years</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>_ga</td>
                <td>Google Analytics - distinguishes unique users and calculates visitor metrics</td>
                <td>Google Analytics (google-analytics.com)</td>
                <td>Performance</td>
                <td>2 years</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>Google Analytics - distinguishes users and sessions for 24-hour period</td>
                <td>Google Analytics (google-analytics.com)</td>
                <td>Performance</td>
                <td>24 hours</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>_gat_gtag_UA_*</td>
                <td>Google Analytics - throttles request rate to limit data collection</td>
                <td>Google Analytics (google-analytics.com)</td>
                <td>Performance</td>
                <td>1 minute</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>sc_anonymous_id</td>
                <td>SoundCloud - creates unique anonymous identifier for embedded audio content</td>
                <td>SoundCloud (soundcloud.com)</td>
                <td>Functionality</td>
                <td>10 years</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>TapAd_TS</td>
                <td>Tapad - device graphing and cross-device tracking for advertising</td>
                <td>Tapad (tapad.com)</td>
                <td>Advertising</td>
                <td>2 months</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>TapAd_DID</td>
                <td>Tapad - device identification for cross-platform advertising</td>
                <td>Tapad (tapad.com)</td>
                <td>Advertising</td>
                <td>2 months</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>personalization_id</td>
                <td>Twitter - enables personalised content and advertising through Twitter widgets</td>
                <td>Twitter/X (twitter.com)</td>
                <td>Social Media</td>
                <td>2 years</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>guest_id</td>
                <td>Twitter - identifies users for embedded content and social features</td>
                <td>Twitter/X (twitter.com)</td>
                <td>Social Media</td>
                <td>2 years</td>
                <td>Third-party</td>
              </tr>
              <tr>
                <td>fr</td>
                <td>Facebook - advertising tracking and social plugin functionality</td>
                <td>Meta/Facebook (facebook.com)</td>
                <td>Advertising</td>
                <td>3 months</td>
                <td>Third-party</td>
              </tr>
            </tbody>
          </table>

          <h2>6. How to Manage Your Cookie Preferences</h2>

          <h3>6.1 Our Cookie Consent Manager</h3>
          <ul>
            <li><strong>First visit:</strong> You'll see our cookie banner allowing you to accept all, reject all, or customise your preferences</li>
            <li><strong>Granular control:</strong> Choose specific categories of cookies to accept or reject</li>
            <li><strong>Easy access:</strong> Change your preferences anytime via the "Cookie Preferences" link in our footer</li>
            <li><strong>Immediate effect:</strong> Changes take effect immediately and are remembered for future visits</li>
          </ul>

          <h3>6.2 Browser Controls</h3>
          <p>Most browsers allow you to manage cookies through their settings:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
            <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
            <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
          </ul>
          <p>For detailed instructions, visit <a href="https://www.allaboutcookies.org/manage-cookies/" target="_blank" rel="noopener noreferrer">AllAboutCookies.org</a></p>

          <h3>6.3 Third-Party Opt-Outs</h3>
          <ul>
            <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
            <li><strong>General advertising:</strong> <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
            <li><strong>European advertising:</strong> <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
            <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">NAI Consumer Opt-Out</a></li>
          </ul>

          <h3>6.4 Mobile Device Settings</h3>
          <ul>
            <li><strong>iOS:</strong> Settings &gt; Privacy &amp; Security &gt; Tracking</li>
            <li><strong>Android:</strong> Settings &gt; Privacy &gt; Ads</li>
          </ul>

          <h2>7. Consequences of Disabling Cookies</h2>
          <p>If you choose to disable certain cookies, some website functionality may be affected:</p>

          <h3>7.1 Disabling Essential Cookies</h3>
          <ul>
            <li>Website may not function properly</li>
            <li>Security features may be compromised</li>
            <li>User authentication may fail</li>
            <li>Some pages may not load correctly</li>
          </ul>

          <h3>7.2 Disabling Performance Cookies</h3>
          <ul>
            <li>We cannot improve website performance based on usage data</li>
            <li>Error reporting may be limited</li>
            <li>User experience optimisation may be reduced</li>
          </ul>

          <h3>7.3 Disabling Functionality Cookies</h3>
          <ul>
            <li>Your preferences will not be remembered</li>
            <li>You may need to re-enter information on each visit</li>
            <li>Personalised content will not be available</li>
          </ul>

          <h3>7.4 Disabling Advertising Cookies</h3>
          <ul>
            <li>You may see more irrelevant advertisements</li>
            <li>The same ads may appear repeatedly</li>
            <li>Cross-device advertising synchronisation will not work</li>
          </ul>

          <h2>8. Your Rights Under Data Protection Law</h2>
          <p>Under UK GDPR and DPA 2018, you have the following rights regarding data collected through cookies:</p>

          <h3>8.1 Right to Access (Article 15)</h3>
          <p>Request information about what personal data we process and receive a copy of that data.</p>

          <h3>8.2 Right to Rectification (Article 16)</h3>
          <p>Request correction of inaccurate or incomplete personal data.</p>

          <h3>8.3 Right to Erasure (Article 17)</h3>
          <p>Request deletion of your personal data in certain circumstances.</p>

          <h3>8.4 Right to Restrict Processing (Article 18)</h3>
          <p>Request limitation of processing of your personal data in specific situations.</p>

          <h3>8.5 Right to Data Portability (Article 20)</h3>
          <p>Request transfer of your personal data to another service provider in a structured format.</p>

          <h3>8.6 Right to Object (Article 21)</h3>
          <p>Object to processing based on legitimate interests or for direct marketing purposes.</p>

          <h3>8.7 Right to Withdraw Consent</h3>
          <p>Withdraw your consent for cookie processing at any time through our cookie preference centre.</p>

          <h3>8.8 Right to Lodge a Complaint</h3>
          <p>File a complaint with the Information Commissioner's Office (ICO) if you believe your rights have been violated.</p>

          <h2>9. International Data Transfers</h2>
          <p>Some of our third-party service providers may transfer your data outside the UK/EEA:</p>

          <h3>9.1 Safeguards</h3>
          <ul>
            <li><strong>Adequacy decisions:</strong> Transfers to countries with adequate data protection</li>
            <li><strong>Standard Contractual Clauses:</strong> EU-approved contractual protections</li>
            <li><strong>Binding Corporate Rules:</strong> Internal policies for multinational companies</li>
            <li><strong>Certification schemes:</strong> Industry-recognised data protection standards</li>
          </ul>

          <h3>9.2 Third-Party Processors</h3>
          <ul>
            <li><strong>Google (US):</strong> Standard Contractual Clauses and certification under EU-US Data Privacy Framework</li>
            <li><strong>Meta/Facebook (US):</strong> Standard Contractual Clauses</li>
            <li><strong>Twitter/X (US):</strong> Standard Contractual Clauses</li>
          </ul>

          <h2>10. Data Retention</h2>

          <h3>10.1 Cookie Retention Periods</h3>
          <ul>
            <li><strong>Session cookies:</strong> Deleted when browser is closed</li>
            <li><strong>Short-term cookies:</strong> 24 hours to 30 days</li>
            <li><strong>Medium-term cookies:</strong> 1 month to 1 year</li>
            <li><strong>Long-term cookies:</strong> 1-2 years (with your consent)</li>
          </ul>

          <h3>10.2 Data Processed Through Cookies</h3>
          <ul>
            <li><strong>Analytics data:</strong> Aggregated and anonymised after 26 months</li>
            <li><strong>Marketing data:</strong> Deleted within 3 years of last interaction</li>
            <li><strong>Functional data:</strong> Retained until consent is withdrawn or account is deleted</li>
          </ul>

          <h2>11. Automated Decision Making &amp; Profiling</h2>
          <p>We use cookies for the following automated processing:</p>

          <h3>11.1 Content Personalisation</h3>
          <ul>
            <li><strong>Purpose:</strong> Show relevant articles and recommendations</li>
            <li><strong>Logic:</strong> Based on reading history and content preferences</li>
            <li><strong>Impact:</strong> Affects which content is prominently displayed</li>
          </ul>

          <h3>11.2 Advertising Targeting</h3>
          <ul>
            <li><strong>Purpose:</strong> Deliver relevant advertisements</li>
            <li><strong>Logic:</strong> Based on interests, demographics, and browsing behaviour</li>
            <li><strong>Impact:</strong> Determines which ads you see</li>
          </ul>

          <p><strong>Your rights:</strong> You can object to automated decision making and request human intervention in decisions that significantly affect you.</p>

          <h2>12. Third-Party Services &amp; Processors</h2>

          <h3>12.1 Analytics Providers</h3>
          <ul>
            <li><strong>Google Analytics:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>Google Tag Manager:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>

          <h3>12.2 Advertising Networks</h3>
          <ul>
            <li><strong>Google Ads:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>Tapad:</strong> <a href="https://www.tapad.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>

          <h3>12.3 Social Media Platforms</h3>
          <ul>
            <li><strong>Meta/Facebook:</strong> <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>Twitter/X:</strong> <a href="https://twitter.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>SoundCloud:</strong> <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>

          <h3>12.4 Content Delivery &amp; Security</h3>
          <ul>
            <li><strong>Cloudflare:</strong> <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>

          <p><strong>Disclaimer:</strong> We are not responsible for the privacy practices of third-party services. Please review their privacy policies independently.</p>

          <h2>13. Cookie Auditing &amp; Compliance</h2>

          <h3>13.1 Regular Audits</h3>
          <ul>
            <li>Monthly automated cookie scanning</li>
            <li>Quarterly manual compliance reviews</li>
            <li>Annual third-party privacy assessments</li>
            <li>Continuous monitoring of consent rates and user preferences</li>
          </ul>

          <h3>13.2 Compliance Standards</h3>
          <ul>
            <li>UK GDPR and Data Protection Act 2018</li>
            <li>Privacy and Electronic Communications Regulations (PECR)</li>
            <li>ePrivacy Directive (if applicable)</li>
            <li>Industry best practices and guidelines</li>
          </ul>

          <h2>14. Updates to This Policy</h2>

          <h3>14.1 Notification of Changes</h3>
          <ul>
            <li><strong>Material changes:</strong> Email notification to registered users and prominent website notice</li>
            <li><strong>Minor updates:</strong> Updated "last modified" date and notification in our newsletter</li>
            <li><strong>New cookies:</strong> Re-consent may be required for new tracking technologies</li>
          </ul>

          <h3>14.2 Version Control</h3>
          <ul>
            <li>All versions archived for legal compliance</li>
            <li>Previous versions available upon request</li>
            <li>Change logs maintained for audit purposes</li>
          </ul>

          <h3>14.3 Review Schedule</h3>
          <ul>
            <li><strong>Regular review:</strong> Every 12 months minimum</li>
            <li><strong>Triggered reviews:</strong> When new technologies are implemented, legal requirements change, or business practices evolve</li>
          </ul>

          <h2>15. Contact Information</h2>

          <h3>15.1 General Inquiries</h3>
          <p>For questions about this Cookie Policy or our privacy practices:</p>
          <ul>
            <li><strong>Contact form:</strong> <a href="https://forms.gle/xpPtVhUiuzZzehdy8" target="_blank" rel="noopener noreferrer">Submit inquiry</a></li>
            <li><strong>Email:</strong> privacy@rendahmag.com</li>
            <li><strong>Response time:</strong> Within 30 days (as required by UK GDPR)</li>
          </ul>

          <h3>15.2 Data Protection Officer</h3>
          <p>For specific data protection concerns:</p>
          <ul>
            <li><strong>Email:</strong> dpo@rendahmag.com</li>
            <li><strong>Note:</strong> If we determine a DPO is not required under Article 37 UK GDPR, general privacy inquiries will be handled by our privacy team</li>
          </ul>

          <h3>15.3 Regulatory Authority</h3>
          <p>You have the right to lodge a complaint with:</p>
          <ul>
            <li><strong>Information Commissioner's Office (ICO)</strong></li>
            <li><strong>Website:</strong> <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            <li><strong>Phone:</strong> 0303 123 1113</li>
            <li><strong>Address:</strong> Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</li>
          </ul>

          <h2>16. Definitions</h2>
          <ul>
            <li><strong>Personal Data:</strong> Information relating to an identified or identifiable natural person</li>
            <li><strong>Processing:</strong> Any operation performed on personal data, including collection, storage, use, and deletion</li>
            <li><strong>Data Controller:</strong> The entity that determines the purposes and means of processing personal data</li>
            <li><strong>Data Processor:</strong> An entity that processes personal data on behalf of a data controller</li>
            <li><strong>Consent:</strong> Freely given, specific, informed, and unambiguous indication of agreement to processing</li>
            <li><strong>Data Subject:</strong> The individual to whom personal data relates</li>
          </ul>

          <hr />

          <p><em>This Cookie Policy is designed to be transparent, comprehensive, and compliant with UK data protection law. If you have any questions or concerns, please don't hesitate to contact us using the information provided above.</em></p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  return { props: { siteConfig } };
}