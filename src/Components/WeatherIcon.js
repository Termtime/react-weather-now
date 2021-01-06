import React from "react";
import "../Styles/AnimatedWeatherIcons.css";
export const WeatherIcon = ({ weather }) => {
  let icon = (
    <div className="icon sun-shower">
      <div className="cloud"></div>
      <div className="sun">
        <div className="rays"></div>
      </div>
      <div className="rain"></div>
    </div>
  );
  switch (weather.toLowerCase()) {
    case "clear":
      icon = (
        <div class="icon sunny">
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
      );
      break;
    case "clouds":
      icon = (
        <div class="icon cloudy">
          <div class="cloud"></div>
          <div class="cloud"></div>
        </div>
      );
      break;
    case "rainy":
      icon = (
        <div class="icon rainy">
          <div class="cloud"></div>
          <div class="rain"></div>
        </div>
      );
      break;
    default:
  }
  return <React.Fragment>{icon}</React.Fragment>;
};
