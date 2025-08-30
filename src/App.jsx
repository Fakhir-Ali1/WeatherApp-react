import React, { useState } from "react";
import "./App.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const checkWeather = () => {
    if (!city) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=ecf07bafe5f67fa8a66abd728beb563b`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("Invalid city name");
          setWeather(null);
          return;
              console.log(data.weather[0].main)
        }

        setError("");
        setWeather({
          temp: Math.floor(data.main.temp),
          city: data.name,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          feels_like: Math.floor(data.main.feels_like),
          main: data.weather[0].main,
        });
      })
      .catch((err) => {
        setError("Something went wrong!");
        setWeather(null);
      });

    setCity("");
  };

  const getWeatherIcon = (mainWeather) => {
    switch (mainWeather) {
      case "Clouds":
        return "/assets/images/clouds.png";
      case "Clear":
        return "/assets/images/clear.png";
      case "Rain":
        return "/assets/images/rain.png";
      case "Drizzle":
        return "/assets/images/drizzle.png";
      case "Mist":
      default:
        return "/assets/images/mist.png";
    }
  };

  return (
    <div id="maincon">
      {/* Search Box */}
      <div className="search-box item">
        <input
          id="search"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={checkWeather}>
          <img src="/assets/icons8-search-48.png" alt="search icon" />
        </button>
      </div>

      {/* Error Message */}
      <p id="error" style={{ color: "red" }}>
        {error}
      </p>

      {/* Weather Box */}
      {weather && (
        <div id="box">
          <div className="card">
            <img
              id="weather-icon"
              src={getWeatherIcon(weather.main)}
              className="png slide-in-left"
              alt="weather icon"
            />
            <h1 className="temp">
              <b>{weather.temp}°C</b>
            </h1>
            <h1 className="city">
              <b>{weather.city}</b>
            </h1>

            <div id="item">
              <div className="col">
                <img src="/assets/images/humidity.png" alt="humidity" />
                <p className="humidity">
                  Humidity <br /> {weather.humidity}%
                </p>
              </div>

              <div className="col">
                <img src="/assets/images/wind.png" alt="wind" />
                <p className="wind">
                  Wind <br /> {weather.wind} km/h
                </p>
              </div>

              <div className="col">
                <img src="/assets/rain.png" id="fl" alt="rain" />
                <p className="flike">
                  Feelslike <br />
                  {weather.feels_like}°C
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
