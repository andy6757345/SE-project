const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory "database"
const users = [];
const restaurants = [
  { id: 1, name: "Pizza Place", items: ["Pepperoni Pizza", "Cheese Pizza", "Veggie Pizza"] },
  { id: 2, name: "Burger Joint", items: ["Cheeseburger", "Veggie Burger", "Fries"] },
  { id: 3, name: "Sushi Spot", items: ["California Roll", "Sashimi", "Miso Soup"] }
];
let loggedInUser = null;

// Serve Login Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/login.html'));
});

// Register New User
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.send('User already exists! <a href="/">Go to Login</a>');
  }
  users.push({ username, password });
  res.send('Registration successful! <a href="/">Go to Login</a>');
});

// Login User
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    loggedInUser = user;
    res.redirect('/search');
  } else {
    res.send('Invalid credentials! <a href="/">Try again</a>');
  }
});

// Serve Search Page
app.get('/search', (req, res) => {
  if (!loggedInUser) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public/pages/search.html'));
});

// Serve Order Page
app.get('/order', (req, res) => {
  if (!loggedInUser) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public/pages/order.html'));
});

// Serve Payment Page
app.get('/payment', (req, res) => {
  if (!loggedInUser) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public/pages/payment.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const restaurantsData = []; // In-memory restaurant "database"
let loggedInRestaurant = null;

// Restaurant Login Page
app.get('/restaurant-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/restaurant-login.html'));
});

// Register New Restaurant
app.post('/restaurant-register', (req, res) => {
  const { restaurantName, password } = req.body;
  if (restaurantsData.find(r => r.restaurantName === restaurantName)) {
    return res.send('Restaurant already exists! <a href="/restaurant-login">Go to Login</a>');
  }
  restaurantsData.push({ restaurantName, password, orders: [] });
  res.send('Registration successful! <a href="/restaurant-login">Go to Login</a>');
});

// Login Restaurant
app.post('/restaurant-login', (req, res) => {
  const { restaurantName, password } = req.body;
  const restaurant = restaurantsData.find(r => r.restaurantName === restaurantName && r.password === password);
  if (restaurant) {
    loggedInRestaurant = restaurant;
    res.redirect('/restaurant-dashboard');
  } else {
    res.send('Invalid credentials! <a href="/restaurant-login">Try again</a>');
  }
});

// Serve Restaurant Dashboard
app.get('/restaurant-dashboard', (req, res) => {
  if (!loggedInRestaurant) return res.redirect('/restaurant-login');
  res.sendFile(path.join(__dirname, 'public/pages/restaurant-dashboard.html'));
});

// Fetch Orders for the Logged-In Restaurant
app.get('/restaurant-orders', (req, res) => {
  if (!loggedInRestaurant) return res.status(401).send('Unauthorized');
  res.json(loggedInRestaurant.orders);
});

// Accept/Reject Order
app.post('/update-order', (req, res) => {
  const { orderId, status } = req.body; // status: "accepted" or "rejected"
  const order = loggedInRestaurant.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    return res.json({ message: `Order ${status}` });
  }
  res.status(404).json({ message: 'Order not found' });
});
const deliveryPartnersData = []; // In-memory delivery partner "database"
let loggedInPartner = null;

// Delivery Partner Login Page
app.get('/delivery-partner-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/delivery-partner-login.html'));
});

// Register New Delivery Partner
app.post('/delivery-partner-register', (req, res) => {
  const { partnerName, password } = req.body;
  if (deliveryPartnersData.find(dp => dp.partnerName === partnerName)) {
    return res.send('Delivery partner already exists! <a href="/delivery-partner-login">Go to Login</a>');
  }
  deliveryPartnersData.push({ partnerName, password, orders: [] });
  res.send('Registration successful! <a href="/delivery-partner-login">Go to Login</a>');
});

// Login Delivery Partner
app.post('/delivery-partner-login', (req, res) => {
  const { partnerName, password } = req.body;
  const partner = deliveryPartnersData.find(dp => dp.partnerName === partnerName && dp.password === password);
  if (partner) {
    loggedInPartner = partner;
    res.redirect('/delivery-dashboard');
  } else {
    res.send('Invalid credentials! <a href="/delivery-partner-login">Try again</a>');
  }
});

// Serve Delivery Partner Dashboard
app.get('/delivery-dashboard', (req, res) => {
  if (!loggedInPartner) return res.redirect('/delivery-partner-login');
  res.sendFile(path.join(__dirname, 'public/pages/delivery-dashboard.html'));
});

// Fetch Orders for the Logged-In Partner
app.get('/delivery-orders', (req, res) => {
  if (!loggedInPartner) return res.status(401).send('Unauthorized');
  res.json(loggedInPartner.orders);
});

// Update Order Status by Delivery Partner
app.post('/update-delivery-status', (req, res) => {
  const { orderId, status } = req.body; // status: "picked_up" or "delivered"
  const order = loggedInPartner.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    return res.json({ message: `Order marked as ${status.replace('_', ' ')}` });
  }
  res.status(404).json({ message: 'Order not found' });
});
