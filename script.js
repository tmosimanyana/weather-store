document.addEventListener("DOMContentLoaded", () => {
    const weatherDisplay = document.getElementById("weather");
    const productList = document.getElementById("product-list");

    // Example Weather API Call (Replaced with OpenWeather API)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=77e5a79936953b1c6c49744abfa37515&units=metric")
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const weatherCondition = data.weather[0].description;
            weatherDisplay.textContent = `Temperature: ${temp}°C | Condition: ${weatherCondition}`;
            
            // Recommend products based on weather
            let products = [];
            if (temp > 25) {
                products = ["Sunglasses", "Cold Drinks", "Sunscreen"];
            } else if (temp < 10) {
                products = ["Winter Jacket", "Hot Coffee", "Gloves"];
            } else {
                products = ["Umbrella", "Sneakers", "Backpack"];
            }

            // Display products
            productList.innerHTML = "";
            products.forEach(product => {
                const div = document.createElement("div");
                div.className = "product";
                div.textContent = product;
                productList.appendChild(div);
            });
        })
        .catch(error => {
            weatherDisplay.textContent = "Failed to fetch weather data.";
            console.error("Weather API Error:", error);
        });
});
