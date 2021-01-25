import React from 'react';

const DisplayCountry = ({ query, countries }) => {
  if (query.length === 0) return <p></p>;

  if (countries.length > 10) {
    return <p>Too many matches, provide a more specific query.</p>;
  } else if (countries.length > 1) {
    return countries.map(country =>
      <p key={country.name}>{country.name}</p>);
  } else if (countries.length === 1) {
    const country = countries[0];
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
  } else {
    return <p>no matches found.</p>;
  }
};

export default DisplayCountry;
