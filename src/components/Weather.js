import React from 'react';

const Weather = ({ weather, air }) => {
    const airArray = [ "아주 좋음", "좋음", "보통", "나쁨", "매우 나쁨"];
    return (
        <div className = "weather-container">
            {
                weather && air && 
                <p><small>{ weather.name } { Math.round(weather.main.temp - 273.15) + "°C" } 날씨 { weather.weather[0].description }, 공기 { airArray[air] } </small></p>
            }
        </div>
    );
}

export default Weather;