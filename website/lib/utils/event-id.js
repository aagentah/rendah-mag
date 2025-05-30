/**
 * Generate event ID for client-side tracking deduplication
 * @why: Matches server-side event ID generation for proper deduplication
 */
export function generateEventId(prefix, identifier, timestamp) {
  const data = `${prefix}_${identifier}_${timestamp}`;
  // Simple hash function for client-side (matches server-side logic)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

// CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateEventId };
}
