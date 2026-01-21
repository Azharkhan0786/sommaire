// Read .env.local manually
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const Razorpay = require('razorpay');

console.log('\n=== TESTING RAZORPAY CREDENTIALS ===\n');

const keyId = env.RAZORPAY_KEY_ID;
const keySecret = env.RAZORPAY_KEY_SECRET;

console.log('KEY_ID:', keyId);
console.log('KEY_SECRET:', keySecret);
console.log('KEY_ID length:', keyId?.length);
console.log('KEY_SECRET length:', keySecret?.length);

if (!keyId || !keySecret) {
  console.error('\n❌ CREDENTIALS NOT FOUND IN .env.local\n');
  process.exit(1);
}

try {
  console.log('\n✓ Initializing Razorpay client...');
  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  console.log('✓ Razorpay client initialized');

  // Try to create an order
  console.log('\n✓ Attempting to create test order...');
  razorpay.orders.create({
    amount: 9000, // 90 INR in paise
    currency: 'INR',
    receipt: `test_${Date.now()}`,
  })
    .then((order) => {
      console.log('\n✅ SUCCESS! Order created:');
      console.log(JSON.stringify(order, null, 2));
      process.exit(0);
    })
    .catch((error) => {
      console.log('\n❌ ORDER CREATION FAILED:');
      console.log('Error:', error.message);
      console.log('Code:', error.code);
      console.log('Status:', error.statusCode);
      process.exit(1);
    });
} catch (error) {
  console.log('\n❌ INITIALIZATION FAILED:');
  console.log('Error:', error.message);
  process.exit(1);
}
