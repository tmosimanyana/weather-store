// Weather API key and URL
const apiKey = '77e5a79936953b1c6c49744abfa37515';  // Replace with your API key
const city = 'Gaborone';  // Replaced with my city
const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Fetch weather data
async function getWeather() {
  try {
    const response = await fetch(weatherAPIUrl);
    const data = await response.json();
    
    // Show weather info
    const weatherDescription = data.weather[0].description;
    const temp = data.main.temp;
    const weatherElement = document.getElementById('weather-info');
    weatherElement.innerHTML = `
      <p>Weather: ${weatherDescription}</p>
      <p>Temperature: ${temp}°C</p>
    `;
    
    // Recommend products based on weather
    recommendProducts(weatherDescription.toLowerCase());
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Recommend products based on weather condition
function recommendProducts(weather) {
  const products = {
    sunny: ['Sunglasses', 'Sunblock', 'Hats'],
    rainy: ['Raincoats', 'Indoor games', 'eBooks'],
    snowy: ['Winter jackets', 'Heaters', 'Boots'],
  };

  // Default to sunny if the weather condition is not recognized
  const recommended = products[weather] || products.sunny;

  const productListElement = document.getElementById('product-list');
  productListElement.innerHTML = recommended.map(product => `<div class="product">${product}</div>`).join('');
}

// PayPal Button Setup
function setupPayPalButton() {
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '100.00'  // Static value for demo, change as needed
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  }).render('#paypal-button-container');
}

// Initialize the app
function initializeApp() {
  getWeather();
  setupPayPalButton();
}

// Call the initialization function when the page is ready
initializeApp();
