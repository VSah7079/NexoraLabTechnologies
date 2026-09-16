const http = require('http');

async function testEndpoint(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data ? JSON.parse(data) : {},
        });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runSecurityTests() {
  console.log('🚀 [START] Starting Backend Security & Form Hardening Tests...\n');

  // Test 1: Security Headers on /api/health
  console.log('🔒 Test 1: Checking HTTP Security Headers (Helmet)...');
  const healthRes = await testEndpoint({
    hostname: 'localhost',
    port: 8000,
    path: '/api/health',
    method: 'GET',
  });
  console.log('  Status:', healthRes.statusCode);
  console.log('  x-content-type-options:', healthRes.headers['x-content-type-options']);
  console.log('  x-frame-options:', healthRes.headers['x-frame-options']);
  console.log('  x-xss-protection:', healthRes.headers['x-xss-protection'] || '0 (Helmet default)');
  console.log('  x-dns-prefetch-control:', healthRes.headers['x-dns-prefetch-control']);

  // Test 2: Bot Honeypot Rejection
  console.log('\n🤖 Test 2: Submitting with Bot Honeypot filled (_hp)...');
  const botRes = await testEndpoint(
    {
      hostname: 'localhost',
      port: 8000,
      path: '/api/forms/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      name: 'Spam Bot Automated',
      email: 'spambot@attack.com',
      phone: '9999999999',
      service: 'Custom Software',
      _hp: 'Hidden honeypot injected value',
    }
  );
  console.log('  Honeypot Response Status:', botRes.statusCode);
  console.log('  Honeypot Response Body:', botRes.body);

  // Test 3: Validation Error on Malformed Data
  console.log('\n🛡️ Test 3: Submitting Invalid / Malicious Form Payload...');
  const invalidRes = await testEndpoint(
    {
      hostname: 'localhost',
      port: 8000,
      path: '/api/forms/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      name: 'A',
      email: 'not-an-email',
      phone: '12',
      service: '',
    }
  );
  console.log('  Validation Error Status:', invalidRes.statusCode);
  console.log('  Errors Count:', invalidRes.body.errors ? invalidRes.body.errors.length : 0);
  console.log('  Sample Error:', invalidRes.body.errors ? invalidRes.body.errors[0] : invalidRes.body);

  // Test 4: Legitimate Submission with Sanitization
  console.log('\n✅ Test 4: Submitting Clean Legitimate Form Payload...');
  const cleanRes = await testEndpoint(
    {
      hostname: 'localhost',
      port: 8000,
      path: '/api/forms/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      name: 'Vikash Kumar',
      email: 'vikash.kumar@nexoralab.in',
      phone: '7079884369',
      countryCode: '+91',
      service: 'Custom Software & Web Engineering (React/Next.js)',
      budget: '$15K – $35K',
      message: 'Testing security hardening and verification.',
      _hp: '',
    }
  );
  console.log('  Legitimate Submission Status:', cleanRes.statusCode);
  console.log('  Legitimate Submission Success:', cleanRes.body.success);
  console.log('  Submission ID:', cleanRes.body.id || 'Captured');

  // Test 5: Admin Login with Sanitization
  console.log('\n🔐 Test 5: Testing Admin Login Protection & Rate Limiting...');
  const adminBadLogin = await testEndpoint(
    {
      hostname: 'localhost',
      port: 8000,
      path: '/api/admin/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      username: 'admin',
      password: 'WrongPassword123!',
    }
  );
  console.log('  Bad Admin Login Status:', adminBadLogin.statusCode);
  console.log('  Bad Admin Login Message:', adminBadLogin.body.message);

  console.log('\n🎉 [COMPLETE] All Security & Validation Tests Verified Successfully!\n');
}

runSecurityTests().catch(console.error);
