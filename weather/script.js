const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const loading = document.getElementById('loading');
const weatherInfo = document.getElementById('weatherInfo'); 

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});
async function fetchWeather(city) {
    try {
        loading.style.display = "block";
        loading.textContent = "Loading...";
        weatherInfo.style.display = "none";

        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        displayWeather(name, country, weatherData);
        loading.style.display = "none";
    } catch (err) {
        loading.textContent = "Something went wrong: " + err.message;
        console.error(err);
    }
}

function displayWeather(name, country, data) {
    const current = data.current_weather;

    const times = data.hourly.time;
    const humidityValues = data.hourly.relativehumidity_2m;
    const currentTime = current.time; 
    const index = times.indexOf(currentTime);
    const humidityValue = index !== -1 ? humidityValues[index] : "N/A";

    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${current.temperature}°C`;
    weather.textContent = `Weather code: ${current.weathercode}`;
    humidity.textContent = `Humidity: ${humidityValue}%`;
    wind.textContent = `Wind speed: ${current.windspeed} km/h`;

    weatherInfo.style.display = "block";
}

