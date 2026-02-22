const apiKey = (window.__WEATHER_CONFIG__ && window.__WEATHER_CONFIG__.apiKey) || "";

// Search button
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");

  if (!apiKey) {
    weatherDiv.innerHTML = 'API key missing — copy config.example.js to config.js and add your key';
    return;
  }

  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

// Get weather by city
async function getWeather(city) {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (!res.ok) {
      weatherDiv.innerHTML = data.message ? data.message : "City not found";
      return;
    }

    displayWeather(data);

  } catch (error) {
    weatherDiv.innerHTML = "Error loading weather";
  }
}

// Display current weather
function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");

  const icon = data.weather[0].icon;

  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s</p>
  `;
}

// Get 5-day forecast
async function getForecast(city) {
  const forecastDiv = document.getElementById("forecastResult");
  forecastDiv.innerHTML = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (!res.ok || !data.list) {
      forecastDiv.innerHTML = data.message ? data.message : "City not found";
      return;
    }

    const dailyData = data.list.filter(item =>
      item.dt_txt && item.dt_txt.includes("12:00:00")
    );

    dailyData.forEach(day => {
      const date = day.dt_txt.split(" ")[0];
      const icon = day.weather[0].icon;

      forecastDiv.innerHTML += `
        <div class="forecast-day">
          <p>${date}</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png">
          <p>${day.main.temp} °C</p>
        </div>
      `;
    });

  } catch (error) {
    forecastDiv.innerHTML = "Error loading forecast";
  }
}

// Auto detect location
if (apiKey && navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();
    if (res.ok) displayWeather(data);
  });
}
const apiKey = (window.__WEATHER_CONFIG__ && window.__WEATHER_CONFIG__.apiKey) || "";

// Search button
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");

  if (!apiKey) {
    weatherDiv.innerHTML = 'API key missing — copy config.example.js to config.js and add your key';
    return;
  }

  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

// Get weather by city
async function getWeather(city) {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (!res.ok) {
      weatherDiv.innerHTML = data.message ? data.message : "City not found";
      return;
    }

    displayWeather(data);

  } catch (error) {
    weatherDiv.innerHTML = "Error loading weather";
  }
}

// Display current weather
function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");

  const icon = data.weather[0].icon;

  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s</p>
  `;
}

// Get 5-day forecast
async function getForecast(city) {
  const forecastDiv = document.getElementById("forecastResult");
  forecastDiv.innerHTML = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (!res.ok || !data.list) {
      forecastDiv.innerHTML = data.message ? data.message : "City not found";
      return;
    }

    const dailyData = data.list.filter(item =>
      item.dt_txt && item.dt_txt.includes("12:00:00")
    );

    dailyData.forEach(day => {
      const date = day.dt_txt.split(" ")[0];
      const icon = day.weather[0].icon;

      forecastDiv.innerHTML += `
        <div class="forecast-day">
          <p>${date}</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png">
          <p>${day.main.temp} °C</p>
        </div>
      `;
    });

  } catch (error) {
    forecastDiv.innerHTML = "Error loading forecast";
  }
}

// Auto detect location
if (apiKey && navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();
    if (res.ok) displayWeather(data);
  });
}


