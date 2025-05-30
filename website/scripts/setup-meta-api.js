/**
 * Setup verification script for Meta Conversions API
 * Run with: node scripts/setup-meta-api.js
 */

require('dotenv').config();

function checkSetup() {
  console.log('🔍 Checking Meta Conversions API setup...\n');

  // Check environment variables
  const requiredEnvVars = {
    META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
    SITE_URL: process.env.SITE_URL,
  };

  let allGood = true;

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: Configured`);
    } else {
      console.log(`❌ ${key}: Missing`);
      allGood = false;
    }
  });

  console.log('');

  // Check if files exist
  const fs = require('fs');
  const path = require('path');

  const requiredFiles = [
    'lib/meta/conversions-api.js',
    'pages/api/meta/track-pageview.js',
    'lib/utils/event-id.js',
  ];

  requiredFiles.forEach((file) => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}: Exists`);
    } else {
      console.log(`❌ ${file}: Missing`);
      allGood = false;
    }
  });

  console.log('');

  if (allGood) {
    console.log('🎉 Meta Conversions API setup looks good!');
    console.log('You can now run: node scripts/test-meta-api.js');
  } else {
    console.log('⚠️  Please fix the issues above before testing.');
  }

  console.log('\n📖 For more information, see: docs/META_CONVERSIONS_API.md');
}

checkSetup();
