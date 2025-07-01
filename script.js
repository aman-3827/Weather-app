const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemperature = document.getElementById("city-temperature");

// New elements for additional data
const weatherCondition = document.createElement("p");
const humidity = document.createElement("p");
const windSpeed = document.createElement("p");
const airQuality = document.createElement("p");

document.querySelector(".weather-info").append(weatherCondition, humidity, windSpeed, airQuality);

async function getData(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=3f12428bfa494f85b7015659240704=${city}&aqi=yes`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        // Update UI
        cityName.innerText = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        cityTime.innerText = `Local Time: ${data.location.localtime}`;
        cityTemperature.innerText = `Temperature: ${data.current.temp_c}°C`;

        // New features
        weatherCondition.innerText = `Condition: ${data.current.condition.text}`;
        humidity.innerText = `Humidity: ${data.current.humidity}%`;
        windSpeed.innerText = `Wind Speed: ${data.current.wind_kph} km/h`;
        airQuality.innerText = `Air Quality Index (AQI): ${data.current.air_quality.pm2_5.toFixed(2)}`;

    } catch (error) {
        cityName.innerText = "City not found! Please try again.";
        cityTime.innerText = "";
        cityTemperature.innerText = "";
        weatherCondition.innerText = "";
        humidity.innerText = "";
        windSpeed.innerText = "";
        airQuality.innerText = "";
    }
}

// Event listener for button click
button.addEventListener("click", () => {
    const city = input.value.trim();
    if (city) {
        getData(city);
    }
});

// Event listener for 'Enter' key
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = input.value.trim();
        if (city) {
            getData(city);
        }
    }
});
