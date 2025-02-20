import { createElement } from './utils.js';
import { initRouter } from './router.js';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'Weather-Based E-Commerce Store',
    className: 'heading',
  });

  // Navigation links for product categories
  const sunnyPage = createElement('a', {
    href: '/#/sunny',
    textContent: '☀️ Sunny Weather',
  });
  const rainyPage = createElement('a', {
    href: '/#/rainy',
    textContent: '🌧️ Rainy Weather',
  });
  const coldPage = createElement('a', {
    href: '/#/cold',
    textContent: '❄️ Cold Weather',
  });

  const nav = createElement('nav', {}, [sunnyPage, rainyPage, coldPage]);

  return createElement('header', {}, [appTitle, nav]);
}

function WeatherSection() {
  const weatherInfo = createElement('div', { className: 'weather-info' });

  // Fetch weather data (example using OpenWeather API)
  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=77e5a79936953b1c6c49744abfa37515_KEY&units=metric`
      );
      const data = await response.json();

      weatherInfo.innerHTML = `
        <h3>Current Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
      `;
    } catch (error) {
      weatherInfo.textContent = 'Failed to load weather data.';
    }
  }

  fetchWeather();

  return weatherInfo;
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}`,
  });

  return createElement('footer', {}, [copyright]);
}

function App() {
  const main = createElement('main', {}, []);

  initRouter(main);

  return createElement('div', {}, [Header(main), WeatherSection(), main, Footer()]);
}

export default App;
