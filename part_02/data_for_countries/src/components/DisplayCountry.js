import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayCountry = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');

  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => {
        const weatherData = response.data;
        setTemperature(Math.round(weatherData.main.temp));
        setWeatherIcon(`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weatherData.weather[0].icon}.png`);
        setWeatherDescription(weatherData.weather[0].description);
      });
  });

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={`${country.name} ${language.name}`}>
            {language.name}
          </li>
        )}
      </ul>
      <img src={country.flag} height='100px' alt='' border='1px solid'/>
      <h2>Weather in {country.capital}</h2>
      <p><strong>temperature:</strong> {temperature}</p>
      <img src={weatherIcon} alt='weather icon' />
      <p>{weatherDescription}</p>
    </div>
  );
};

export default DisplayCountry;
