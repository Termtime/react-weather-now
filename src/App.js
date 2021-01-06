import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap";
import "./Styles/App.css";
import { WeatherIcon } from "./Components/WeatherIcon";
const App = () => {
  useEffect(() => {
    //get the user's location and return the desired data.
    navigator.geolocation.getCurrentPosition(
      async (data) => {
        let lon = data.coords.longitude;
        let lat = data.coords.latitude;
        const endpoint = `https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`;
        let jsonRes = await axios.get(endpoint);
        let temperatureData = {
          feels: jsonRes.data.main.feels_like,
          humidity: jsonRes.data.main.humidity,
          min: jsonRes.data.main.temp_min,
          max: jsonRes.data.main.temp_max,
          curr: jsonRes.data.main.temp,
        };
        console.log(jsonRes);
        setLocation({
          city: jsonRes.data.name,
          country: jsonRes.data.sys.country,
        });
        setWeather({
          title: jsonRes.data.weather[0].main,
          desc: jsonRes.data.weather[0].description,
        });
        setTemperature(temperatureData);
        setDisplayTemp({
          data: temperatureData,
          unit: "C",
        });
      },
      (err) => console.log(err)
    );
  }, []);

  const [location, setLocation] = useState("Unspecified");
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [displayTemp, setDisplayTemp] = useState(null);
  function toggleUnits() {
    let fBtn = document.getElementById("f-btn");
    let cBtn = document.getElementById("c-btn");
    if (displayTemp.unit == "C") {
      //toggle to Farenheit
      fBtn.classList.add("selected");
      cBtn.classList.remove("selected");
      let convertedData = {
        feels: ((temperature.feels * 9) / 5 + 32).toFixed(2),
        max: ((temperature.max * 9) / 5 + 32).toFixed(2),
        min: ((temperature.min * 9) / 5 + 32).toFixed(2),
        curr: ((temperature.curr * 9) / 5 + 32).toFixed(2),
        humidity: temperature.humidity,
      };
      setDisplayTemp({
        data: convertedData,
        unit: "F",
      });
    } else {
      fBtn.classList.remove("selected");
      cBtn.classList.add("selected");
      setDisplayTemp({
        data: temperature,
        unit: "C",
      });
    }
  }
  return (
    <div className="App h-100">
      {weather && displayTemp ? (
        <React.Fragment>
          <div
            id="current-weather"
            className={`${weather.title}-background h-100 column center-v`}
          >
            <div className="row center">
              <h2>
                Weather in {location.city}, {location.country}
              </h2>
            </div>
            <div id="weather-icon" className="row center">
              <WeatherIcon weather={weather.title} />
            </div>
            <div className="row center mb-4 mt-3">
              <h1>
                {displayTemp.data.curr} °{displayTemp.unit}
              </h1>
            </div>
            <div className="row center my-3">
              <h3 className="mx-4">
                Min: {displayTemp.data.min} °{displayTemp.unit}
              </h3>
              <h3 className="mx-4">
                Max: {displayTemp.data.max} °{displayTemp.unit}
              </h3>
            </div>
            <div className="row center my-3">
              <h3 className="mx-3">Humidity: {displayTemp.data.humidity}%</h3>
              <h3 className="mx-3">
                Feels like {displayTemp.data.feels} °{displayTemp.unit}
              </h3>
            </div>
          </div>
          <div className="user-select-none row center fixed-bottom my-5">
            <div className="row center w-50">
              <h3
                id="c-btn"
                className="hover-scale col-1 selected"
                onClick={toggleUnits}
              >
                °C
              </h3>
              <h3
                id="f-btn"
                className="hover-scale col-1"
                onClick={toggleUnits}
              >
                °F
              </h3>
            </div>
          </div>
          <div className="row center fixed-bottom mb-1 text-white">
            <p>
              Made by Mario Mejia.{"  "}
              <a href="https://github.com/Termtime">Github</a>
            </p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            <h1>
              Please allow location use to retrieve the current weather in your
              area.
            </h1>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
