import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState('Detecting your location...');

  const apiKey = '83812d2daa08f8f6d414012726261d40';

  // 🌍 Auto-detect user location using IPInfo
  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const ipInfoRes = await axios.get(`https://ipinfo.io/json?token=6271f570bcee9c`);
        const loc = ipInfoRes.data.loc; // e.g., "16.5062,80.6480"
        const [latitude, longitude] = loc.split(',');
        const city = ipInfoRes.data.city;
        const country = ipInfoRes.data.country;

        setLocation(city); // pre-fill input
        setUserLocation(`${city}, ${country}`);

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        setWeatherData(weatherRes.data);
      } catch (error) {
        console.error('Failed to fetch location/weather via IPInfo:', error);
        setUserLocation('Unable to detect location');
      }
    };

    fetchLocationAndWeather();
  }, []);

  // 🔍 Search weather by city name
  const handleSearch = async () => {
    if (!location.trim()) {
      alert('Please enter a location.');
      return;
    }

    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          location
        )}&limit=1&appid=${apiKey}`
      );

      if (!geoRes.data || geoRes.data.length === 0) {
        alert('Location not found. Try something like: Palasa');
        return;
      }

      const { lat, lon, name, country } = geoRes.data[0];

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      setWeatherData(weatherRes.data);
      setUserLocation(`${name}, ${country}`);
    } catch (error) {
      console.error('Error fetching weather for searched location:', error);
      alert('Failed to get weather. Please try again.');
    }
  };

  return (
    <div>
      {/* <Navbar /> */}

      <div className="bg-green-100 flex flex-col items-center min-h-[80vh] pb-8">
        <div className="container mx-auto p-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-green-700">Weather Forecast</h2>
          <p className="text-lg mb-6 text-center text-green-800">
            Current Location: <span className="font-semibold">{userLocation}</span>
          </p>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city (e.g. Palasa)"
              className="p-2 w-64 rounded-l-lg border border-green-300 focus:ring-2 focus:ring-green-400 text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r-lg transition-all duration-300"
            >
              Search
            </button>
          </div>

          {weatherData && (
            <div className="bg-white rounded-lg p-6 shadow-lg border border-green-200 max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-2 text-green-700">
                Weather for {weatherData.name}, {weatherData.sys.country}
              </h3>
              <p className="text-lg text-green-800">🌡 Temperature: {weatherData.main.temp} °C</p>
              <p className="text-lg text-green-800">💧 Humidity: {weatherData.main.humidity}%</p>
              <p className="text-lg text-green-800">🌬 Wind Speed: {weatherData.wind.speed} m/s</p>
              <p className="text-lg text-green-800">🔵 Pressure: {weatherData.main.pressure} hPa</p>
              <p className="text-lg text-green-800">👁 Visibility: {weatherData.visibility / 1000} km</p>
              <p className="text-lg text-green-800 capitalize">
                🌥 Description: {weatherData.weather[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
