const apiKey = window.apiKey || "YOUR_API_KEY_HERE";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const weatherDiv = document.getElementById("weatherResult");
const forecastDiv = document.getElementById("forecastResult");

function setLoading(target, message = "Loading...") {
  target.innerHTML = `
    <div class="loading">
      <span class="spinner"></span>
      <span>${message}</span>
    </div>
  `;
}

function setError(target, message) {
  target.innerHTML = `<p class="error">${message}</p>`;
}

function clearPlaceholders() {
  weatherDiv.classList.remove("placeholder");
  forecastDiv.classList.remove("placeholder");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    setError(weatherDiv, "Please enter a city name.");
    forecastDiv.innerHTML = `<p class="muted">No forecast to display.</p>`;
    return;
  }

  fetchByCity(city);
});

cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setError(weatherDiv, "Geolocation is not supported by your browser.");
    return;
  }

  clearPlaceholders();
  setLoading(weatherDiv, "Detecting your location...");
  forecastDiv.innerHTML = `<p class="muted">Getting forecast for your location...</p>`;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchByCoords(lat, lon);
    },
    () => {
      setError(weatherDiv, "Unable to access location. Please allow location or search by city.");
    }
  );
});

function fetchByCity(city) {
  clearPlaceholders();
  setLoading(weatherDiv, "Fetching current weather...");
  setLoading(forecastDiv, "Fetching 5-day forecast...");

  getWeather(city);
  getForecast(city);
}

function fetchByCoords(lat, lon) {
  clearPlaceholders();
  setLoading(weatherDiv, "Fetching current weather...");
  setLoading(forecastDiv, "Fetching 5-day forecast...");

  getWeatherByCoords(lat, lon);
  getForecastByCoords(lat, lon);
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      setError(weatherDiv, "City not found. Please try again.");
      forecastDiv.innerHTML = `<p class="muted">No forecast available.</p>`;
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Error:", error);
    setError(weatherDiv, "Something went wrong fetching weather data.");
  }
}

async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      setError(weatherDiv, "Could not fetch weather for your location.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Error:", error);
    setError(weatherDiv, "Something went wrong fetching weather data.");
  }
}

function displayWeather(data) {
  clearPlaceholders();

  const iconCode = data.weather && data.weather[0] && data.weather[0].icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : "";

  const description = data.weather && data.weather[0] ? data.weather[0].description : "";

  weatherDiv.innerHTML = `
    <div class="card-body">
      <div class="current-main">
        ${
          iconUrl
            ? `<img class="weather-icon" src="${iconUrl}" alt="${description || "Weather icon"}" />`
            : ""
        }
        <div>
          <div class="current-city">${data.name}, ${data.sys?.country ?? ""}</div>
          <div class="current-temp">${Math.round(data.main.temp)}°C</div>
          <div class="current-desc">${description}</div>
        </div>
      </div>
      <div class="current-meta">
        <div>
          <span class="meta-label">Feels like:</span>
          <span class="meta-value">${Math.round(data.main.feels_like)}°C</span>
        </div>
        <div>
          <span class="meta-label">Humidity:</span>
          <span class="meta-value">${data.main.humidity}%</span>
        </div>
        <div>
          <span class="meta-label">Wind:</span>
          <span class="meta-value">${data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  `;
}

async function getForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      setError(forecastDiv, "No forecast data found for that city.");
      return;
    }

    displayForecast(data);
  } catch (error) {
    console.error(error);
    setError(forecastDiv, "Something went wrong fetching forecast data.");
  }
}

async function getForecastByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod !== "200" && data.cod !== 200) {
      setError(forecastDiv, "No forecast data found for your location.");
      return;
    }

    displayForecast(data);
  } catch (error) {
    console.error(error);
    setError(forecastDiv, "Something went wrong fetching forecast data.");
  }
}

function displayForecast(data) {
  clearPlaceholders();
  forecastDiv.innerHTML = "";

  const dailyData = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  if (!dailyData.length) {
    forecastDiv.innerHTML = `<p class="muted">No forecast data available.</p>`;
    return;
  }

  dailyData.forEach((day) => {
    const date = day.dt_txt.split(" ")[0];
    const temp = Math.round(day.main.temp);
    const desc = day.weather && day.weather[0] ? day.weather[0].description : "";
    const iconCode = day.weather && day.weather[0] && day.weather[0].icon;
    const iconUrl = iconCode
      ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      : "";

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <div class="forecast-date">${date}</div>
        ${
          iconUrl
            ? `<img class="forecast-icon" src="${iconUrl}" alt="${desc || "Weather icon"}" />`
            : ""
        }
        <div class="forecast-temp">${temp}°C</div>
        <div class="forecast-desc">${desc}</div>
      </div>
    `;
  });
}

// Try to auto-detect location on initial load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchByCoords(lat, lon);
    },
    () => {
      // Silent failure on load; user can still search or click the button
    }
  );
}

