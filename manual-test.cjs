const http = require('http');
const querystring = require('querystring');

// Helper function to make a request
function makeRequest(options, postData = '') {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({ status: res.statusCode, data: responseData });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    // Send the postData if it exists
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

// Test the user registration, valid login, and invalid login
async function testRegisterAndLoginUser() {
  // Step 1: Register the user
  const registerPostData = querystring.stringify({
    username: 'testUser',
    password: 'testPass'
  });

  const registerOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': registerPostData.length,
    }
  };

  try {
    const registerResult = await makeRequest(registerOptions, registerPostData);
    console.log('Registration Response:', registerResult.data);  // Log the response

    // Check if registration is successful
    if (registerResult.status === 200 && registerResult.data.includes('Registration successful')) {
      console.log('Register User: 200 true');
    } else {
      console.log('Register User: 200 false');
      return; // If registration fails, no need to proceed with login
    }

    // Step 2: Login the user after successful registration
    const loginPostData = querystring.stringify({
      username: 'testUser',
      password: 'testPass'
    });

    const loginOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': loginPostData.length,
      }
    };

    const loginResult = await makeRequest(loginOptions, loginPostData);
    console.log('Login Response:', loginResult.data);  // Log the response

    // Check if login is successful
    if (loginResult.status === 200 && loginResult.data.includes('Invalid credentials')) {
      console.log('Login User: 200 false');
    } else {
      console.log('Login User: 200 true');
    }

    // Step 3: Test invalid login
    const invalidLoginPostData = querystring.stringify({
      username: 'wrongUser',
      password: 'wrongPass'
    });

    const invalidLoginOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': invalidLoginPostData.length,
      }
    };

    const invalidLoginResult = await makeRequest(invalidLoginOptions, invalidLoginPostData);
    console.log('Invalid Login Response:', invalidLoginResult.data);  // Log the response

    // Check if invalid login returns the appropriate message
    if (invalidLoginResult.status === 200 && invalidLoginResult.data.includes('Invalid credentials')) {
      console.log('Invalid Login: 200 true');
    } else {
      console.log('Invalid Login: 200 false');
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run all tests
async function runTests() {
  await testRegisterAndLoginUser();
}

runTests();
