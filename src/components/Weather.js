import React from 'react';

const Weather = ({ weather }) => {
    return (
        <div className = "weather-container">
            {
                weather && <p><small>{ weather.name } { Math.round(weather.main.temp - 273.15) + "°C" } { weather.weather[0].main }</small></p>
            }
        </div>
    );
}

export default Weather;