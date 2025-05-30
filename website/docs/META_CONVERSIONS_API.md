# Meta Conversions API Implementation

## Overview

This implementation provides server-side tracking for Meta (Facebook) events to improve attribution accuracy and bypass browser tracking limitations like iOS 14.5+ restrictions and ad blockers.

## Features

- **Server-side Purchase tracking** - Triggered on Stripe checkout completion
- **Server-side InitiateCheckout tracking** - Triggered when checkout sessions are created
- **Server-side PageView tracking** - Optional backup for important pages
- **Event deduplication** - Prevents double-counting between browser pixel and server events
- **Rich customer data** - Leverages customer information from Stripe for better matching
- **Error handling** - Graceful degradation if Meta API is unavailable

## Setup

### 1. Environment Variables

Add your Meta access token to your environment variables:

```env
META_ACCESS_TOKEN=EAFTLx1VxkJYBOx9r73oVr2XydRmprTM0qbCn7U3wgNhXZCozPbVxwaQ8L0ry3CLfSSDPRX5vFksP4Irygx1wamGxWCXFEsp4pdsgH2KkpfPX3PneG3l8hFqlXRpJW3MxU7GbDcd7R5A0Kp6NkCY1kNSUCIhSpVefa628x5Voriz0oqqgUNE5ScGHIcbGCqAZDZD
```

### 2. Files Created/Modified

#### New Files:

- `website/lib/meta/conversions-api.js` - Core utility functions
- `website/pages/api/meta/track-pageview.js` - PageView tracking endpoint
- `website/lib/utils/event-id.js` - Client-side event ID generation

#### Modified Files:

- `website/pages/api/stripe/webhook.js` - Added Purchase tracking
- `website/pages/api/stripe/checkout-sessions.js` - Added InitiateCheckout tracking
- `website/pages/membership/thank-you/index.js` - Enhanced Purchase tracking with event IDs
- `website/pages/product/thank-you/index.js` - Enhanced Purchase tracking with event IDs
- `website/pages/membership/index.js` - Enhanced InitiateCheckout tracking with event IDs

## Event Tracking

### Purchase Events

**Triggered:** When Stripe checkout sessions are completed
**Location:** `website/pages/api/stripe/webhook.js`
**Data Included:**

- Customer email, phone, name (hashed)
- Shipping address (hashed)
- Order value and currency
- Product information
- Purchase timestamp

### InitiateCheckout Events

**Triggered:** When Stripe checkout sessions are created
**Location:** `website/pages/api/stripe/checkout-sessions.js`
**Data Included:**

- Price ID and quantity
- Purchase mode (subscription vs payment)
- User agent and IP address
- Checkout initiation timestamp

### PageView Events (Optional)

**Triggered:** Via API call from client-side
**Location:** `website/pages/api/meta/track-pageview.js`
**Usage:**

```javascript
// Send server-side PageView
fetch('/api/meta/track-pageview', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: window.location.href,
    userId: user?.id, // optional
  }),
});
```

## Event Deduplication

The implementation uses event IDs to prevent double-counting between browser pixel and server events:

1. **Server-side events** generate deterministic event IDs based on:

   - Event type
   - Order/session identifier
   - Timestamp

2. **Browser pixel events** use the same algorithm to generate matching event IDs

3. **Meta automatically deduplicates** events with matching event IDs and names

## Testing

### 1. Setup Verification

First, verify your setup is correct:

```bash
# Check if all files and environment variables are configured
node website/scripts/setup-meta-api.js
```

### 2. Test Events

Run the test script to verify API connectivity:

```bash
# Run comprehensive API tests
node website/scripts/test-meta-api.js
```

You can also use Meta's test functionality by temporarily adding a test event code:

```javascript
// In conversions-api.js, temporarily add test_event_code
const payload = {
  data: [eventData],
  test_event_code: 'TEST12345', // Add this for testing
  partner_agent: 'rendah-mag-server-v1.0',
};
```

### 3. Event Verification

Check in Meta Events Manager:

- Go to Events Manager → Conversions API
- Monitor Event Match Quality scores
- Check Deduplication rates
- Verify Data Freshness metrics

### 4. Debugging

Enable detailed logging:

```javascript
// In conversions-api.js
console.log('Sending Meta event:', JSON.stringify(eventData, null, 2));
```

## Performance Considerations

- **Non-blocking:** Meta API calls don't block critical payment flows
- **Error handling:** Failed Meta calls don't affect checkout completion
- **Async processing:** All tracking happens asynchronously
- **Rate limiting:** Consider implementing rate limiting for high-volume sites

## Data Privacy

- **PII Hashing:** All personally identifiable information is SHA-256 hashed
- **IP Masking:** Client IP addresses are used for attribution but not stored
- **GDPR Compliance:** Respects user consent preferences
- **Data Minimization:** Only collects necessary data for attribution

## Monitoring

### Key Metrics to Monitor:

1. **Event Match Quality** - How well customer data matches Facebook users
2. **Deduplication Rate** - Percentage of events successfully deduplicated
3. **Data Freshness** - Time delay between event occurrence and receipt
4. **Conversion Attribution** - Improved attribution vs pixel-only tracking

### Alert Conditions:

- Meta API response errors
- Event match quality below 60%
- Zero deduplication (indicates ID mismatch)
- Data freshness exceeding 1 hour

## Troubleshooting

### Common Issues:

1. **No events appearing in Meta**

   - Check access token validity
   - Verify pixel ID is correct
   - Ensure events are properly formatted

2. **Poor event match quality**

   - Add more customer data fields (phone, address)
   - Verify email/phone formatting
   - Check data hashing implementation

3. **No deduplication**

   - Verify event ID generation matches between client/server
   - Check event timing (timestamps should be close)
   - Ensure event names match exactly

4. **API rate limiting**
   - Implement exponential backoff
   - Batch events when possible
   - Monitor request frequency

## Future Enhancements

1. **Batch Processing** - Batch multiple events in single API calls
2. **Retry Logic** - Implement exponential backoff for failed requests
3. **Event Queuing** - Queue events during API outages
4. **Custom Audiences** - Use event data to build custom audiences
5. **Enhanced Attribution** - Track customer lifetime value and subscription events
