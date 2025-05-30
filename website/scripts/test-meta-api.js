/**
 * Test script for Meta Conversions API implementation
 * Run with: node scripts/test-meta-api.js
 * Run with test mode: TEST_MODE=true node scripts/test-meta-api.js
 */

require('dotenv').config();

const {
  trackPurchase,
  trackInitiateCheckout,
  trackPageView,
} = require('../lib/meta/conversions-api.js');

// Test event code from Meta (update this with your current test code)
const TEST_EVENT_CODE = 'TEST53867';
const TEST_MODE = process.env.TEST_MODE === 'true';

// Mock Stripe session data for testing
const mockSession = {
  id: 'cs_test_1234567890',
  created: Math.floor(Date.now() / 1000),
  amount_total: 1200, // £12.00 in pence
  currency: 'gbp',
  mode: 'subscription',
  customer_details: {
    email: 'test@example.com',
    phone: '+447123456789',
  },
  shipping: {
    name: 'John Doe',
    address: {
      line1: '123 Test Street',
      city: 'London',
      postal_code: 'SW1A 1AA',
      country: 'GB',
    },
  },
};

const mockProducts = [
  {
    name: 'Membership',
    quantity: 1,
  },
];

async function testPurchaseEvent() {
  console.log('🧪 Testing Purchase event...');

  try {
    const result = await trackPurchase({
      session: mockSession,
      products: mockProducts,
      testEventCode: TEST_MODE ? TEST_EVENT_CODE : null,
    });

    if (result.success) {
      console.log('✅ Purchase event sent successfully');
      if (TEST_MODE) {
        console.log('🔍 Check Meta Test Events interface to see this event');
      }
    } else {
      console.log('❌ Purchase event failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Purchase event error:', error);
  }
}

async function testInitiateCheckoutEvent() {
  console.log('🧪 Testing InitiateCheckout event...');

  try {
    const result = await trackInitiateCheckout({
      sessionUrl: 'https://rendahmag.com/membership',
      priceId: 'price_test_membership',
      quantity: 1,
      mode: 'subscription',
      userAgent: 'Mozilla/5.0 (Test Browser)',
      clientIp: '127.0.0.1',
      testEventCode: TEST_MODE ? TEST_EVENT_CODE : null,
    });

    if (result.success) {
      console.log('✅ InitiateCheckout event sent successfully');
      if (TEST_MODE) {
        console.log('🔍 Check Meta Test Events interface to see this event');
      }
    } else {
      console.log('❌ InitiateCheckout event failed:', result.error);
    }
  } catch (error) {
    console.error('❌ InitiateCheckout event error:', error);
  }
}

async function testPageViewEvent() {
  console.log('🧪 Testing PageView event...');

  try {
    const result = await trackPageView({
      url: 'https://rendahmag.com/membership',
      userAgent: 'Mozilla/5.0 (Test Browser)',
      clientIp: '127.0.0.1',
      userId: 'test-user-123',
      testEventCode: TEST_MODE ? TEST_EVENT_CODE : null,
    });

    if (result.success) {
      console.log('✅ PageView event sent successfully');
      if (TEST_MODE) {
        console.log('🔍 Check Meta Test Events interface to see this event');
      }
    } else {
      console.log('❌ PageView event failed:', result.error);
    }
  } catch (error) {
    console.error('❌ PageView event error:', error);
  }
}

async function runTests() {
  if (TEST_MODE) {
    console.log('🧪 Starting Meta Conversions API tests in TEST MODE...');
    console.log(`🔑 Using test event code: ${TEST_EVENT_CODE}\n`);
  } else {
    console.log(
      '🚀 Starting Meta Conversions API tests in PRODUCTION MODE...\n'
    );
  }

  // Check if access token is configured
  if (!process.env.META_ACCESS_TOKEN) {
    console.error('❌ META_ACCESS_TOKEN environment variable not set');
    console.log('Please add your Meta access token to your .env file');
    process.exit(1);
  }

  await testPurchaseEvent();
  console.log('');

  await testInitiateCheckoutEvent();
  console.log('');

  await testPageViewEvent();
  console.log('');

  console.log('🏁 Tests completed!');

  if (TEST_MODE) {
    console.log(
      '🔍 Check your Meta Events Manager Test Events tab to see the events'
    );
  } else {
    console.log(
      '📊 Check your Meta Events Manager History tab to see the events'
    );
  }
}

// Run tests
runTests().catch(console.error);
