# Weather Dashboard

## Features

- **Current weather**: Shows city name, country, temperature, description, feels-like temperature, humidity, and wind speed.
- **5-day forecast**: Displays daily temperature, description, and weather icon using OpenWeather 5-day forecast data.
- **Auto location detection**: Uses the browser Geolocation API to detect your current location and fetch weather data.
- **City search**: Search by city name to view current weather and forecast.
- **Weather icons**: Uses OpenWeather icon set for both current weather and forecast.
- **Loading and error states**: Shows clear loading indicators and friendly error messages (e.g. city not found, geolocation not allowed).

## Technologies

- HTML
- CSS
- JavaScript (ES6+)
- OpenWeather API

## Getting an API Key

1. Go to [openweathermap.org](https://openweathermap.org).
2. Create a free account.
3. Copy your API key from the API keys section in your profile.

## How to Run

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd weather-api/weather-app
   ```

2. **Add your API key**
   - Copy `config.example.js` to `config.js`.
   - Open `config.js` and replace `YOUR_API_KEY_HERE` with your actual API key.
   - `config.js` is gitignored and will not be committed.

3. **Open the app**
   - Open `index.html` directly in your browser (double-click or use `Open with Live Server` if using VS Code / Cursor).

## Live Demo

Add your deployed link here (e.g. GitHub Pages, Netlify, Vercel):

`https://your-live-demo-link.com`

## Why This Project Is Valuable

- Demonstrates understanding of **async/await**.
- Shows integration with an external **REST API**.
- Works with **JSON** responses and transforms them into UI.
- Handles **real-world errors** (404, geolocation issues, network errors).
- Uses **browser APIs** like `navigator.geolocation`.
