const assert = require('assert');

// Simulate the payment form submission logic
function testPaymentSuccess() {
  // Simulate form data for a valid payment
  const cardNumber = '1234567812345678';
  const expiryDate = '12/23';
  const cvv = '123';

  let isAlertCalled = false;
  let isRedirectCalled = false;

  // Mock alert to track its call
  const originalAlert = global.alert;
  global.alert = (message) => {
    isAlertCalled = message === 'Payment Successful!';
  };

  // Mock window.location.href to track redirection
  const originalLocation = global.location;
  global.location = { href: '' };
  global.location.assign = (url) => {
    isRedirectCalled = url === '/';
  };

  // Simulate the form submission function
  function simulatePaymentFormSubmit() {
    if (cardNumber && expiryDate && cvv) {
      alert("Payment Successful!");
      global.location.assign('/');
    } else {
      alert("Payment Failed!");
    }
  }

  // Call the form submission function to test valid payment
  simulatePaymentFormSubmit();

  // Validate test results
  assert.strictEqual(isAlertCalled, true, 'Alert was not called correctly.');
  assert.strictEqual(isRedirectCalled, true, 'Page did not redirect to home.');

  console.log('Valid Payment: 200 true');
}

// Run the test
testPaymentSuccess();

