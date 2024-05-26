import React, { useEffect, useState } from "react";
import axios from "axios";
import weather from "./images/weather-gb-image.avif";
import clear from "./images/clear-sky.webp";
import drizzel from "./images/drizzel.webp";
import clouds from "./images/clouds.jpg";
import haze from "./images/haze.jpg";
import thunder from "./images/Thunderstrom.jpg";
import rain from "./images/rain.avif";
import snow from "./images/snow.jpg";

const WeatherApp = () => {
  const apikey = process.env.REACT_APP_APIKEY;
  const [location, setLocation] = useState("Ahmedabad");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(weather);

  useEffect(() => {
    handleGetWeather();
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const convertKelvinToCelsius = (temp) => {
    return Math.round(temp - 273.15);
  };

  const handleGetWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`
      );

      setWeatherData(response.data);
      setBackgroundImage(getBackgroundImage(response.data.weather[0].main));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getBackgroundImage = (weathermain) => {
    switch (weathermain) {
      case "Thunderstormr":
        return thunder;

      case "Drizzle":
        return drizzel;

      case "Rain":
        return rain;

      case "Snow":
        return snow;

      case "Haze":
        return haze;

      case "Smoke":
        return haze;

      case "Dust":
        return haze;

      case "Clouds":
        return clouds;

      case "Clear":
        return clear;

      default:
        return weather;
    }
  };

  return (
    <div
      className="weather-app"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="weather-box">
        <h1 id="h1">Weather App</h1>
        <div className="input-box">
          <input
            placeholder="Searth City Name..."
            type="text"
            name="text"
            className="input"
            value={location}
            onChange={handleLocationChange}
          ></input>

          <button onClick={handleGetWeather}>
            {" "}
            <h6> Get Weather</h6>
          </button>
        </div>
        {weatherData && (
          <div className="detail">
            <h2 id="name">{weatherData.name}</h2>
            <p id="main-temp">
              Temperature: {convertKelvinToCelsius(weatherData.main.temp)}°C
            </p>
            <p id="desc">Weather: {weatherData.weather[0].description}</p>
            <p id="min-temp">
              Minimum Temperature:{" "}
              {convertKelvinToCelsius(weatherData.main.temp_min)}°C
            </p>
            <div>
              <img
                id="weather-icon"
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
                className="weather-data-icon"
              />
            </div>
            <p id="max-temp">
              Maximum Temperature:{" "}
              {convertKelvinToCelsius(weatherData.main.temp_max)}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
