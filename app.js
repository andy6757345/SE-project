const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Routes for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html')); // Home page
});

// User login page
app.get('/user-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html')); // User login page
});

// Restaurant login page
app.get('/restaurant-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/restaurants.html')); // Restaurant page
});

// Delivery partner login page
app.get('/delivery-partner-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/delivery-partners.html')); // Delivery partner page
});

// Search page (For users)
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/search.html')); // Search page
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



