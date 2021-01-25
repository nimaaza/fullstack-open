import React from 'react';

const DisplayCountry = ({ country }) => {
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
      <img src={country.flag} height='100px' alt='' />
    </div>
  );
};

export default DisplayCountry;
