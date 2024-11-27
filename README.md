Food Delivery App
Project Overview
This is a simple food delivery application that allows users to:

Register and log in.
Browse restaurants, search for dishes, and place orders.
Make payments through a responsive UI.
It includes both server-side and client-side code, with automated tests to verify critical functionality.

# Directory Structure
# Please view directory Structure in code for proper understanding 
food-delivery/
├── node_modules/          # Installed dependencies
├── public/                # Static files for the frontend
│   ├── pages/             # HTML pages for the application
│   │   ├── delivery-dashboard.html
│   │   ├── home.html
│   │   ├── login.html
│   │   ├── order.html
│   │   ├── payment.html
│   │   ├── search.html
│   │   └── ... (other pages)
│   ├── index.html         # Entry point for the application
│   └── style.css          # Global styling
├── test/                  # Test files for automated testing
│   ├── server.test.cjs    # Tests for the backend functionality
│   ├── payment.test.cjs   # Tests for payment functionality
│   └── ... (other tests)
├── app.js                 # Main application logic
├── server.cjs             # Backend server script
├── script.js              # Client-side JavaScript
├── manual-test.cjs        # Script for manual testing
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file
├── .gitignore             # Git ignore file
└── README.md              # Instructions and project details

Setup Instructions:
1. Server Code Dependencies:
The server is built with Express and uses body-parser for parsing the request bodies. You also need path for serving HTML files.

express: For creating the server and handling routes.
body-parser: For parsing form data in the request body.
path: For resolving file paths, especially for serving HTML files.
Installation: To install these dependencies, you can run:

npm install express body-parser
2. Testing Code Dependencies:
The testing code is written to simulate user registration, login, and payment using HTTP requests. It uses assert for validating the test results.

http: For making HTTP requests.
querystring: For encoding form data into query strings.
assert: For making assertions in the test, ensuring that the expected results are met.
Installation: The built-in Node.js modules http, querystring, and assert do not require any installation as they come with Node.js.

Summary of Dependencies:
express - For the server code.
body-parser - For parsing request data.
path - For handling file paths in the server code.
http - For making HTTP requests in the testing code (built-in Node.js module).
querystring - For encoding form data (built-in Node.js module).
assert - For assertions in tests (built-in Node.js module).


After making sure the directory is as stated we can simply run the code by node server.cjs 
to run the test node manual-test.cjs and node payment.test.cjs




