const restaurants = [
    { name: "Pizza Place", items: ["Pepperoni Pizza", "Cheese Pizza", "Veggie Pizza"] },
    { name: "Burger Joint", items: ["Cheeseburger", "Veggie Burger", "Fries"] },
    { name: "Sushi Spot", items: ["California Roll", "Sashimi", "Miso Soup"] }
  ];
  
  // Function to display restaurants on home page
  function displayRestaurants() {
    const restaurantList = document.getElementById("restaurantList");
    restaurants.forEach(restaurant => {
      const li = document.createElement("li");
      li.textContent = restaurant.name;
      restaurantList.appendChild(li);
    });
  }
  
  // Function to search for restaurants
  function searchRestaurants() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = ""; // Clear previous results
  
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchInput)
    );
  
    filteredRestaurants.forEach(restaurant => {
      const li = document.createElement("li");
      li.textContent = restaurant.name;
      searchResults.appendChild(li);
    });
  }
  
  // Populate restaurant dropdown for order page
  function populateRestaurantDropdown() {
    const restaurantSelect = document.getElementById("restaurantSelect");
    restaurants.forEach(restaurant => {
      const option = document.createElement("option");
      option.value = restaurant.name;
      option.textContent = restaurant.name;
      restaurantSelect.appendChild(option);
    });
  }
  
  // Handle form submissions
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("restaurantList")) {
      displayRestaurants(); // Display restaurants on home page
    }
    if (document.getElementById("searchButton")) {
      document.getElementById("searchButton").addEventListener("click", searchRestaurants); // Add search functionality
    }
    if (document.getElementById("orderForm")) {
      populateRestaurantDropdown(); // Populate dropdown for orders
      document.getElementById("orderForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Order placed for " + document.getElementById("itemName").value + " from " + document.getElementById("restaurantSelect").value);
      });
    }
    if (document.getElementById("paymentForm")) {
      document.getElementById("paymentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Payment successful for card: " + document.getElementById("cardNumber").value);
      });
    }
  });

  