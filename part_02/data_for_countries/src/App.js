import axios from 'axios';
import React, { useState, useEffect } from 'react';

import DisplayCountry from './components/DisplayCountry';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const queryChangeHandler = event => setQuery(event.target.value);
  const showCountryHandler = event => {
    const country = 
      countries.find(country => country.name === event.target.value);
    setQuery(country.name);
  };

  const countriesMatchingQuery =
    countries.filter(country =>
      country.name.toLowerCase().includes(query.trim().toLowerCase()));

  if (query === '') {
    return <div>find countries <input value={query} onChange={queryChangeHandler} /></div>;
  } else if (countriesMatchingQuery.length > 10) {
    return (
      <div>
        find countries <input value={query} onChange={queryChangeHandler} />
        <p>Too many matches, provide a more specific query.</p>
      </div>
    );
  } else if (countriesMatchingQuery.length > 1) {
    return (
      <div>
        find countries <input value={query} onChange={queryChangeHandler} />
        {countriesMatchingQuery.map(country =>
          <div key={country.name}>
            {country.name} <button onClick={showCountryHandler} value={country.name}>show</button>
          </div>)}
      </div>
    );
  } else if (countriesMatchingQuery.length === 1) {
    return (
      <div>
        find countries <input value={query} onChange={queryChangeHandler} />
        <DisplayCountry country={countriesMatchingQuery[0]} />
      </div>
    );
  } else {
    return (
      <div>
        find countries <input value={query} onChange={queryChangeHandler} />
        <p>no matches found.</p>
      </div>
    );
  }
};

export default App;
